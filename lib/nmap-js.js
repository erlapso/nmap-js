var sys = require('sys'),
    exec = require('child_process').exec,
    os = require('os'),
    EventEmitter = require('events').EventEmitter,
    util = require('util');

var nmap = function nmap(options) {
}

util.inherits(nmap, EventEmitter);
module.exports = nmap;

nmap.prototype.scan = function(err, callback) {
 	var child;
 	var net = "";
  var self = this;
  var devices = []
	//Now shows name if lookup is possible and mac / ip-address.
  var str = "nmap --system-dns -sn 192.168.1.1/24"
	child = exec(str, function (error, stdout, stderr) {
    if (error !== null) {
		  console.log('exec error: ' + error);
      this.emit("err", error);
		} else {
      //console.log(stdout);
      var tmpArr = stdout.split("Nmap scan report for");
      for (x in tmpArr) {
        if (tmpArr[x].split("\n")[0].indexOf("(") > -1) {
          dev = tmpArr[x].split("(")[0].replace(" ","").replace("\n","").replace("Host is up ").trim();
        } else {
          dev = tmpArr[x].split("\n")[0].trim()
        }
        if (dev.length > 1) {
          devices.push(dev);
        }
      }
      if (callback) {
        callback(devices);
      }
      self.emit("devices", devices);
		}		
  });
}
