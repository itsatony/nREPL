#!/usr/bin/env node

var nrepl = require('../');

if (typeof process.argv[2] === 'undefined') {
	console.log('nREPL ---[[[ Usage: nrepl <port|host port> ]]]---');
	console.log('nREPL ---[[[ Usage: nrepl serve <port> ]]]--- will start a repl server. this makes sense for testing only i guess...');
	process.exit();
} else if (process.argv[2] === 'serve' && typeof process.argv[3] !== 'undefined') {
	var os = require('os');
	var serverId = os.hostname();
	nrepl.nReplServer(serverId, parseInt(process.argv[3]));
} else {
	nrepl.nReplClient(process.argv[2], process.argv[3]);
}

