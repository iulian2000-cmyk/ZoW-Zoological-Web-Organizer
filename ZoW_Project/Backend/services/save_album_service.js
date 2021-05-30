var mysql = require('mysql');
var qs = require('querystring');
let alert = require('alert');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'zow_atlas'
});

exports.save_album = function(req, res) {
    var body = '';
    req.on('data', function(data) {
        body += data;
        console.log(body);
        if (body.length > 1e6)
            req.connection.destroy();
    });
    req.on('end', function() {
        connection.query('', function(error, results, fields) {
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end();
        });
    });
}