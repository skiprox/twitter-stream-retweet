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
		this.getStream();

	}
	filterTweet(tweet, callback) {
		for (let string of this.phrases) {
			if (tweet['text'].toLowerCase().indexOf(string) !== -1) {
				callback(tweet);
			}
		}
	}
	logTweet(tweet) {
		console.log(`${tweet['text']}\n${tweet["user"]["screen_name"]}\n\n`);
	}
}

module.exports = TwitterStreamRetweet;

// EatShitBot.prototype.getStream = function(string) {
// 	this.stream = this.twitBot.stream('statuses/filter', {
// 		track: string
// 	});
// 	this.stream.on('tweet', function(tweet) {
// 		this.logTweet(tweet["text"], tweet["user"]["screen_name"]);
// 	}.bind(this));
// };

// EatShitBot.prototype.getTweets = function(string, count) {
// 	var statuses, i;
// 	this.twitBot.get('search/tweets', {
// 		q: '' + string + '',
// 		count: count
// 	}, function(error, data, response) {
// 		if (data) {
// 			statuses = data.statuses;
// 			i = statuses.length;
// 			while (i--) {
// 				this.logTweet(statuses[i]["text"], statuses[i]["user"]["screen_name"]);
// 			}
// 		} else {
// 			console.log(error);
// 		}
// 	}.bind(this));
// };

// EatShitBot.prototype.streamAndRetweet = function(string) {
// 	this.stream = this.twitBot.stream('statuses/filter', {
// 		track: string
// 	});
// 	this.stream.on('tweet', function(tweet) {
// 		if (tweet["text"].toLowerCase().indexOf(string.toLowerCase()) !== -1) {
// 			this.retweet(tweet.id_str);
// 		}
// 	}.bind(this));
// 	this.stream.on('disconnect', function(disconnectMessage) {
// 		console.log('disconnected:', disconnectMessage);
// 		this.streamAndRetweet(string);
// 	}.bind(this));
// 	this.stream.on('warning', function(warning) {
// 		console.log('warning:', warning);
// 	}.bind(this));
// 	this.stream.on('reconnect', function(request, response, connectInterval) {
// 		console.log('attemping to reconnect, status message:', response.statusMessage);
// 		request.on('error', function(error) {
// 			console.log('error:', error);
// 		});
// 	}.bind(this));
// };

// EatShitBot.prototype.retweet = function(tweetId) {
// 	this.twitBot.post('statuses/retweet/' + tweetId, function(error, tweet, response) {
// 		if (!error) {
// 			this.logTweet(tweet["text"], tweet["user"]["screen_name"]);
// 		};
// 	}.bind(this));
// };

// EatShitBot.prototype.logTweet = function(tweet, screenName) {
// 	console.log(`${tweet}\n${screenName}\n\n`)
// };
