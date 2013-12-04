ArkanoidTES3
============
[![Build Status](https://travis-ci.org/thiagosena/ArkanoidTES3.png?branch=master)](https://travis-ci.org/thiagosena/ArkanoidTES3)
[![Coverage Status](https://coveralls.io/repos/thiagosena/ArkanoidTES3/badge.png)](https://coveralls.io/r/thiagosena/ArkanoidTES3)

A HTML5 experiment to implement the game ARKANOID in a `<canvas>`

<h3>Description</h3>
The project in question refers to a platform game inspired by the arcade Arkanoid for, which in turn was inspired by the original Breakout for Atari. The objective of the game is to control a paddle to bounce a ball against blocks on top of the screen. Each block sum hit points the player, the player loses the ball reaches the bottom of the screen.

<h3>Tests</h3>
App setup for unit testing client-side JavaScript code with [Jasmine.js](http://pivotal.github.io/jasmine/)

This sample also includes a [Karma](http://karma-runner.github.io/) configuration to run the tests automatically.

To use Karma, you need to have [node.js](http://nodejs.org) and [npm](https://npmjs.org/) installed. In the project directory, type `npm install karma-mocha`. After the karma install is finished, type `node_modules/.bin/karma start` and navigate to `http://localhost:9876` to let Karma capture the web browser and run the tests automatically.

In this sample, we use the [Travis CI](https://travis-ci.org) for continuous integration testing and [Coveralls](https://coveralls.io) for works with [Travis CI](https://travis-ci.org) to find gaps in coverage.

* [Travis CI](https://travis-ci.org) is a hosted, distributed continuous integration service used to build and test projects hosted at GitHub. [Travis CI](https://travis-ci.org) is configured by adding a file named .travis.yml, which is a YAML format text file, to the root directory of the GitHub repository.

* [Coveralls](https://coveralls.io) works with your CI server and sifts through your coverage data to find gaps in coverage you didn't even know you had, before they become a problem.
 
<h3>Important source files</h3>
* [arkanoid.js](https://github.com/thiagosena/ArkanoidTES3/blob/master/js/arkanoid.js) - implementation javascript code for the game<br />
* [audio.js](https://github.com/thiagosena/ArkanoidTES3/blob/master/js/audio.js) - implementation javascript code for the audio in the game<br />

<h3>Important tests files</h3>
* [ark-spec.js](https://github.com/thiagosena/ArkanoidTES3/blob/master/tests/ark-spec.js) - test implementation for the file arkanoid.js
* [audio-spec.js](https://github.com/thiagosena/ArkanoidTES3/blob/master/tests/audio-spec.js) - test implementation for the file audio.js
<br />