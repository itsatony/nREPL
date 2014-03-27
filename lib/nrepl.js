var net = require('net');
var repl = require('repl');

/* -----------------------------------------------------------------
 *	function: nREPL.client
 *		opens a TCP socket to the code console (a REPL server.)
 *
 *	parameters: 
 *		port - {number} the port on to connect
 *
 *	returns: 
 * 		client - {object} the socket client object
 *
 *	------------------------------------------------------------------*/
var client = function(host, port) {
	if (typeof port === 'undefined') {
		var options = { port: host, host: 'localhost' };
	} else {
		var options = { host: host, port: port };
	}
	var client = net.connect(
		options,
		function() {
			process.stdin.setRawMode(true);
			process.stdin.pipe(client);
			client.pipe(process.stdout);
			if (typeof global.clear === 'undefined') {
				global.clear = clear;
			}
		}
	);

	client.on('close', function done () {
		process.stdin.setRawMode(false);
		process.stdin.pause();
		client.removeListener('close', done);
	});

	process.stdin.on('end', function () {
		client.destroy();
		console.log();
	});

	process.stdin.on('data', function (b) {
		if (b.length === 1 && b[0] === 4) {
			process.stdin.emit('end');
		}
	});
	return client;
};


/* -----------------------------------------------------------------
 *	function: nREPL.prototype.server
 *		opens a TCP socket for connecting to the code console
 *
 *	parameters: 
 *		serverId - {string} name your server ( will appear in the client's prompt )
 *		port - {number} the port on which to listen
 *
 *	returns: 
 * 		TCPServer - {object} the server object
 *
 *	------------------------------------------------------------------*/
var server = function(serverId, port, host) {
	var thisREPL = this;
	this.sockets = {};
	if (typeof port !== 'number') return null;
	if (typeof host !== 'string') host = 'localhost';
	this.server = net.createServer(
		function (socket) {
			socket.replId = randomString(18, true, true, true);
			thisREPL.sockets[socket.replId] = socket;
			repl.start(
				{
					prompt: '[' + serverId + '] > ',
					input: socket,
					output: socket,
					terminal: true,
					userColors: true,
					useGlobal: true,
					ignoreUndefined: true
				}
			)
			.on(
				'exit', 
				function() {
					socket.end();
					delete thisREPL.sockets[socket.replId];
				}
			);
			socket.resume();
		}
	).listen(host, port);
	console.log('[nREPL] listening as [%s] { %s:%s } ', serverId, host, port);
};


server.prototype.stop = function() {
	for (var i in this.sockets) {
		this.sockets[i].end();
	}
};



function randomString(length, numbers, alphabet, timestamp) {
	var id = '';
	if (typeof numbers !== 'boolean') numbers = true;
	if (typeof alphabet !== 'boolean') alphabet = false;
	if (typeof timestamp !== 'boolean') timestamp = false;
	if (alphabet === false && numbers === false) {
		numbers = true;
		alphabet = true;
		timestamp = true;
	}
	if (timestamp === true) id += new Date().getTime();
	if (timestamp === true && alphabet === false && numbers === false) return id;	
	var chars_alphabet = new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
	var chars_numbers = new Array('1','2','3','4','5','6','7','8','9','0');
	var chars_both = new Array('1','2','3','4','5','6','7','8','9','0', 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
	if (numbers === true && alphabet === false) {
		var idchars = chars_numbers;
	} else if (numbers === true && alphabet === true) {
		var idchars = chars_both;
	} else if (numbers === false && alphabet === true) {
		var idchars = chars_alphabet;
	}
	for (var i=0; i < length; i++) {
		id += idchars[Math.floor(Math.random()*idchars.length)];
	}
	return id;
};

function clear() {
  process.stdout.write('\u001B[2J\u001B[0;0f');
}


module.exports.nReplServer = function(id, port, host) { new server(id, port, host); };
module.exports.nReplClient = client;
