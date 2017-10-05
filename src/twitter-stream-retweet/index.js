'use strict';

var _ = require('lodash');
var Twit = require('twit');
var credentials = require('./../../credentials');

/**
 * EatShitBot constructor description
 *
 * @class EatShitBot
 * @classdesc EatShitBot class description
 *
 * @param {object} options - Instance instantiation object
 * @param {string} options.example - Example options property
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
			this.filterTweet(tweet, this.retweet);
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
			} else {
				console.log('Error: ', error);
			}
		});
	}
	logTweet(tweet) {
		console.log(`${tweet['text']}\n${tweet["user"]["screen_name"]}\n\n`);
	}
}

module.exports = TwitterStreamRetweet;
