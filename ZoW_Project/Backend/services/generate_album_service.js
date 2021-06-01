const url = require('url');
var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'zow_atlas'
});

exports.generate_album = function(req, res) {
    const reqUrl = url.parse(req.url, true);
    const category = reqUrl.query.category;
    const domesticity = reqUrl.query.domesticity;
    const edibility = reqUrl.query.edibility;
    const longevity = reqUrl.query.longevity;

    let longevityArray = [0, 0];

    if (longevity === "<6 months") {
        longevityArray[0] = 0;
        longevityArray[1] = 6;
    }
    if (longevity === "<1 year") {
        longevityArray[0] = 0;
        longevityArray[1] = 12;
    }
    if (longevity === "1-10 years") {
        longevityArray[0] = 12;
        longevityArray[1] = 120;
    }
    if (longevity === "10-100 years") {
        longevityArray[0] = 120;
        longevityArray[1] = 1200;
    }
    if (longevity === ">100 years") {
        longevityArray[0] = 1200;
        longevityArray[1] = 1000000;
    }

    if (domesticity !== "none" && edibility !== "none") {
        connection.query(`SELECT id_animal, animalName, longevitate, likes, inaltime, greutate, imagePath1 from animals where ?=1 and ?=1 and ?=1 and (longevitate between ? and ?);`, [category, domesticity, edibility, longevityArray[0], longevityArray[1]], function(error, results, fields) {
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
    } else if (domesticity !== "none" && edibility === "none") {
        connection.query(`SELECT id_animal, animalName, longevitate, likes, inaltime, greutate, imagePath1 from animals where ?=1 and ?=1 and (longevitate between ? and ? );`, [category, domesticity, longevityArray[0], longevityArray[1]], function(error, results, fields) {
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
    } else if (domesticity === "none" && edibility !== "none") {
        connection.query(`SELECT id_animal, animalName, longevitate, likes, inaltime, greutate, imagePath1 from animals where ?=1 and ?=1 and (longevitate between ? and ?);`, [category, domesticity, longevityArray[0], longevityArray[1]], function(error, results, fields) {
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
    } else if (domesticity === "none" && edibility === "none") {
        connection.query(`SELECT id_animal, animalName, longevitate, likes, inaltime, greutate, imagePath1 from animals where ?=1 and (longevitate between ? and ?);`, [category, longevityArray[0], longevityArray[1]], function(error, results, fields) {
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
}