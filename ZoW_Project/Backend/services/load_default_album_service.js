const url = require('url');
var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'Zow_Atlas'
});

exports.load_album = function(req, res) {
    const reqUrl = url.parse(req.url, true);
    const albumNameToSearch = reqUrl.query.defaultAlbums;
    connection.query(`SELECT id_animal, animalName, longevitate, likes, inaltime, greutate, imagePath1 from albumsdefault natural join animals where albumName='${albumNameToSearch}';`, function(error, results, fields) {
        if (results.length > 0) {
            const response = [];
            for (let i = 0; i < results.length; i++) {
                response.push(results[i]);
                response[i].imagePath1 = response[i].imagePath1.slice(1);
            }
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(response));
        } else {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.write('Page not found' + JSON.stringify(err));
            res.end();
        }
    });
}