install:
	@npm install --registry=http://r.tools.elenet.me
	@npm --registry=http://r.tools.elenet.me rebuild node-sass

dev: install
	cooking watch

deploy: install
	NODE_ENV=production cooking build