module.exports = handler

var debug = require('../debug').insert
var wc = require('webcredits')
var fs = require('fs')
var hdwallet = require('qpm_hdwallet');

function handler(req, res) {

  var origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  var defaultCurrency = res.locals.config.currency || 'https://w3id.org/cc#bit';

  var source      = req.body.source;
  var destination = req.body.destination;
  var currency    = req.body.currency || defaultCurrency;
  var amount      = req.body.amount;
  var timestamp   = null;
  var description = req.body.description;
  var context     = req.body.context;


  var source      = req.session.userId

  if (!req.session.userId) {
    res.send('must be authenticated')
    return
  }


  var config = require('../../config/dbconfig.js');

  var address = 'tpubDF7G4QbLJjUqhM9iaVLnyXu3Af4Xyu6gdRHXKXZVL9YyPsY7txr8p12s7uwwPibrimwQn9LGix9mmzvM7ivdhKDfV758R1avcPLGBUwzfmu'

  var dep = hdwallet.webidAndPubKeyToAddress(source, address)

  res.header('Content-Type', 'text/html');
  res.write('Address : ' + dep );
  res.write('<br>\n');
  res.write('<a href="/">Home</a>')
  res.end()


}
