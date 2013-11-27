REPORTER = spec
test:
	@$(MAKE) lint
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@NODE_ENV=test ./node_modules/.bin/mocha -b --reporter $(REPORTER)

lint:
	./node_modules/.bin/jshint ./js ./test ./arq.js

test-cov:
	$(MAKE) lint
	@NODE_ENV=test ./node_modules/.bin/istanbul cover \
	./node_modules/mocha/bin/_mocha -- -R spec

test-coveralls:
	@NODE_ENV=test ./node_modules/.bin/istanbul cover \
	./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && \
	cat ./coverage/lcov.info | ./js/coveralls.js

vows-test:
	@NODE_ENV=test vows --spec

.PHONY: test