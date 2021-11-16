const MongoClient = require( 'mongodb' ).MongoClient;
const config = require("config");
const url = config.get("mongoURI");

let _db;

module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, ( err, client ) => {
      _db  = client.db('db');
      return callback( err );
    } );
  },
  getDb: function() {
    return _db;
  }
};