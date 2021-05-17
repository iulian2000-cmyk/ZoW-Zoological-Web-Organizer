const url = require('url');
var fs = require('fs');
var Cookies = require('cookies');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let alert = require('alert');
var mysql = require('mysql');


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