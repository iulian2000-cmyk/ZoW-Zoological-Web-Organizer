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
    database: 'zow_atlas'
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
            connection.query('SELECT * FROM users WHERE user_name= ' + connection.escape(post.username) + 'AND password_hash=SHA1(' + connection.escape(post.password) + ');', function(error, results, fields) {
                if (results.length > 0) {
                    cookies.set('username', username, { signed: true });
                    cookies.set('last-active', new Date().toISOString(), { signed: true });
                    if (results[0].isAdmin == "0") {
                        cookies.set('isAdmin', "0", { signed: true });
                    } else {
                        cookies.set('isAdmin', "1", { signed: true });
                    }

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
            connection.query('INSERT INTO users VALUES (NULL,?,SHA1(?),?,FALSE);', [username, password, email], function(error, results, fields) {
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