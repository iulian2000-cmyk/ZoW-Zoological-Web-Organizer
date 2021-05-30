const url = require('url');
const Regex = require('regex');
var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'zow_atlas'
});
exports.search_data = function(req, res) {
    const reqUrl = url.parse(req.url, true);
    const animalNameToSearch = reqUrl.query.search.toUpperCase();
    console.log(animalNameToSearch);

    connection.query(`SELECT id_animal, animalName, likes, imagePath1 from animals where animalName=TRIM('${animalNameToSearch}');`, function(error, results, fields) {
        const response = [];

        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                response.push(results[i]);
                response[i].imagePath1 = response[i].imagePath1.slice(1);
            }
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(response));
        } else {
            const response = [];
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(response));
        }
    });

}

exports.search_data_suggestion = function(req, res) {
    const reqUrl = url.parse(req.url, true);
    console.log(reqUrl);
    const animalNameToSearch = reqUrl.query.txt.toUpperCase();
    console.log(animalNameToSearch);
    connection.query(`SELECT  animalName from animals where animalName LIKE '${animalNameToSearch}%';`, function(error, results, fields) {
        const response = [];
       

        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                response.push(results[i]);
               
            }
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(response));
        } else {
            const response = [];
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(response));
        }
        console.log(results);
    });

}