'use strict';

var bot = require('./src/twitter-stream-retweet/index');

class App {
	constructor(word, phrases) {
		this.bot = new bot(word, phrases);
	}
	stream() {
		this.bot.getStream();
	}
	get(limit) {
		// Need to figure out how to do this with the phrases as well
		// as the word to look for
		// this.bot.getTweets(limit);
	}
	streamAndRetweet() {
		this.bot.streamAndRetweet();
	}
}

module.exports = App;
