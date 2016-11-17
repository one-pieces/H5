(function (e) {
  "use strict";

  var t = function () {
    return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || function (t) {
        e.setTimeout(t, 1e3 / 60)
      }
  }(), n = e.jsmpeg = function (e, t) {
    t = t || {}, this.benchmark = !!t.benchmark, this.canvas = t.canvas || document.createElement("canvas"), this.autoplay = !!t.autoplay, this.loop = !!t.loop, this.seekable = !!t.seekable, this.externalLoadCallback = t.onload || null, this.externalDecodeCallback = t.ondecodeframe || null, this.externalFinishedCallback = t.onfinished || null, this.customIntraQuantMatrix = new Uint8Array(64), this.customNonIntraQuantMatrix = new Uint8Array(64), this.blockData = new Int32Array(64), this.zeroBlockData = new Int32Array(64), this.fillArray(this.zeroBlockData, 0), !t.forceCanvas2D && this.initWebGL() ? this.renderFrame = this.renderFrameGL : (this.canvasContext = this.canvas.getContext("2d"), this.renderFrame = this.renderFrame2D), e instanceof WebSocket ? (this.client = e, this.client.onopen = this.initSocketClient.bind(this)) : this.load(e)
  };
  n.prototype.waitForIntraFrame = !0, n.prototype.socketBufferSize = 524288, n.prototype.initSocketClient = function (e) {
    this.buffer = new D(new ArrayBuffer(this.socketBufferSize)), this.nextPictureBuffer = new D(new ArrayBuffer(this.socketBufferSize)), this.nextPictureBuffer.writePos = 0, this.nextPictureBuffer.chunkBegin = 0, this.nextPictureBuffer.lastWriteBeforeWrap = 0, this.client.binaryType = "arraybuffer", this.client.onmessage = this.receiveSocketMessage.bind(this)
  }, n.prototype.decodeSocketHeader = function (e) {
    e[0] == r.charCodeAt(0) && e[1] == r.charCodeAt(1) && e[2] == r.charCodeAt(2) && e[3] == r.charCodeAt(3) && (this.width = e[4] * 256 + e[5], this.height = e[6] * 256 + e[7], this.initBuffers())
  }, n.prototype.receiveSocketMessage = function (e) {
    var n = new Uint8Array(e.data);
    this.sequenceStarted || this.decodeSocketHeader(n);
    var r = this.buffer, s = this.nextPictureBuffer;
    s.writePos + n.length > s.length && (s.lastWriteBeforeWrap = s.writePos, s.writePos = 0, s.index = 0), s.bytes.set(n, s.writePos), s.writePos += n.length;
    var o = 0;
    for (; ;) {
      o = s.findNextMPEGStartCode();
      if (o == D.NOT_FOUND || s.index >> 3 > s.writePos) {
        s.index = Math.max(s.writePos - 3, 0) << 3;
        return
      }
      if (o == C)break
    }
    if (this.waitForIntraFrame) {
      s.advance(10), s.getBits(3) == b && (this.waitForIntraFrame = !1, s.chunkBegin = s.index - 13 >> 3);
      return
    }
    this.currentPictureDecoded || this.decodePicture(i);
    var u = s.index >> 3;
    if (u > s.chunkBegin)r.bytes.set(s.bytes.subarray(s.chunkBegin, u)), r.writePos = u - s.chunkBegin; else {
      r.bytes.set(s.bytes.subarray(s.chunkBegin, s.lastWriteBeforeWrap));
      var a = s.lastWriteBeforeWrap - s.chunkBegin;
      r.bytes.set(s.bytes.subarray(0, u), a), r.writePos = u + a
    }
    r.index = 0, s.chunkBegin = u, this.currentPictureDecoded = !1, t(this.scheduleDecoding.bind(this), this.canvas)
  }, n.prototype.scheduleDecoding = function () {
    this.decodePicture(), this.currentPictureDecoded = !0
  }, n.prototype.isRecording = !1, n.prototype.recorderWaitForIntraFrame = !1, n.prototype.recordedFrames = 0, n.prototype.recordedSize = 0, n.prototype.didStartRecordingCallback = null, n.prototype.recordBuffers = [], n.prototype.canRecord = function () {
    return this.client && this.client.readyState == this.client.OPEN
  }, n.prototype.startRecording = function (e) {
    if (!this.canRecord())return;
    this.discardRecordBuffers(), this.isRecording = !0, this.recorderWaitForIntraFrame = !0, this.didStartRecordingCallback = e || null, this.recordedFrames = 0, this.recordedSize = 0;
    var t = this.width >> 4, n = (this.width & 15) << 4 | this.height >> 8, r = this.height & 255;
    this.recordBuffers.push(new Uint8Array([0, 0, 1, 179, t, n, r, 19, 255, 255, 225, 88, 0, 0, 1, 184, 0, 8, 0, 0, 0, 0, 1, 0]))
  }, n.prototype.recordFrameFromCurrentBuffer = function () {
    if (!this.isRecording)return;
    if (this.recorderWaitForIntraFrame) {
      if (this.pictureCodingType != b)return;
      this.recorderWaitForIntraFrame = !1, this.didStartRecordingCallback && this.didStartRecordingCallback(this)
    }
    this.recordedFrames++, this.recordedSize += this.buffer.writePos, this.recordBuffers.push(new Uint8Array(this.buffer.bytes.subarray(0, this.buffer.writePos)))
  }, n.prototype.discardRecordBuffers = function () {
    this.recordBuffers = [], this.recordedFrames = 0
  }, n.prototype.stopRecording = function () {
    var e = new Blob(this.recordBuffers, {type: "video/mpeg"});
    return this.discardRecordBuffers(), this.isRecording = !1, e
  }, n.prototype.intraFrames = [], n.prototype.currentFrame = -1, n.prototype.currentTime = 0, n.prototype.frameCount = 0, n.prototype.duration = 0, n.prototype.load = function (e) {
    this.url = e;
    var t = new XMLHttpRequest, n = this;
    t.onreadystatechange = function () {
      t.readyState == t.DONE && t.status == 200 && n.loadCallback(t.response)
    }, t.onprogress = this.gl ? this.updateLoaderGL.bind(this) : this.updateLoader2D.bind(this), t.open("GET", e), t.responseType = "arraybuffer", t.send()
  }, n.prototype.updateLoader2D = function (e) {
    var t = e.loaded / e.total, n = this.canvas.width, r = this.canvas.height, i = this.canvasContext;
    i.fillStyle = "#6f20b7", i.fillRect(0, 0, n, r)
  }, n.prototype.updateLoaderGL = function (e) {
    var t = this.gl;
    t.uniform1f(t.getUniformLocation(this.loadingProgram, "loaded"), e.loaded / e.total), t.drawArrays(t.TRIANGLE_STRIP, 0, 4)
  }, n.prototype.loadCallback = function (e) {
    this.buffer = new D(e), this.seekable && (this.collectIntraFrames(), this.buffer.index = 0), this.findStartCode(x), this.firstSequenceHeader = this.buffer.index, this.decodeSequenceHeader(), this.duration = this.frameCount / this.pictureRate, this.nextFrame(), this.autoplay && this.play(), this.externalLoadCallback && this.externalLoadCallback(this)
  }, n.prototype.collectIntraFrames = function () {
    var e;
    for (e = 0; this.findStartCode(C) !== D.NOT_FOUND; e++)this.buffer.advance(10), this.buffer.getBits(3) == b && this.intraFrames.push({
      frame: e,
      index: this.buffer.index - 13
    });
    this.frameCount = e
  }, n.prototype.seekToFrame = function (e, t) {
    if (e < 0 || e >= this.frameCount || !this.intraFrames.length)return !1;
    var n = null;
    for (var r = 0; r < this.intraFrames.length && this.intraFrames[r].frame <= e; r++)n = this.intraFrames[r];
    this.buffer.index = n.index, this.currentFrame = n.frame - 1;
    if (t) {
      for (var s = n.frame; s < e; s++)this.decodePicture(i), this.findStartCode(C);
      this.currentFrame = e - 1
    }
    return this.decodePicture(), !0
  }, n.prototype.seekToTime = function (e, t) {
    this.seekToFrame(e * this.pictureRate | 0, t)
  }, n.prototype.play = function (e) {
    if (this.playing)return;
    this.targetTime = this.now(), this.playing = !0, this.scheduleNextFrame()
  }, n.prototype.pause = function (e) {
    this.playing = !1
  }, n.prototype.stop = function (e) {
    this.currentFrame = -1, this.buffer && (this.buffer.index = this.firstSequenceHeader), this.playing = !1, this.client && (this.client.close(), this.client = null)
  }, n.prototype.readCode = function (e) {
    var t = 0;
    do t = e[t + this.buffer.getBits(1)]; while (t >= 0 && e[t] != 0);
    return e[t + 2]
  }, n.prototype.findStartCode = function (e) {
    var t = 0;
    for (; ;) {
      t = this.buffer.findNextMPEGStartCode();
      if (t == e || t == D.NOT_FOUND)return t
    }
    return D.NOT_FOUND
  }, n.prototype.fillArray = function (e, t) {
    for (var n = 0, r = e.length; n < r; n++)e[n] = t
  }, n.prototype.pictureRate = 30, n.prototype.lateTime = 0, n.prototype.firstSequenceHeader = 0, n.prototype.targetTime = 0, n.prototype.benchmark = !1, n.prototype.benchFrame = 0, n.prototype.benchDecodeTimes = 0, n.prototype.benchAvgFrameTime = 0, n.prototype.now = function () {
    return e.performance ? e.performance.now() : Date.now()
  }, n.prototype.nextFrame = function () {
    if (!this.buffer)return;
    var e = this.now();
    for (; ;) {
      var t = this.buffer.findNextMPEGStartCode();
      if (t == x)this.decodeSequenceHeader(); else {
        if (t == C)return this.playing && this.scheduleNextFrame(), this.decodePicture(), this.benchDecodeTimes += this.now() - e, this.canvas;
        if (t == D.NOT_FOUND)return this.stop(), this.externalFinishedCallback && this.externalFinishedCallback(this), this.loop && this.sequenceStarted && this.play(), null
      }
    }
  }, n.prototype.scheduleNextFrame = function () {
    this.lateTime = this.now() - this.targetTime;
    var t = Math.max(0, 1e3 / this.pictureRate - this.lateTime);
    this.targetTime = this.now() + t, this.benchmark ? (this.benchFrame++, this.benchFrame >= 120 && (this.benchAvgFrameTime = this.benchDecodeTimes / this.benchFrame, this.benchFrame = 0, this.benchDecodeTimes = 0, e.console && console.log("Average time per frame:", this.benchAvgFrameTime, "ms")), setTimeout(this.nextFrame.bind(this), 0)) : t < 18 ? this.scheduleAnimation() : setTimeout(this.scheduleAnimation.bind(this), t)
  }, n.prototype.scheduleAnimation = function () {
    t(this.nextFrame.bind(this), this.canvas)
  }, n.prototype.decodeSequenceHeader = function () {
    this.width = this.buffer.getBits(12), this.height = this.buffer.getBits(12), this.buffer.advance(4), this.pictureRate = s[this.buffer.getBits(4)], this.buffer.advance(30), this.initBuffers();
    if (this.buffer.getBits(1)) {
      for (var e = 0; e < 64; e++)this.customIntraQuantMatrix[o[e]] = this.buffer.getBits(8);
      this.intraQuantMatrix = this.customIntraQuantMatrix
    }
    if (this.buffer.getBits(1)) {
      for (var e = 0; e < 64; e++)this.customNonIntraQuantMatrix[o[e]] = this.buffer.getBits(8);
      this.nonIntraQuantMatrix = this.customNonIntraQuantMatrix
    }
  }, n.prototype.initBuffers = function () {
    this.intraQuantMatrix = u, this.nonIntraQuantMatrix = a, this.mbWidth = this.width + 15 >> 4, this.mbHeight = this.height + 15 >> 4, this.mbSize = this.mbWidth * this.mbHeight, this.codedWidth = this.mbWidth << 4, this.codedHeight = this.mbHeight << 4, this.codedSize = this.codedWidth * this.codedHeight, this.halfWidth = this.mbWidth << 3, this.halfHeight = this.mbHeight << 3, this.quarterSize = this.codedSize >> 2;
    if (this.sequenceStarted)return;
    this.sequenceStarted = !0;
    var t = e.Uint8ClampedArray || e.Uint8Array;
    e.Uint8ClampedArray || (this.copyBlockToDestination = this.copyBlockToDestinationClamp, this.addBlockToDestination = this.addBlockToDestinationClamp), this.currentY = new t(this.codedSize), this.currentY32 = new Uint32Array(this.currentY.buffer), this.currentCr = new t(this.codedSize >> 2), this.currentCr32 = new Uint32Array(this.currentCr.buffer), this.currentCb = new t(this.codedSize >> 2), this.currentCb32 = new Uint32Array(this.currentCb.buffer), this.forwardY = new t(this.codedSize), this.forwardY32 = new Uint32Array(this.forwardY.buffer), this.forwardCr = new t(this.codedSize >> 2), this.forwardCr32 = new Uint32Array(this.forwardCr.buffer), this.forwardCb = new t(this.codedSize >> 2), this.forwardCb32 = new Uint32Array(this.forwardCb.buffer), this.canvas.width = this.width, this.canvas.height = this.height, this.gl ? (this.gl.useProgram(this.program), this.gl.viewport(0, 0, this.width, this.height)) : (this.currentRGBA = this.canvasContext.getImageData(0, 0, this.width, this.height), this.fillArray(this.currentRGBA.data, 255))
  }, n.prototype.currentY = null, n.prototype.currentCr = null, n.prototype.currentCb = null, n.prototype.currentRGBA = null, n.prototype.pictureCodingType = 0, n.prototype.forwardY = null, n.prototype.forwardCr = null, n.prototype.forwardCb = null, n.prototype.fullPelForward = !1, n.prototype.forwardFCode = 0, n.prototype.forwardRSize = 0, n.prototype.forwardF = 0, n.prototype.decodePicture = function (e) {
    this.currentFrame++, this.currentTime = this.currentFrame / this.pictureRate, this.buffer.advance(10), this.pictureCodingType = this.buffer.getBits(3), this.buffer.advance(16);
    if (this.pictureCodingType <= 0 || this.pictureCodingType >= E)return;
    if (this.pictureCodingType == w) {
      this.fullPelForward = this.buffer.getBits(1), this.forwardFCode = this.buffer.getBits(3);
      if (this.forwardFCode == 0)return;
      this.forwardRSize = this.forwardFCode - 1, this.forwardF = 1 << this.forwardRSize
    }
    var t = 0;
    do t = this.buffer.findNextMPEGStartCode(); while (t == k || t == L);
    while (t >= T && t <= N)this.decodeSlice(t & 255), t = this.buffer.findNextMPEGStartCode();
    this.buffer.rewind(32), this.recordFrameFromCurrentBuffer(), e != i && (this.renderFrame(), this.externalDecodeCallback && this.externalDecodeCallback(this, this.canvas));
    if (this.pictureCodingType == b || this.pictureCodingType == w) {
      var n = this.forwardY, r = this.forwardY32, s = this.forwardCr, o = this.forwardCr32, u = this.forwardCb, a = this.forwardCb32;
      this.forwardY = this.currentY, this.forwardY32 = this.currentY32, this.forwardCr = this.currentCr, this.forwardCr32 = this.currentCr32, this.forwardCb = this.currentCb, this.forwardCb32 = this.currentCb32, this.currentY = n, this.currentY32 = r, this.currentCr = s, this.currentCr32 = o, this.currentCb = u, this.currentCb32 = a
    }
  }, n.prototype.YCbCrToRGBA = function () {
    var e = this.currentY, t = this.currentCb, n = this.currentCr, r = this.currentRGBA.data, i = 0, s = this.codedWidth, o = this.codedWidth + (this.codedWidth - this.width), u = 0, a = this.halfWidth - (this.width >> 1), f = 0, l = this.width * 4, c = this.width * 4, h = this.width >> 1, p = this.height >> 1, d, v, m, g, y, b;
    for (var w = 0; w < p; w++) {
      for (var E = 0; E < h; E++) {
        v = t[u], m = n[u], u++, g = m + (m * 103 >> 8) - 179, y = (v * 88 >> 8) - 44 + (m * 183 >> 8) - 91, b = v + (v * 198 >> 8) - 227;
        var S = e[i++], x = e[i++];
        r[f] = S + g, r[f + 1] = S - y, r[f + 2] = S + b, r[f + 4] = x + g, r[f + 5] = x - y, r[f + 6] = x + b, f += 8;
        var T = e[s++], N = e[s++];
        r[l] = T + g, r[l + 1] = T - y, r[l + 2] = T + b, r[l + 4] = N + g, r[l + 5] = N - y, r[l + 6] = N + b, l += 8
      }
      i += o, s += o, f += c, l += c, u += a
    }
  }, n.prototype.renderFrame2D = function () {
    this.YCbCrToRGBA(), this.canvasContext.putImageData(this.currentRGBA, 0, 0)
  }, n.prototype.gl = null, n.prototype.program = null, n.prototype.YTexture = null, n.prototype.CBTexture = null, n.prototype.CRTexture = null, n.prototype.createTexture = function (e, t) {
    var n = this.gl, r = n.createTexture();
    return n.bindTexture(n.TEXTURE_2D, r), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE), n.uniform1i(n.getUniformLocation(this.program, t), e), r
  }, n.prototype.compileShader = function (e, t) {
    var n = this.gl, r = n.createShader(e);
    n.shaderSource(r, t), n.compileShader(r);
    if (!n.getShaderParameter(r, n.COMPILE_STATUS))throw new Error(n.getShaderInfoLog(r));
    return r
  }, n.prototype.initWebGL = function () {
    try {
      var e = this.gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl")
    } catch (t) {
      return !1
    }
    if (!e)return !1;
    this.buffer = e.createBuffer(), e.bindBuffer(e.ARRAY_BUFFER, this.buffer), e.bufferData(e.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), e.STATIC_DRAW), this.program = e.createProgram(), e.attachShader(this.program, this.compileShader(e.VERTEX_SHADER, M)), e.attachShader(this.program, this.compileShader(e.FRAGMENT_SHADER, A)), e.linkProgram(this.program);
    if (!e.getProgramParameter(this.program, e.LINK_STATUS))throw new Error(e.getProgramInfoLog(this.program));
    e.useProgram(this.program), this.YTexture = this.createTexture(0, "YTexture"), this.CBTexture = this.createTexture(1, "CBTexture"), this.CRTexture = this.createTexture(2, "CRTexture");
    var n = e.getAttribLocation(this.program, "vertex");
    return e.enableVertexAttribArray(n), e.vertexAttribPointer(n, 2, e.FLOAT, !1, 0, 0), this.loadingProgram = e.createProgram(), e.attachShader(this.loadingProgram, this.compileShader(e.VERTEX_SHADER, M)), e.attachShader(this.loadingProgram, this.compileShader(e.FRAGMENT_SHADER, O)), e.linkProgram(this.loadingProgram), e.useProgram(this.loadingProgram), n = e.getAttribLocation(this.loadingProgram, "vertex"), e.enableVertexAttribArray(n), e.vertexAttribPointer(n, 2, e.FLOAT, !1, 0, 0), !0
  }, n.prototype.renderFrameGL = function () {
    var e = this.gl, t = new Uint8Array(this.currentY.buffer), n = new Uint8Array(this.currentCr.buffer), r = new Uint8Array(this.currentCb.buffer);
    e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, this.YTexture), e.texImage2D(e.TEXTURE_2D, 0, e.LUMINANCE, this.codedWidth, this.height, 0, e.LUMINANCE, e.UNSIGNED_BYTE, t), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, this.CBTexture), e.texImage2D(e.TEXTURE_2D, 0, e.LUMINANCE, this.halfWidth, this.height / 2, 0, e.LUMINANCE, e.UNSIGNED_BYTE, n), e.activeTexture(e.TEXTURE2), e.bindTexture(e.TEXTURE_2D, this.CRTexture), e.texImage2D(e.TEXTURE_2D, 0, e.LUMINANCE, this.halfWidth, this.height / 2, 0, e.LUMINANCE, e.UNSIGNED_BYTE, r), e.drawArrays(e.TRIANGLE_STRIP, 0, 4)
  }, n.prototype.quantizerScale = 0, n.prototype.sliceBegin = !1, n.prototype.decodeSlice = function (e) {
    this.sliceBegin = !0, this.macroblockAddress = (e - 1) * this.mbWidth - 1, this.motionFwH = this.motionFwHPrev = 0, this.motionFwV = this.motionFwVPrev = 0, this.dcPredictorY = 128, this.dcPredictorCr = 128, this.dcPredictorCb = 128, this.quantizerScale = this.buffer.getBits(5);
    while (this.buffer.getBits(1))this.buffer.advance(8);
    do this.decodeMacroblock(); while (!this.buffer.nextBytesAreStartCode())
  }, n.prototype.macroblockAddress = 0, n.prototype.mbRow = 0, n.prototype.mbCol = 0, n.prototype.macroblockType = 0, n.prototype.macroblockIntra = !1, n.prototype.macroblockMotFw = !1, n.prototype.motionFwH = 0, n.prototype.motionFwV = 0, n.prototype.motionFwHPrev = 0, n.prototype.motionFwVPrev = 0, n.prototype.decodeMacroblock = function () {
    var e = 0, t = this.readCode(l);
    while (t == 34)t = this.readCode(l);
    while (t == 35)e += 33, t = this.readCode(l);
    e += t;
    if (this.sliceBegin)this.sliceBegin = !1, this.macroblockAddress += e; else {
      if (this.macroblockAddress + e >= this.mbSize)return;
      e > 1 && (this.dcPredictorY = 128, this.dcPredictorCr = 128, this.dcPredictorCb = 128, this.pictureCodingType == w && (this.motionFwH = this.motionFwHPrev = 0, this.motionFwV = this.motionFwVPrev = 0));
      while (e > 1)this.macroblockAddress++, this.mbRow = this.macroblockAddress / this.mbWidth | 0, this.mbCol = this.macroblockAddress % this.mbWidth, this.copyMacroblock(this.motionFwH, this.motionFwV, this.forwardY, this.forwardCr, this.forwardCb), e--;
      this.macroblockAddress++
    }
    this.mbRow = this.macroblockAddress / this.mbWidth | 0, this.mbCol = this.macroblockAddress % this.mbWidth, this.macroblockType = this.readCode(_[this.pictureCodingType]), this.macroblockIntra = this.macroblockType & 1, this.macroblockMotFw = this.macroblockType & 8, (this.macroblockType & 16) != 0 && (this.quantizerScale = this.buffer.getBits(5)), this.macroblockIntra ? (this.motionFwH = this.motionFwHPrev = 0, this.motionFwV = this.motionFwVPrev = 0) : (this.dcPredictorY = 128, this.dcPredictorCr = 128, this.dcPredictorCb = 128, this.decodeMotionVectors(), this.copyMacroblock(this.motionFwH, this.motionFwV, this.forwardY, this.forwardCr, this.forwardCb));
    var n = (this.macroblockType & 2) != 0 ? this.readCode(d) : this.macroblockIntra ? 63 : 0;
    for (var r = 0, i = 32; r < 6; r++)(n & i) != 0 && this.decodeBlock(r), i >>= 1
  }, n.prototype.decodeMotionVectors = function () {
    var e, t, n = 0;
    this.macroblockMotFw ? (e = this.readCode(v), e != 0 && this.forwardF != 1 ? (n = this.buffer.getBits(this.forwardRSize), t = (Math.abs(e) - 1 << this.forwardRSize) + n + 1, e < 0 && (t = -t)) : t = e, this.motionFwHPrev += t, this.motionFwHPrev > (this.forwardF << 4) - 1 ? this.motionFwHPrev -= this.forwardF << 5 : this.motionFwHPrev < -this.forwardF << 4 && (this.motionFwHPrev += this.forwardF << 5), this.motionFwH = this.motionFwHPrev, this.fullPelForward && (this.motionFwH <<= 1), e = this.readCode(v), e != 0 && this.forwardF != 1 ? (n = this.buffer.getBits(this.forwardRSize), t = (Math.abs(e) - 1 << this.forwardRSize) + n + 1, e < 0 && (t = -t)) : t = e, this.motionFwVPrev += t, this.motionFwVPrev > (this.forwardF << 4) - 1 ? this.motionFwVPrev -= this.forwardF << 5 : this.motionFwVPrev < -this.forwardF << 4 && (this.motionFwVPrev += this.forwardF << 5), this.motionFwV = this.motionFwVPrev, this.fullPelForward && (this.motionFwV <<= 1)) : this.pictureCodingType == w && (this.motionFwH = this.motionFwHPrev = 0, this.motionFwV = this.motionFwVPrev = 0)
  }, n.prototype.copyMacroblock = function (e, t, n, r, i) {
    var s, o, u, a, f, l, c, h, p, d = this.currentY32, v = this.currentCb32, m = this.currentCr32;
    s = this.codedWidth, o = s - 16, u = e >> 1, a = t >> 1, f = (e & 1) == 1, l = (t & 1) == 1, c = ((this.mbRow << 4) + a) * s + (this.mbCol << 4) + u, h = this.mbRow * s + this.mbCol << 2, p = h + (s << 2);
    var g, y, b;
    if (f)if (l)while (h < p) {
      g = n[c] + n[c + s], c++;
      for (var w = 0; w < 4; w++)y = n[c] + n[c + s], c++, b = g + y + 2 >> 2 & 255, g = n[c] + n[c + s], c++, b |= g + y + 2 << 6 & 65280, y = n[c] + n[c + s], c++, b |= g + y + 2 << 14 & 16711680, g = n[c] + n[c + s], c++, b |= g + y + 2 << 22 & 4278190080, d[h++] = b;
      h += o >> 2, c += o - 1
    } else while (h < p) {
      g = n[c++];
      for (var w = 0; w < 4; w++)y = n[c++], b = g + y + 1 >> 1 & 255, g = n[c++], b |= g + y + 1 << 7 & 65280, y = n[c++], b |= g + y + 1 << 15 & 16711680, g = n[c++], b |= g + y + 1 << 23 & 4278190080, d[h++] = b;
      h += o >> 2, c += o - 1
    } else if (l)while (h < p) {
      for (var w = 0; w < 4; w++)b = n[c] + n[c + s] + 1 >> 1 & 255, c++, b |= n[c] + n[c + s] + 1 << 7 & 65280, c++, b |= n[c] + n[c + s] + 1 << 15 & 16711680, c++, b |= n[c] + n[c + s] + 1 << 23 & 4278190080, c++, d[h++] = b;
      h += o >> 2, c += o
    } else while (h < p) {
      for (var w = 0; w < 4; w++)b = n[c], c++, b |= n[c] << 8, c++, b |= n[c] << 16, c++, b |= n[c] << 24, c++, d[h++] = b;
      h += o >> 2, c += o
    }
    s = this.halfWidth, o = s - 8, u = e / 2 >> 1, a = t / 2 >> 1, f = (e / 2 & 1) == 1, l = (t / 2 & 1) == 1, c = ((this.mbRow << 3) + a) * s + (this.mbCol << 3) + u, h = this.mbRow * s + this.mbCol << 1, p = h + (s << 1);
    var E, S, x, T, N, C;
    if (f)if (l)while (h < p) {
      E = r[c] + r[c + s], T = i[c] + i[c + s], c++;
      for (var w = 0; w < 2; w++)S = r[c] + r[c + s], N = i[c] + i[c + s], c++, x = E + S + 2 >> 2 & 255, C = T + N + 2 >> 2 & 255, E = r[c] + r[c + s], T = i[c] + i[c + s], c++, x |= E + S + 2 << 6 & 65280, C |= T + N + 2 << 6 & 65280, S = r[c] + r[c + s], N = i[c] + i[c + s], c++, x |= E + S + 2 << 14 & 16711680, C |= T + N + 2 << 14 & 16711680, E = r[c] + r[c + s], T = i[c] + i[c + s], c++, x |= E + S + 2 << 22 & 4278190080, C |= T + N + 2 << 22 & 4278190080, m[h] = x, v[h] = C, h++;
      h += o >> 2, c += o - 1
    } else while (h < p) {
      E = r[c], T = i[c], c++;
      for (var w = 0; w < 2; w++)S = r[c], N = i[c++], x = E + S + 1 >> 1 & 255, C = T + N + 1 >> 1 & 255, E = r[c], T = i[c++], x |= E + S + 1 << 7 & 65280, C |= T + N + 1 << 7 & 65280, S = r[c], N = i[c++], x |= E + S + 1 << 15 & 16711680, C |= T + N + 1 << 15 & 16711680, E = r[c], T = i[c++], x |= E + S + 1 << 23 & 4278190080, C |= T + N + 1 << 23 & 4278190080, m[h] = x, v[h] = C, h++;
      h += o >> 2, c += o - 1
    } else if (l)while (h < p) {
      for (var w = 0; w < 2; w++)x = r[c] + r[c + s] + 1 >> 1 & 255, C = i[c] + i[c + s] + 1 >> 1 & 255, c++, x |= r[c] + r[c + s] + 1 << 7 & 65280, C |= i[c] + i[c + s] + 1 << 7 & 65280, c++, x |= r[c] + r[c + s] + 1 << 15 & 16711680, C |= i[c] + i[c + s] + 1 << 15 & 16711680, c++, x |= r[c] + r[c + s] + 1 << 23 & 4278190080, C |= i[c] + i[c + s] + 1 << 23 & 4278190080, c++, m[h] = x, v[h] = C, h++;
      h += o >> 2, c += o
    } else while (h < p) {
      for (var w = 0; w < 2; w++)x = r[c], C = i[c], c++, x |= r[c] << 8, C |= i[c] << 8, c++, x |= r[c] << 16, C |= i[c] << 16, c++, x |= r[c] << 24, C |= i[c] << 24, c++, m[h] = x, v[h] = C, h++;
      h += o >> 2, c += o
    }
  }, n.prototype.dcPredictorY, n.prototype.dcPredictorCr, n.prototype.dcPredictorCb, n.prototype.blockData = null, n.prototype.decodeBlock = function (e) {
    var t = 0, n;
    if (this.macroblockIntra) {
      var r, i;
      e < 4 ? (r = this.dcPredictorY, i = this.readCode(m)) : (r = e == 4 ? this.dcPredictorCr : this.dcPredictorCb, i = this.readCode(g));
      if (i > 0) {
        var s = this.buffer.getBits(i);
        (s & 1 << i - 1) != 0 ? this.blockData[0] = r + s : this.blockData[0] = r + (-1 << i | s + 1)
      } else this.blockData[0] = r;
      e < 4 ? this.dcPredictorY = this.blockData[0] : e == 4 ? this.dcPredictorCr = this.blockData[0] : this.dcPredictorCb = this.blockData[0], this.blockData[0] <<= 8, n = this.intraQuantMatrix, t = 1
    } else n = this.nonIntraQuantMatrix;
    var u = 0;
    for (; ;) {
      var a = 0, l = this.readCode(y);
      if (l == 1 && t > 0 && this.buffer.getBits(1) == 0)break;
      l == 65535 ? (a = this.buffer.getBits(6), u = this.buffer.getBits(8), u == 0 ? u = this.buffer.getBits(8) : u == 128 ? u = this.buffer.getBits(8) - 256 : u > 128 && (u -= 256)) : (a = l >> 8, u = l & 255, this.buffer.getBits(1) && (u = -u)), t += a;
      var c = o[t];
      t++, u <<= 1, this.macroblockIntra || (u += u < 0 ? -1 : 1), u = u * this.quantizerScale * n[c] >> 4, (u & 1) == 0 && (u -= u > 0 ? 1 : -1), u > 2047 ? u = 2047 : u < -2048 && (u = -2048), this.blockData[c] = u * f[c]
    }
    var h, p, d;
    e < 4 ? (h = this.currentY, d = this.codedWidth - 8, p = this.mbRow * this.codedWidth + this.mbCol << 4, (e & 1) != 0 && (p += 8), (e & 2) != 0 && (p += this.codedWidth << 3)) : (h = e == 4 ? this.currentCb : this.currentCr, d = (this.codedWidth >> 1) - 8, p = (this.mbRow * this.codedWidth << 2) + (this.mbCol << 3)), this.macroblockIntra ? t == 1 ? (this.copyValueToDestination(this.blockData[0] + 128 >> 8, h, p, d), this.blockData[0] = 0) : (this.IDCT(), this.copyBlockToDestination(this.blockData, h, p, d), this.blockData.set(this.zeroBlockData)) : t == 1 ? (this.addValueToDestination(this.blockData[0] + 128 >> 8, h, p, d), this.blockData[0] = 0) : (this.IDCT(), this.addBlockToDestination(this.blockData, h, p, d), this.blockData.set(this.zeroBlockData)), t = 0
  }, n.prototype.copyBlockToDestination = function (e, t, n, r) {
    for (var i = 0; i < 64; i += 8, n += r + 8)t[n + 0] = e[i + 0], t[n + 1] = e[i + 1], t[n + 2] = e[i + 2], t[n + 3] = e[i + 3], t[n + 4] = e[i + 4], t[n + 5] = e[i + 5], t[n + 6] = e[i + 6], t[n + 7] = e[i + 7]
  }, n.prototype.addBlockToDestination = function (e, t, n, r) {
    for (var i = 0; i < 64; i += 8, n += r + 8)t[n + 0] += e[i + 0], t[n + 1] += e[i + 1], t[n + 2] += e[i + 2], t[n + 3] += e[i + 3], t[n + 4] += e[i + 4], t[n + 5] += e[i + 5], t[n + 6] += e[i + 6], t[n + 7] += e[i + 7]
  }, n.prototype.copyValueToDestination = function (e, t, n, r) {
    for (var i = 0; i < 64; i += 8, n += r + 8)t[n + 0] = e, t[n + 1] = e, t[n + 2] = e, t[n + 3] = e, t[n + 4] = e, t[n + 5] = e, t[n + 6] = e, t[n + 7] = e
  }, n.prototype.addValueToDestination = function (e, t, n, r) {
    for (var i = 0; i < 64; i += 8, n += r + 8)t[n + 0] += e, t[n + 1] += e, t[n + 2] += e, t[n + 3] += e, t[n + 4] += e, t[n + 5] += e, t[n + 6] += e, t[n + 7] += e
  }, n.prototype.copyBlockToDestinationClamp = function (e, t, n, r) {
    var i = 0;
    for (var s = 0; s < 8; s++) {
      for (var o = 0; o < 8; o++) {
        var u = e[i++];
        t[n++] = u > 255 ? 255 : u < 0 ? 0 : u
      }
      n += r
    }
  }, n.prototype.addBlockToDestinationClamp = function (e, t, n, r) {
    var i = 0;
    for (var s = 0; s < 8; s++) {
      for (var o = 0; o < 8; o++) {
        var u = e[i++] + t[n];
        t[n++] = u > 255 ? 255 : u < 0 ? 0 : u
      }
      n += r
    }
  }, n.prototype.IDCT = function () {
    var e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b = this.blockData;
    for (y = 0; y < 8; ++y)e = b[32 + y], t = b[16 + y] + b[48 + y], n = b[40 + y] - b[24 + y], s = b[8 + y] + b[56 + y], o = b[24 + y] + b[40 + y], r = b[8 + y] - b[56 + y], i = s + o, u = b[0 + y], h = (r * 473 - n * 196 + 128 >> 8) - i, a = h - ((s - o) * 362 + 128 >> 8), f = u - e, l = ((b[16 + y] - b[48 + y]) * 362 + 128 >> 8) - t, c = u + e, p = f + l, d = c + t, v = f - l, m = c - t, g = -a - (n * 473 + r * 196 + 128 >> 8), b[0 + y] = i + d, b[8 + y] = h + p, b[16 + y] = v - a, b[24 + y] = m - g, b[32 + y] = m + g, b[40 + y] = a + v, b[48 + y] = p - h, b[56 + y] = d - i;
    for (y = 0; y < 64; y += 8)e = b[4 + y], t = b[2 + y] + b[6 + y], n = b[5 + y] - b[3 + y], s = b[1 + y] + b[7 + y], o = b[3 + y] + b[5 + y], r = b[1 + y] - b[7 + y], i = s + o, u = b[0 + y], h = (r * 473 - n * 196 + 128 >> 8) - i, a = h - ((s - o) * 362 + 128 >> 8), f = u - e, l = ((b[2 + y] - b[6 + y]) * 362 + 128 >> 8) - t, c = u + e, p = f + l, d = c + t, v = f - l, m = c - t, g = -a - (n * 473 + r * 196 + 128 >> 8), b[0 + y] = i + d + 128 >> 8, b[1 + y] = h + p + 128 >> 8, b[2 + y] = v - a + 128 >> 8, b[3 + y] = m - g + 128 >> 8, b[4 + y] = m + g + 128 >> 8, b[5 + y] = a + v + 128 >> 8, b[6 + y] = p - h + 128 >> 8, b[7 + y] = d - i + 128 >> 8
  };
  var r = "jsmp", i = 1, s = [0, 23.976, 24, 25, 29.97, 30, 50, 59.94, 60, 0, 0, 0, 0, 0, 0, 0], o = new Uint8Array([0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63]), u = new Uint8Array([8, 16, 19, 22, 26, 27, 29, 34, 16, 16, 22, 24, 27, 29, 34, 37, 19, 22, 26, 27, 29, 34, 34, 38, 22, 22, 26, 27, 29, 34, 37, 40, 22, 26, 27, 29, 32, 35, 40, 48, 26, 27, 29, 32, 35, 40, 48, 58, 26, 27, 29, 34, 38, 46, 56, 69, 27, 29, 35, 38, 46, 56, 69, 83]), a = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16]), f = new Uint8Array([32, 44, 42, 38, 32, 25, 17, 9, 44, 62, 58, 52, 44, 35, 24, 12, 42, 58, 55, 49, 42, 33, 23, 12, 38, 52, 49, 44, 38, 30, 20, 10, 32, 44, 42, 38, 32, 25, 17, 9, 25, 35, 33, 30, 25, 20, 14, 7, 17, 24, 23, 20, 17, 14, 9, 5, 9, 12, 12, 10, 9, 7, 5, 2]), l = new Int16Array([3, 6, 0, 9, 12, 0, 0, 0, 1, 15, 18, 0, 21, 24, 0, 27, 30, 0, 33, 36, 0, 0, 0, 3, 0, 0, 2, 39, 42, 0, 45, 48, 0, 0, 0, 5, 0, 0, 4, 51, 54, 0, 57, 60, 0, 0, 0, 7, 0, 0, 6, 63, 66, 0, 69, 72, 0, 75, 78, 0, 81, 84, 0, -1, 87, 0, -1, 90, 0, 93, 96, 0, 99, 102, 0, 105, 108, 0, 111, 114, 0, 0, 0, 9, 0, 0, 8, 117, 120, 0, 123, 126, 0, 129, 132, 0, 135, 138, 0, 0, 0, 15, 0, 0, 14, 0, 0, 13, 0, 0, 12, 0, 0, 11, 0, 0, 10, 141, -1, 0, -1, 144, 0, 147, 150, 0, 153, 156, 0, 159, 162, 0, 165, 168, 0, 171, 174, 0, 177, 180, 0, 183, -1, 0, -1, 186, 0, 189, 192, 0, 195, 198, 0, 201, 204, 0, 207, 210, 0, 213, 216, 0, 219, 222, 0, 0, 0, 21, 0, 0, 20, 0, 0, 19, 0, 0, 18, 0, 0, 17, 0, 0, 16, 0, 0, 35, 0, 0, 34, 0, 0, 33, 0, 0, 32, 0, 0, 31, 0, 0, 30, 0, 0, 29, 0, 0, 28, 0, 0, 27, 0, 0, 26, 0, 0, 25, 0, 0, 24, 0, 0, 23, 0, 0, 22]), c = new Int8Array([3, 6, 0, -1, 9, 0, 0, 0, 1, 0, 0, 17]), h = new Int8Array([3, 6, 0, 9, 12, 0, 0, 0, 10, 15, 18, 0, 0, 0, 2, 21, 24, 0, 0, 0, 8, 27, 30, 0, 33, 36, 0, -1, 39, 0, 0, 0, 18, 0, 0, 26, 0, 0, 1, 0, 0, 17]), p = new Int8Array([3, 6, 0, 9, 15, 0, 12, 18, 0, 24, 21, 0, 0, 0, 12, 27, 30, 0, 0, 0, 14, 39, 42, 0, 36, 33, 0, 0, 0, 4, 0, 0, 6, 54, 48, 0, 45, 51, 0, 0, 0, 8, 0, 0, 10, -1, 57, 0, 0, 0, 1, 60, 63, 0, 0, 0, 30, 0, 0, 17, 0, 0, 22, 0, 0, 26]), d = new Int16Array([6, 3, 0, 9, 18, 0, 12, 15, 0, 24, 33, 0, 36, 39, 0, 27, 21, 0, 30, 42, 0, 60, 57, 0, 54, 48, 0, 69, 51, 0, 81, 75, 0, 63, 84, 0, 45, 66, 0, 72, 78, 0, 0, 0, 60, 105, 120, 0, 132, 144, 0, 114, 108, 0, 126, 141, 0, 87, 93, 0, 117, 96, 0, 0, 0, 32, 135, 138, 0, 99, 123, 0, 129, 102, 0, 0, 0, 4, 90, 111, 0, 0, 0, 8, 0, 0, 16, 0, 0, 44, 150, 168, 0, 0, 0, 28, 0, 0, 52, 0, 0, 62, 183, 177, 0, 156, 180, 0, 0, 0, 1, 165, 162, 0, 0, 0, 61, 0, 0, 56, 171, 174, 0, 0, 0, 2, 0, 0, 40, 153, 186, 0, 0, 0, 48, 192, 189, 0, 147, 159, 0, 0, 0, 20, 0, 0, 12, 240, 249, 0, 0, 0, 63, 231, 225, 0, 195, 219, 0, 252, 198, 0, 0, 0, 24, 0, 0, 36, 0, 0, 3, 207, 261, 0, 243, 237, 0, 204, 213, 0, 210, 234, 0, 201, 228, 0, 216, 222, 0, 258, 255, 0, 264, 246, 0, -1, 282, 0, 285, 291, 0, 0, 0, 33, 0, 0, 9, 318, 330, 0, 306, 348, 0, 0, 0, 5, 0, 0, 10, 279, 267, 0, 0, 0, 6, 0, 0, 18, 0, 0, 17, 0, 0, 34, 339, 357, 0, 309, 312, 0, 270, 276, 0, 327, 321, 0, 351, 354, 0, 303, 297, 0, 294, 288, 0, 300, 273, 0, 342, 345, 0, 315, 324, 0, 336, 333, 0, 363, 375, 0, 0, 0, 41, 0, 0, 14, 0, 0, 21, 372, 366, 0, 360, 369, 0, 0, 0, 11, 0, 0, 19, 0, 0, 7, 0, 0, 35, 0, 0, 13, 0, 0, 50, 0, 0, 49, 0, 0, 58, 0, 0, 37, 0, 0, 25, 0, 0, 45, 0, 0, 57, 0, 0, 26, 0, 0, 29, 0, 0, 38, 0, 0, 53, 0, 0, 23, 0, 0, 43, 0, 0, 46, 0, 0, 42, 0, 0, 22, 0, 0, 54, 0, 0, 51, 0, 0, 15, 0, 0, 30, 0, 0, 39, 0, 0, 47, 0, 0, 55, 0, 0, 27, 0, 0, 59, 0, 0, 31]), v = new Int16Array([3, 6, 0, 12, 9, 0, 0, 0, 0, 18, 15, 0, 24, 21, 0, 0, 0, -1, 0, 0, 1, 27, 30, 0, 36, 33, 0, 0, 0, 2, 0, 0, -2, 42, 45, 0, 48, 39, 0, 60, 54, 0, 0, 0, 3, 0, 0, -3, 51, 57, 0, -1, 69, 0, 81, 75, 0, 78, 63, 0, 72, 66, 0, 96, 84, 0, 87, 93, 0, -1, 99, 0, 108, 105, 0, 0, 0, -4, 90, 102, 0, 0, 0, 4, 0, 0, -7, 0, 0, 5, 111, 123, 0, 0, 0, -5, 0, 0, 7, 114, 120, 0, 126, 117, 0, 0, 0, -6, 0, 0, 6, 153, 162, 0, 150, 147, 0, 135, 138, 0, 156, 141, 0, 129, 159, 0, 132, 144, 0, 0, 0, 10, 0, 0, 9, 0, 0, 8, 0, 0, -8, 171, 198, 0, 0, 0, -9, 180, 192, 0, 168, 183, 0, 165, 186, 0, 174, 189, 0, 0, 0, -10, 177, 195, 0, 0, 0, 12, 0, 0, 16, 0, 0, 13, 0, 0, 14, 0, 0, 11, 0, 0, 15, 0, 0, -16, 0, 0, -12, 0, 0, -14, 0, 0, -15, 0, 0, -11, 0, 0, -13]), m = new Int8Array([6, 3, 0, 18, 15, 0, 9, 12, 0, 0, 0, 1, 0, 0, 2, 27, 24, 0, 21, 30, 0, 0, 0, 0, 36, 33, 0, 0, 0, 4, 0, 0, 3, 39, 42, 0, 0, 0, 5, 0, 0, 6, 48, 45, 0, 51, -1, 0, 0, 0, 7, 0, 0, 8]), g = new Int8Array([6, 3, 0, 12, 9, 0, 18, 15, 0, 24, 21, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 30, 27, 0, 0, 0, 3, 36, 33, 0, 0, 0, 4, 42, 39, 0, 0, 0, 5, 48, 45, 0, 0, 0, 6, 51, -1, 0, 0, 0, 7, 0, 0, 8]), y = new Int32Array([3, 6, 0, 12, 9, 0, 0, 0, 1, 21, 24, 0, 18, 15, 0, 39, 27, 0, 33, 30, 0, 42, 36, 0, 0, 0, 257, 60, 66, 0, 54, 63, 0, 48, 57, 0, 0, 0, 513, 51, 45, 0, 0, 0, 2, 0, 0, 3, 81, 75, 0, 87, 93, 0, 72, 78, 0, 96, 90, 0, 0, 0, 1025, 69, 84, 0, 0, 0, 769, 0, 0, 258, 0, 0, 1793, 0, 0, 65535, 0, 0, 1537, 111, 108, 0, 0, 0, 1281, 105, 102, 0, 117, 114, 0, 99, 126, 0, 120, 123, 0, 156, 150, 0, 162, 159, 0, 144, 147, 0, 129, 135, 0, 138, 132, 0, 0, 0, 2049, 0, 0, 4, 0, 0, 514, 0, 0, 2305, 153, 141, 0, 165, 171, 0, 180, 168, 0, 177, 174, 0, 183, 186, 0, 0, 0, 2561, 0, 0, 3329, 0, 0, 6, 0, 0, 259, 0, 0, 5, 0, 0, 770, 0, 0, 2817, 0, 0, 3073, 228, 225, 0, 201, 210, 0, 219, 213, 0, 234, 222, 0, 216, 231, 0, 207, 192, 0, 204, 189, 0, 198, 195, 0, 243, 261, 0, 273, 240, 0, 246, 237, 0, 249, 258, 0, 279, 276, 0, 252, 255, 0, 270, 282, 0, 264, 267, 0, 0, 0, 515, 0, 0, 260, 0, 0, 7, 0, 0, 1026, 0, 0, 1282, 0, 0, 4097, 0, 0, 3841, 0, 0, 3585, 315, 321, 0, 333, 342, 0, 312, 291, 0, 375, 357, 0, 288, 294, 0, -1, 369, 0, 285, 303, 0, 318, 363, 0, 297, 306, 0, 339, 309, 0, 336, 348, 0, 330, 300, 0, 372, 345, 0, 351, 366, 0, 327, 354, 0, 360, 324, 0, 381, 408, 0, 417, 420, 0, 390, 378, 0, 435, 438, 0, 384, 387, 0, 0, 0, 2050, 396, 402, 0, 465, 462, 0, 0, 0, 8, 411, 399, 0, 429, 432, 0, 453, 414, 0, 426, 423, 0, 0, 0, 10, 0, 0, 9, 0, 0, 11, 0, 0, 5377, 0, 0, 1538, 0, 0, 771, 0, 0, 5121, 0, 0, 1794, 0, 0, 4353, 0, 0, 4609, 0, 0, 4865, 444, 456, 0, 0, 0, 1027, 459, 450, 0, 0, 0, 261, 393, 405, 0, 0, 0, 516, 447, 441, 0, 516, 519, 0, 486, 474, 0, 510, 483, 0, 504, 498, 0, 471, 537, 0, 507, 501, 0, 522, 513, 0, 534, 531, 0, 468, 477, 0, 492, 495, 0, 549, 546, 0, 525, 528, 0, 0, 0, 263, 0, 0, 2562, 0, 0, 2306, 0, 0, 5633, 0, 0, 5889, 0, 0, 6401, 0, 0, 6145, 0, 0, 1283, 0, 0, 772, 0, 0, 13, 0, 0, 12, 0, 0, 14, 0, 0, 15, 0, 0, 517, 0, 0, 6657, 0, 0, 262, 540, 543, 0, 480, 489, 0, 588, 597, 0, 0, 0, 27, 609, 555, 0, 606, 603, 0, 0, 0, 19, 0, 0, 22, 591, 621, 0, 0, 0, 18, 573, 576, 0, 564, 570, 0, 0, 0, 20, 552, 582, 0, 0, 0, 21, 558, 579, 0, 0, 0, 23, 612, 594, 0, 0, 0, 25, 0, 0, 24, 600, 615, 0, 0, 0, 31, 0, 0, 30, 0, 0, 28, 0, 0, 29, 0, 0, 26, 0, 0, 17, 0, 0, 16, 567, 618, 0, 561, 585, 0, 654, 633, 0, 0, 0, 37, 645, 648, 0, 0, 0, 36, 630, 636, 0, 0, 0, 34, 639, 627, 0, 663, 666, 0, 657, 624, 0, 651, 642, 0, 669, 660, 0, 0, 0, 35, 0, 0, 267, 0, 0, 40, 0, 0, 268, 0, 0, 266, 0, 0, 32, 0, 0, 264, 0, 0, 265, 0, 0, 38, 0, 0, 269, 0, 0, 270, 0, 0, 33, 0, 0, 39, 0, 0, 7937, 0, 0, 6913, 0, 0, 7681, 0, 0, 4098, 0, 0, 7425, 0, 0, 7169, 0, 0, 271, 0, 0, 274, 0, 0, 273, 0, 0, 272, 0, 0, 1539, 0, 0, 2818, 0, 0, 3586, 0, 0, 3330, 0, 0, 3074, 0, 0, 3842]), b = 1, w = 2, E = 3, S = 4, x = 179, T = 1, N = 175, C = 0, k = 181, L = 178, A = ["precision mediump float;", "uniform sampler2D YTexture;", "uniform sampler2D CBTexture;", "uniform sampler2D CRTexture;", "varying vec2 texCoord;", "void main() {", "float y = texture2D(YTexture, texCoord).r;", "float cr = texture2D(CBTexture, texCoord).r - 0.5;", "float cb = texture2D(CRTexture, texCoord).r - 0.5;", "gl_FragColor = vec4(", "y + 1.4 * cr,", "y + -0.343 * cb - 0.711 * cr,", "y + 1.765 * cb,", "1.0", ");", "}"].join("\n"), O = ["precision mediump float;", "uniform float loaded;", "varying vec2 texCoord;", "void main() {", "float c = ceil(loaded-(1.0-texCoord.y));", "gl_FragColor = vec4(c,c,c,1);", "}"].join("\n"), M = ["attribute vec2 vertex;", "varying vec2 texCoord;", "void main() {", "texCoord = vertex;", "gl_Position = vec4((vertex * 2.0 - 1.0) * vec2(1, -1), 0.0, 1.0);", "}"].join("\n"), _ = [null, c, h, p], D = function (e) {
    this.bytes = new Uint8Array(e), this.length = this.bytes.length, this.writePos = this.bytes.length, this.index = 0
  };
  D.NOT_FOUND = -1, D.prototype.findNextMPEGStartCode = function () {
    for (var e = this.index + 7 >> 3; e < this.writePos; e++)if (this.bytes[e] == 0 && this.bytes[e + 1] == 0 && this.bytes[e + 2] == 1)return this.index = e + 4 << 3, this.bytes[e + 3];
    return this.index = this.writePos << 3, D.NOT_FOUND
  }, D.prototype.nextBytesAreStartCode = function () {
    var e = this.index + 7 >> 3;
    return e >= this.writePos || this.bytes[e] == 0 && this.bytes[e + 1] == 0 && this.bytes[e + 2] == 1
  }, D.prototype.nextBits = function (e) {
    var t = this.index >> 3, n = 8 - this.index % 8;
    if (n >= e)return this.bytes[t] >> n - e & 255 >> 8 - e;
    var r = (this.index + e) % 8, i = this.index + e - 1 >> 3, s = this.bytes[t] & 255 >> 8 - n;
    for (t++; t < i; t++)s <<= 8, s |= this.bytes[t];
    return r > 0 ? (s <<= r, s |= this.bytes[t] >> 8 - r) : (s <<= 8, s |= this.bytes[t]), s
  }, D.prototype.getBits = function (e) {
    var t = this.nextBits(e);
    return this.index += e, t
  }, D.prototype.advance = function (e) {
    return this.index += e
  }, D.prototype.rewind = function (e) {
    return this.index -= e
  }
})(window)
