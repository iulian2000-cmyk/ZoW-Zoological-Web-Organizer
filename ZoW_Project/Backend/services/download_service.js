const url = require('url');
var fs = require('fs');
var Cookies = require('cookies');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var mysql = require('mysql');
var XMLWriter = require('xml-writer');
var http = require('http');
const fastcsv = require('fast-csv');
const PDFDocument = require('pdfkit');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'zow_atlas'
});

exports.download_xml = function(req, res) {

    var PathToXML = __dirname + url.parse(req.url).pathname;
    if (process.platform == "win32") {
        PathToXML = PathToXML.replace("\\services/FrontEnd/pages/get_Order", "");
        PathToXML = PathToXML + "\\FilesToDownload\\Order.xml";
    } else {
        PathToXML = PathToXML.replace("/services/FrontEnd/pages/get_Order", "");
        PathToXML = PathToXML + "/FilesToDownload/Order.xml";
    }
    fs.exists(PathToXML, function(exists) {
        if (exists) {
            res.writeHead(200, {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": "attachment; filename=" + "Order.xml"
            });
            fs.createReadStream(PathToXML).pipe(res);
        } else {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("ERROR File does not exist");
        }
    });
}


exports.download_csv = function(req, res) {
    var PathToCSV = __dirname + url.parse(req.url).pathname;

    if (process.platform == "win32") {
        PathToCSV = PathToCSV.replace("\\services/FrontEnd/get_CSV", "");
        PathToCSV = PathToCSV + "\\FilesToDownload\\Order.csv";
    } else {
        PathToCSV = PathToCSV.replace("/services/FrontEnd/get_CSV", "");
        PathToCSV = PathToCSV + "/FilesToDownload/Order.csv";
    }

        const SQL_interogation = "SELECT AVG(longevitate) AS \"Medie viata\", (SELECT COUNT(*) FROM animals WHERE TRIM(cardCategorie)=\"Mamifere\") AS \"Numar mamifere\", (SELECT COUNT(*) FROM animals WHERE insecta=1) AS \"Numar insecte \",(SELECT COUNT(*) FROM animals WHERE terestru=1) AS \"Numar animale terestre\", (SELECT COUNT(*) FROM animals WHERE acvatic=1) AS \"Numar animale acvatice\", (SELECT COUNT(*) FROM animals WHERE aerian=1) AS \"Numar animale aeriane\", (SELECT COUNT(*) FROM animals WHERE domestic=1) AS \"Numar animale domestice\", (SELECT COUNT(*) FROM animals WHERE salbatic=1) AS \"Numar animale salbatice\", (SELECT AVG(greutate) FROM animals WHERE TRIM(cardCategorie) = \"Mamifere\") AS \"Greutate medie mamifere(kg)\" ,(SELECT AVG(greutate) FROM animals WHERE TRIM(cardCategorie) = \"Pasari\") AS \"Greutate medie pasari(kg)\" ,(SELECT AVG(greutate) FROM animals WHERE TRIM(cardCategorie) = \"Insecte\") AS \"Greutate medie insecte(kg)\" ,(SELECT AVG(greutate) FROM animals WHERE TRIM(cardCategorie) = \"Reptile\") AS \"Greutate medie reptile(kg)\" ,(SELECT AVG(greutate) FROM animals WHERE TRIM(cardCategorie) = \"Dinozauri\") AS \"Greutate medie dinozauri(kg)\" ,(SELECT AVG(greutate) FROM animals WHERE TRIM(cardCategorie) = \"Pesti\") AS \"Greutate medie pesti(kg)\" , (SELECT AVG(inaltime) FROM animals WHERE TRIM(cardCategorie) = \"Mamifere\") AS \"Inaltime medie mamifere(m)\" , (SELECT AVG(inaltime) FROM animals WHERE TRIM(cardCategorie) = \"Pasari\") AS \"Inaltime medie pasari(m)\" ,(SELECT AVG(inaltime) FROM animals WHERE TRIM(cardCategorie) = \"Dinozauri\") AS \"Inaltime medie dinozauri(m)\" ,(SELECT AVG(inaltime) FROM animals WHERE TRIM(cardCategorie) = \"Reptile\") AS \"Inaltime medie reptile(m)\"  FROM animals;";
        connection.query(SQL_interogation, function(error, data, fields) {

            if (error) throw error;
            const ws = fs.createWriteStream(PathToCSV);
            const jsonData = JSON.parse(JSON.stringify(data));


            fastcsv
                .write(jsonData, { headers: true })
                .on("finish", function() {}).pipe(ws);
            fs.exists(PathToCSV, function(exists) {
                if (exists) {
                    res.writeHead(200, {
                        "Content-Type": "application/octet-stream",
                        "Content-Disposition": "attachment; filename=" + "Order.csv"
                    });
                    fs.createReadStream(PathToCSV).pipe(res);
                } else {
                    res.writeHead(400, { "Content-Type": "text/plain" });
                    res.end("ERROR File does not exist");
                }
            });
        });
}


exports.download_pdf  = function(req, res) {


    var PathToPDF = __dirname + url.parse(req.url).pathname;

    if (process.platform == "win32") {
        PathToPDF = PathToPDF.replace("\\services/FrontEnd/get_PDF", "");
        PathToPDF = PathToPDF + "\\FilesToDownload\\Statistics.pdf";
    } else {
        PathToPDF = PathToPDF.replace("/services/FrontEnd/get_PDF", "");
        PathToPDF = PathToPDF + "/FilesToDownload/Statistics.pdf";
    }
    var child = require('child_process').exec('node ' + __dirname + '/chart_creator.js')
    child.stdout.pipe(process.stdout)
    child.on('exit', function() {
        var another_child = require('child_process').exec('node ' + __dirname + '/pdf_creator.js');
        another_child.on('exit', function() {
            fs.exists(PathToPDF, function(exists) {
                if (exists) {
                    res.writeHead(200, {
                        "Content-Type": "application/octet-stream",
                        "Content-Disposition": "attachment; filename=" + "Statistics.pdf"
                    });
                    fs.createReadStream(PathToPDF).pipe(res);
                } else {
                    res.writeHead(400, { "Content-Type": "text/plain" });
                    res.end("ERROR File does not exist");
                }
            });
        });
    });
}
