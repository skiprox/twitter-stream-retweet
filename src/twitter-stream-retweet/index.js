'use strict';

var _ = require('lodash');
var Twit = require('twit');
var credentials = require('./../../credentials');

/**
 * EatShitBot constructor description
 *
 * @class TwitterStreamRetweet
 * @classdesc TwitterStreamRetweet class A bot to stream and retweet stuff
 *
 * @param {string} word - A single string, comma separated, list of words to track
 * @param {array} phrases - Single strings to look for (since twitter stream doesn't check for words being grouped together)
 */
class TwitterStreamRetweet {
	constructor(word, phrases) {
		this.word = word;
		this.phrases = phrases;
		this.bot = null;
		this.stream = null;
		this.createTwitterConnection();
	}
	createTwitterConnection() {
		this.bot = new Twit({
			consumer_key:         credentials.consumer_key,
			consumer_secret:      credentials.consumer_secret,
			access_token:         credentials.access_token,
			access_token_secret:  credentials.access_token_secret
		});
	}
	getStream() {
		this.stream = this.bot.stream('statuses/filter', {
			track: this.word
		});
		this.stream.on('tweet', (tweet) => {
			this.filterTweet(tweet, this.logTweet);
		});
	}
	streamAndRetweet() {
		this.stream = this.bot.stream('statuses/filter', {
			track: this.word
		});
		this.stream.on('tweet', (tweet) => {
			this.filterTweet(tweet, this.retweet.bind(this));
		})

	}
	filterTweet(tweet, callback) {
		this.phrases.forEach((phrase) => {
			if (tweet['text'].toLowerCase().indexOf(phrase) !== -1) {
				callback(tweet);
			}
		});
	}
	retweet(tweet) {
		this.bot.post('statuses/retweet/' + tweet['id_str'], (error, tweet, response) => {
			if (!error) {
				this.logTweet(tweet);
			}
		});
	}
	logTweet(tweet) {
		console.log(`${tweet['text']}\n${tweet["user"]["screen_name"]}\n\n`);
	}
}

module.exports = TwitterStreamRetweet;
