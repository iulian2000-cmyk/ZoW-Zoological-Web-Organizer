const url = require('url');
var fs = require('fs');
var Cookies = require('cookies');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let alert = require('alert');
var mysql = require('mysql');
var qs = require('querystring');
const formidable = require('formidable');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'Zow_Atlas'
});

exports.update_likes = function(req, res) {
    var index_animal = req.url.replace("/FrontEnd/pages/like_", "");
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
        console.log("username to delete= " + username);
        connection.query('DELETE FROM users WHERE user_name = ?', [username], function(error, results, fields) {
            res.writeHead(301, { Location: './admin.html' });
            res.end();
        });
    });
}

exports.add_animal = function(req, res) {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        var animal_name = fields.animal;
        var longevity = fields.longevity;
        var weight = fields.weight;
        var height = fields.height;
        var habitat = fields.habitat;
        var generalities = fields.generalitati;
        var stiatica = fields.stiatica;
        var categorie = fields.categorie;
        var card_longevitate = fields.card_longevitate;

        var terestru = fields.terestru;
        var acvatic = fields.acvatic;
        var aerian = fields.aerian;
        var mamifer = fields.mamifer;
        var pasare = fields.pasare;
        var reptila = fields.reptila;
        var dinozaur = fields.dinozaur;
        var insecta = fields.insecta;
        var domestic = fields.domestic,
            salbatic;
        var comestibil = fields.comestibil,
            necomestibil;

        var card_categore = fields.card_categorie;
        if (domestic == "1") {
            salbatic = "0";
        } else {
            salbatic = "1";
        }
        if (comestibil == "1") {
            necomestibil = "0";
        } else {
            necomestibil = "1";
        }
        var mediumHeight = height / 2;
        var mediumWeight = weight / 2;
        var Mod_hranire = fields.hranire;




        var name_files = new Array();

        var ImagePath1, imagePath2, imagePath3, imagePath4;
        var index_image_path = 1;

        var path_System = __dirname + url.parse(req.url).pathname;
        if (process.platform == "win32") {
            path_System = path_System.replace("\\Backend\\services", "");
        } else {
            path_System = path_System.replace("/Backend/services", "");
        }

        path_System = path_System.replace("pages", "images");
        path_System = path_System.replace("add_animal", "");
        console.log(path_System);
        var pathImg = "../images/";
        var index_file = 1;
        Object.values(files).forEach(value => {
            Object.values(value).forEach(file => {
                var file_to_upload = file;
                animal_name_lower_case = animal_name.toLowerCase();
                fs.mkdir(path_System + animal_name_lower_case, function(error) {});
                fs.rename(file_to_upload.path, path_System.concat(animal_name_lower_case).concat("/").concat(file_to_upload.name), function(err) {
                    if (err) throw err
                    else {
                        //console.log("FILE UPLOADED ! ");
                    }
                });
                name_files.push(file_to_upload.name);
            });
        });
        //console.log(name_files);

        ImagePath1 = pathImg + animal_name.toLowerCase() + '/' + name_files[0];
        ImagePath2 = pathImg + animal_name.toLowerCase() + '/' + name_files[1];
        ImagePath3 = pathImg + animal_name.toLowerCase() + '/' + name_files[2];
        ImagePath4 = pathImg + animal_name.toLowerCase() + '/' + name_files[3];
        var link_page = "../pages/animalPage.html";
        connection.query(
            "INSERT INTO animals VALUES (NULL,?,?, ?,?,?,?,0,        ?,?,?, ?,?,? ,?,?,?  ,?,?,?,  ?,?,?, ?,?,? ,?,?,?  )", [
                animal_name.toUpperCase(), link_page, ImagePath1, ImagePath2, ImagePath3, ImagePath4, terestru, acvatic, aerian, mamifer, pasare, reptila, dinozaur, domestic, insecta, salbatic, comestibil, necomestibil,
                longevity, generalities, stiatica, card_longevitate, card_categore, mediumWeight, mediumHeight, habitat, Mod_hranire
            ],
            function(error, results, fields) {
                if (error) {
                    throw error;
                }
            });
        res.writeHead(301, { Location: './admin.html' });
        res.end(JSON.stringify({ fields, files }, null, 2));
    });
}

exports.delete_animal = function(req, res) {
    var body = '';
    req.on('data', function(data) {
        body += data;
        if (body.length > 1e6)
            req.connection.destroy();
    });
    req.on('end', function() {
        var post = qs.parse(body);
        var animal_name = post.animal;
        //console.log(animal_name);
        connection.query('DELETE FROM animals WHERE animalName = ?', [animal_name], function(error, results, fields) {
            res.writeHead(301, { Location: './admin.html' });
            res.end();
        });
    });
}

exports.add_album = function(req, res) {
    var body = '';
    req.on('data', function(data) {
        body += data;
        if (body.length > 1e6)
            req.connection.destroy();
    });
    req.on('end', function() {
        var post = qs.parse(body);
        var nume_album = post.album;
        Object.values(post).forEach(value => {
            connection.query('INSERT INTO albumsdefault VALUES (?,?);', [nume_album, value], function(error, results, fields) {
                console.log("New animal was inserted in " + nume_album);
            });
        });
        res.writeHead(301, { Location: "./admin.html" });
        res.end();
    });
}

exports.delete_album = function(req, res) {
    var body = '';
    req.on('data', function(data) {
        body += data;
        if (body.length > 1e6)
            req.connection.destroy();
    });
    req.on('end', function() {
        var post = qs.parse(body);
        var nume_album = post.album;
        connection.query('DELETE FROM albumsdefault WHERE albumName=? ;', [nume_album], function(error, results, fields) {
            // 
        });
        res.writeHead(301, { Location: "./admin.html" });
        res.end();
    });
}