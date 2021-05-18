const url = require('url');
var fs = require('fs');
var Cookies = require('cookies');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let alert = require('alert');
var mysql = require('mysql');
var qs = require('querystring');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'Zow_Atlas'
});

exports.update_likes = function(req, res) {
    var index_animal = url.parse(req.url).pathname.charAt(url.parse(req.url).pathname.length - 1);
    console.log(index_animal);
    connection.query('UPDATE animals SET likes=likes+1 WHERE id_animal=' + connection.escape(index_animal), function(error, results, fields) {
        res.writeHead(301, { Location: './animal_' + index_animal + '.html' });
        res.end();
    });
}

exports.add_user = function(req, res) {
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
        var isAdmin = post.privileges;
        connection.query('INSERT INTO users VALUES (NULL,?,?,?,?)', [username, password, email, isAdmin], function(error, results, fields) {
            res.writeHead(301, { Location: './admin.html' });
            res.end();
        });
    });
}

exports.delete_user = function(req, res) {
    var body = '';
    req.on('data', function(data) {
        body += data;
        if (body.length > 1e6)
            req.connection.destroy();
    });
    req.on('end', function() {
        var post = qs.parse(body);
        var username = post.username;
        connection.query('DELETE FROM users WHERE user_name = ?', [username], function(error, results, fields) {
            res.writeHead(301, { Location: './admin.html' });
            res.end();
        });
    });
}