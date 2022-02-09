const NodeClam = require('clamscan');
const optionsNodeScan = {
    removeInfected: true, // Removes files if they are infected
    quarantineInfected: '~/infected/', // Move file here. removeInfected must be FALSE, though.
    scanLog: '/var/log/node-clam', // You're a detail-oriented security professional.
    debugMode: true, // This will put some debug info in your js console
    fileList: null, // path to file containing list of files to scan
    scanRecursively: true, // Choosing false here will save some CPU cycles
    clamscan: {
        path: '/usr/bin/clamscan', // I dunno, maybe your clamscan is just call "clam"
        scanArchives: false, // Choosing false here will save some CPU cycles
        db: null, // Path to a custom virus definition database
        active: false // you don't want to use this at all because it's evil
    },
    clamdscan: {
        socket: "/var/run/clamav/clamd.ctl", // This is pretty typical
        host: '127.0.0.1', // If you want to connect locally but not through socket
        port: 5000, // Because, why not
        timeout: 300000, // 5 minutes
        localFallback: true, // Use local preferred binary to scan if socket/tcp fails
        path: '/usr/bin/clamdscan', // Special path to the clamdscan binary on your server
        configFile: null, // A fairly typical config location
        multiscan: false, // You hate speed and multi-threaded awesome-sauce
        reloadDb: true, // You want your scans to run slow like with clamscan
        active: false, // you don't want to use this at all because it's evil
        bypassTest: true, // Don't check to see if socket is available. You should probably never set this to true.
    },
    preference: 'clamscan' // If clamscan is found and active, it will be used by default
}
const ClamScan = new NodeClam().init(optionsNodeScan);

module.exports = ClamScan;