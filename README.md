nREPL is a very simple nodejs REPL client+server combination library. 


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



