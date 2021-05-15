const url = require('url');
var fs = require('fs');
var Cookies = require('cookies');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var mysql = require('mysql');
var XMLWriter = require('xml-writer');
var http = require('http');
const fastcsv = require('fast-csv');



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


exports.download_csv = function (req, res){
    var PathToCSV = __dirname + url.parse(req.url).pathname;
   
    if (process.platform == "win32") {
        PathToCSV = PathToCSV.replace("\\services/FrontEnd/pages/get_OrderCSV", "");
        PathToCSV = PathToCSV + "\\FilesToDownload\\Order.csv";
    } else {
        PathToCSV = PathToCSV.replace("/services/FrontEnd/pages/get_OrderCSV", "");
        PathToCSV = PathToCSV + "/FilesToDownload/Order.csv";
    }


    connection.connect(error => {
        if (error) throw error;
    
        // query data from MySQL
        connection.query('SELECT * from users', function(error, data, fields) {
           
            if (error) throw error;
            const ws = fs.createWriteStream(PathToCSV);
            const jsonData = JSON.parse(JSON.stringify(data));
            
    
            fastcsv
                .write(jsonData, { headers: true })
                .on("finish", function() {    
                }).pipe(ws);
        });
    });

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
}