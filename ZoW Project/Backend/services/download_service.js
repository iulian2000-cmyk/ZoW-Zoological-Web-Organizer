const url = require('url');
var fs = require('fs');
var Cookies = require('cookies');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var mysql = require('mysql');
var XMLWriter = require('xml-writer');
var http = require('http');


exports.download_xml = function(req, res) {

    var PathToXML = __dirname + url.parse(req.url).pathname;
    if (process.platform == "win32") {
        PathToXML = PathToXML.replace("\\services\\FrontEnd\\pages\\get_Order", "");
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