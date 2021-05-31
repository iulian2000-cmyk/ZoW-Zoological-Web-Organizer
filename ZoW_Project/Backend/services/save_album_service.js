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
        connection.query(`select id_user from users where user_name='${username}';`, function(error, results, fields) {
            idUser = results[0].id_user;
            connection.query(`select * from customAlbums where albumCustomName='${albumName}' and id_user=${idUser};`, function(error, results, fields) {
                if (results.length == 0) {
                    connection.query(`insert into customAlbums values (NULL,?,?);`, [albumName, idUser], function(error, results, fields) {
                        connection.query(`select id_albumCustom from customAlbums where albumCustomName='${albumName}';`, function(error, results, fields) {
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

exports.share_album = function(req, res) {
    var body = '';
    req.on('data', function(data) {
        body += data;
        if (body.length > 1e6)
            req.connection.destroy();
    });
    req.on('end', function() {
        const objectReceived = JSON.parse(body);
        const user1 = objectReceived.user1;
        const user2 = objectReceived.user2;
        const albumName = objectReceived.album;
        let idUser1 = 0;
        let idUser2 = 0;
        let id_album = 0;
        connection.query("SELECT id_user FROM users WHERE user_name=?" + " UNION " + "SELECT id_user FROM users WHERE user_name=?", [user1, user2], function(error, results1, fields) {
            //console.log(results1[1].id_user);
            idUser1 = results1[0].id_user;
            idUser2 = results1[1].id_user;
            connection.query("SELECT id_albumCustom FROM customAlbums WHERE albumCustomName=?", [albumName], function(error, results2, fields) {
                if (results2.length > 0) {
                    connection.query("INSERT INTO shared_albums VALUES (?,?,?);", [idUser1, results2[0].id_albumCustom, idUser2], function(error, results, fields) {
                        //console.log(error);
                    });
                    res.writeHead(200, { 'Content-type': 'application/json' });
                    res.end();
                } else {
                    res.writeHead(404, { 'Content-type': 'application/json' });
                    res.end();
                }
            });
        });
    });
}