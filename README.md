# Twitter Stream/Retweet
> Lmao

This is a twitter bot to retweet people who use a certain phrase. Currently, that phrase is some variation of "applying to grad school".

### How it works

To run, you need to create a `credentials.js` file, similar to the `credentials.example.js` file but with actual twitter credentials in it. Then, just:


```
$ npm run bot
```

and your twitter bot should run.

### In the wild

[Check it out on Twitter](https://twitter.com/gradschoolbot)


### On a server

To run this on a server (I'm running on digital ocean), you'll want to daemonize the process. To do this, `$ cd /etc/systemd/system`, you'll be using `systemd`. Create a `.service` file, like `eatshitbot.service`. This should look something like this:

```
[Unit]
Description=Job that runs the twitter stream/retweet bot

[Service]
Type=simple
ExecStart=/usr/bin/nodejs /root/whatever/twitter-stream-retweet/run-bot.js

[Install]
WantedBy=network-online.target
```

After creating that file, you'll need to reload, `$ systemctl daemon-reload`, and then start the daemon: `$ systemctl start eatshitbot` (or enable it, which will have it always run even if you exit out of ssh: `$ systemctl enable eatshitbot.service`).

To make sure this is working, do `$ systemctl status eatshitbot.service`. You can restart the service by doing `$ systemctl restart eatshitbot.service`.

Here's [a cheatsheet](http://www.ethicalhackx.com/systemd-cheat-sheet-linux/).
