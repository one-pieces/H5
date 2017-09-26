(function() {
  var isToasterShown = false;
  function showToaster(msg) {
    // Toaster没有显示时才显示
    if (!isToasterShown) {
      $(".toaster div").html(msg);
      $(".toaster").show();
      isToasterShown = true;
      var timeout = setTimeout(function () {
        $(".toaster").hide();
        isToasterShown = false;
        clearTimeout(timeout);
      }, 3000);
    }
  }
  window.showToaster = showToaster;
})();