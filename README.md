nREPL is a very simple nodejs REPL client+server combination library. 

Since nodeJS versions starting with 0.10 the new streams API kills the official REPL demo code as well as some of the REPL helper repositories out there.

The exit code is something like this:

````
Error: Cannot switch to old mode now.
at emitDataEvents (_stream_readable.js:683:11)
at Socket.Readable.pause (_stream_readable.js:674:3)
at Connection.pause (c:\program files\nodejs\node_modules\mysql\lib\Connect.....
````

As we were using our own code which stopped working as well we wrote a fix when migrating to 0.10+ .
Hence, this repo works with node 0.10+ - whether it works below I am not sure - but other repl REPOS do, so all versions should be covered ;)

enjoy.


### installing

````
	// globally, which will allow you to create REPL servers and clients from command line using nrepl ... (see below)
	npm install -g nrepl  
````



### command-line 
````
	// connecting to a REPL server:    
	
	nrepl <port|host port>
````

````
	// starting a local REPL server:   
	
	nrepl serve <port> 
````


### within a node script:

````
	// starting a repl server
	var nrepl = require('nrepl');
	nrepl.nReplServer('serverId', port);
````



