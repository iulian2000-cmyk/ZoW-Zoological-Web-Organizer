const url = require('url');
var fs = require('fs');
var Cookies = require('cookies');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var keys = [''];


exports.mainPage = function(req, res) {
    var pathFile = __dirname + url.parse(req.url).pathname;
    if (process.platform == "win32") {
        pathFile = pathFile.replace("\\Backend\\services", "");
        pathFile = pathFile.replace("/FrontEnd/index.html", "\\FrontEnd\\index.html");
    } else {
        pathFile = pathFile.replace("/Backend/services", "");
    }
    var cookies = new Cookies(req, res, { keys: keys });
    var username = cookies.get('username', { signed: true });

    fs.readFile(pathFile, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.write('Page not found' + JSON.stringify(err));
            res.end();
        } else {
            res.writeHead(200, { 'Content-type': 'text/html' });
            if (typeof username !== 'undefined') {
                const dom = new JSDOM(data);
                dom.window.document.getElementById("userLabel").textContent = username;
                res.write(dom.window.document.documentElement.outerHTML);
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        }
    });
};
exports.load_css = function(req, res) {
    var pathFile = __dirname + url.parse(req.url).pathname;
    if (process.platform == "win32") {

        pathFile = pathFile.replace("\\Backend\\services", "");
    } else {
        pathFile = pathFile.replace("/Backend/services", "");
    }
    fs.readFile(pathFile, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.write('Page not found' + JSON.stringify(err));
            res.end();
        } else {
            res.writeHead(200, { 'Content-type': 'text/css' });
            res.write(data);
            res.end();
        }
    });
}
exports.load_js = function(req, res) {
    var pathFile = __dirname + url.parse(req.url).pathname;
    if (process.platform == "win32") {

        pathFile = pathFile.replace("\\Backend\\services", "");
    } else {
        pathFile = pathFile.replace("/Backend/services", "");
    }
    fs.readFile(pathFile, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.write('Page not found' + JSON.stringify(err));
            res.end();
        } else {
            res.writeHead(200, { 'Content-type': 'text/js' });
            res.write(data);
            res.end();
        }
    });
}
exports.load_image = function(req, res) {
    var pathFile = __dirname + url.parse(req.url).pathname;
    if (process.platform == "win32") {

        pathFile = pathFile.replace("\\Backend\\services", "");
    } else {
        pathFile = pathFile.replace("/Backend/services", "");
    }
    res.writeHead(200, { "Content-Type": "image/png" });
    fs.readFile(pathFile, function(err, content) {
        res.end(content);
    });
}
exports.load_svg = function(req, res) {
    var pathFile = __dirname + url.parse(req.url).pathname;
    if (process.platform == "win32") {

        pathFile = pathFile.replace("\\Backend\\services", "");
    } else {
        pathFile = pathFile.replace("/Backend/services", "");
    }
    res.writeHead(200, { "Content-Type": "image/svg+xml" });
    fs.readFile(pathFile, function(err, content) {
        res.end(content);
    });
}

exports.load_page = function(req, res) {
    var pathFile = __dirname + url.parse(req.url).pathname;
    var exactPage;
    if (process.platform == "win32") {
        pathFile = pathFile.replace("\\Backend\\services", "");
        pathFile = pathFile.replace("/FrontEnd/pages/", "\\FrontEnd\\pages\\");
        exactPage = req.url.replace("/FrontEnd/pages/", "");
        console.log(exactPage);
    } else {
        pathFile = pathFile.replace("/Backend/services", "");
        exactPage = req.url.replace("/FrontEnd/pages/", "");
    }
    var cookies = new Cookies(req, res, { keys: keys });

    console.log(exactPage);

    if (exactPage == "registerpage.html" || exactPage == "authentication.html") {
        cookies.set('username', "", { signed: true });
        cookies.set('last-active', "", { signed: true });
        fs.readFile(pathFile, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.write('Page not found' + JSON.stringify(err));
                res.end();
            } else {
                res.writeHead(200, { 'Content-type': 'text/html' });
                res.write(data);
                res.end();
            }
        });
    } else {
        fs.readFile(pathFile, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.write('Page not found' + JSON.stringify(err));
                res.end();
            } else {
                res.writeHead(200, { 'Content-type': 'text/html' });
                var lastVisit = cookies.get('last-active', { signed: true });
                var username = cookies.get('username', { signed: true });
                if ((typeof lastVisit !== 'undefined') && (typeof username !== 'undefined')) {
                    const dom = new JSDOM(data);
                    dom.window.document.getElementById("username").textContent = username;
                    res.write(dom.window.document.documentElement.outerHTML);
                    res.end();
                } else {
                    res.write(data);
                    res.end();
                }
            }
        });
    }
}