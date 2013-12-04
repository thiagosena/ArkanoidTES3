REPORTER = spec
test:
	@$(MAKE) lint
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@NODE_ENV=test ./node_modules/karma/bin/karma start karma.conf.js --browsers Firefox --single-run --reporters dots $(REPORTER)

lint:
	./node_modules/.bin/jshint ./js ./tests ./arkanoid.js ./audio.js

test-cov:
	$(MAKE) lint
	@NODE_ENV=test ./node_modules/.bin/istanbul cover \
	./node_modules/mocha/bin/_mocha -- -R spec

test-coveralls:
	@NODE_ENV=test ./node_modules/.bin/istanbul cover \
	./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && \
	cat ./coverage/lcov.info | ./bin/coveralls.js --verbose

vows-test:
	@NODE_ENV=test vows --spec

.PHONY: test