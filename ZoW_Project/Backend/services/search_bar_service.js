const url = require('url');
var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'zow_atlas'
});
exports.search_data = function(req, res) {
    const reqUrl = url.parse(req.url, true);
    const animalNameToSearch = reqUrl.query.search;
    console.log(animalNameToSearch);
    
    connection.query(`SELECT  animalName, likes, imagePath1 from animals where animalName='${animalNameToSearch}';`, function(error, results, fields) {
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

