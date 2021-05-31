const url = require('url');
var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'zow_atlas'
});

exports.load_album = function(req, res) {
    const reqUrl = url.parse(req.url, true);
    const albumNameToSearch = reqUrl.query.savedAlbums;
    console.log(albumNameToSearch);
    connection.query(`SELECT id_animal, animalName, longevitate, likes, inaltime, greutate, imagePath1 from customAlbums natural join addanimaltoalbum natural join animals where albumCustomName='${albumNameToSearch}';`, function(error, results, fields) {
        if (results.length > 0) {
            const response = [];
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