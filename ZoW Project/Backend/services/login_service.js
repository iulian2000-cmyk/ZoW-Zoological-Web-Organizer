const url = require('url');
var fs = require('fs');
var Cookies = require('cookies');
var mysql = require('mysql');
var qs = require('querystring');
let alert = require('alert');

var keys = [''];
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'Zow_Atlas'
});

exports.login = function(req, res) {
    var body = '';
    req.on('data', function(data) {
        body += data;
        if (body.length > 1e6)
            req.connection.destroy();
    });
    req.on('end', function() {
        var post = qs.parse(body);
        var username = post.username;
        var password = post.password;
        var cookies = new Cookies(req, res, { keys: keys });
        if (username && password) {
            connection.query('SELECT * FROM users WHERE user_name = ? AND password_hash = ? ;', [username, password], function(error, results, fields) {
                if (results.length > 0) {
                    cookies.set('username', username, { signed: true });
                    cookies.set('last-active', new Date().toISOString(), { signed: true });
                    res.writeHead(301, { Location: '../index.html' });
                } else {
                    alert("Invalid username or password ! ");
                    res.writeHead(301, { Location: './authentication.html' });
                }
                res.end();
            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    });
}
exports.register = function(req, res) {
    var body = '';
    req.on('data', function(data) {
        body += data;
        if (body.length > 1e6)
            req.connection.destroy();
    });
    req.on('end', function() {
        var post = qs.parse(body);
        var username = post.username;
        var password = post.password;
        var email = post.email;
        //console.log(username + "--" + password + "--" + email);
        var cookies = new Cookies(req, res, { keys: keys });
        if (username && password && email) {
            connection.query('INSERT INTO users VALUES (?,?,?,FALSE);', [username, password, email], function(error, results, fields) {
                cookies.set('username', username, { signed: true });
                cookies.set('last-active', new Date().toISOString(), { signed: true });
                res.writeHead(301, { Location: '../pages/authentication.html' });
                res.end();

            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    });
}