.PHONY: help

help:
	@cat $(MAKEFILE_LIST) | \
		grep -E '^# ~~~ .*? [~]+$$|^[a-zA-Z0-9_-]+:.*?## .*$$' | \
		awk '{if ( $$1=="#" ) {\
			match($$0, /^# ~~~ (.+?) [~]+$$/, a);\
			{print "\n", a[1], "\n"}\
		} else { \
			match($$0, /^([a-zA-Z-]+):.*?## (.*)$$/, a); \
			{printf "  - \033[32m%-20s\033[0m %s\n",   a[1], a[2]} \
		};}'

install: ## Install node.js build requirements
	npm install

build: ## Ruilding CSS and JS
	npm run gulp
