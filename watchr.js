/* Require */
var watchr = require('watchr'),
    exec = require('child_process').exec;

/* Watch a directory or file */
console.log('--------------------------------------------------------------');
console.log('--------     Watching /less/ directory for changes     -------');
console.log('--------------------------------------------------------------');
watchr.watch({
    paths: ['../content/bootstrap/less'],
    listeners: {
        log: function(logLevel){
            //console.log('a log message occured:', arguments);
        },
        error: function(err){
            console.log('an error occured:', err);
        },
        watching: function(err,watcherInstance,isWatching){
            if (err) {
               // console.log("watching the path " + watcherInstance.path + " failed with error", err);
            } else {
              // console.log("watching the path " + watcherInstance.path + " completed");
            }
        },
        change: function(changeType,filePath,fileCurrentStat,filePreviousStat){
           //console.log('a change event occured:',arguments);

           console.log("Modified file: "+ filePath);
           var command = "bundler";

           exec(command, function (error, stdout, stderr){
            console.log(stdout);
            if (error !== null) {
              console.log('exec error: ' + error);
              console.log("stdout : "+stdout)
              console.log("stderr : "+stderr)
            }
          });



        }
    },
    next: function(err,watchers){
        if (err) {
           // return console.log("watching everything failed with error", err);
        } else {
            // console.log('watching everything completed', watchers);
        }

        // Close watchers after 10 Minutes
        setTimeout(function(){
            var i;
            console.log('--------------------------------------------------------------');
            console.log('--------------- Stopped watchers, run cmd again --------------');
            console.log('--------------------------------------------------------------');
            for ( i=0;  i<watchers.length; i++ ) {
                watchers[i].close();
            }
        },600000);
    }
});