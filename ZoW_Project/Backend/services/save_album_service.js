var mysql = require('mysql');

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
        if (body.length > 1e6)
            req.connection.destroy();
    });
    req.on('end', function() {
        const objectReceived = JSON.parse(body);
        const username = objectReceived.username;
        const animals = objectReceived.animals;
        const albumName = objectReceived.album;
        let idUser = 0;
        let id_album = 0;
        connection.query(`select id_user from users where user_name=?;`, [username], function(error, results, fields) {
            idUser = results[0].id_user;
            connection.query(`select * from customAlbums where albumCustomName='?' and id_user=?;`, [albumName, idUser], function(error, results, fields) {
                if (results.length == 0) {
                    connection.query(`insert into customAlbums values (NULL,?,?);`, [albumName, idUser], function(error, results, fields) {
                        connection.query(`select id_albumCustom from customAlbums where albumCustomName='?';`, [albumName], function(error, results, fields) {
                            id_album = results[0].id_albumCustom;
                            for (let id of animals) {
                                connection.query(`insert into addAnimalToAlbum values (?,?);`, [id_album, id], function(error, results, fields) {});
                            }
                            res.writeHead(200, { 'Content-type': 'application/json' });
                            res.end();
                        });
                    });
                } else {
                    res.writeHead(404, { 'Content-type': 'application/json' });
                    res.end();
                }
            });
        });
    });
}