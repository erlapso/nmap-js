Nmap = require('./');
nmap = new Nmap();

// Find all network devices 
nmap.scan(null, function(data) { console.log(data) });

