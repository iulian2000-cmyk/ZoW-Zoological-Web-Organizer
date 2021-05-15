const url = require('url');
var fs = require('fs');
var Cookies = require('cookies');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var mysql = require('mysql');
var XMLWriter = require('xml-writer');


var keys = [''];
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'Zow_Atlas'
});

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
    var isAdmin = cookies.get('isAdmin', { signed: true });



    fs.readFile(pathFile, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.write('Page not found' + JSON.stringify(err));
            res.end();
        } else {
            const dom = new JSDOM(data);
            res.writeHead(200, { 'Content-type': 'text/html' });
            if (typeof username !== 'undefined') {
                dom.window.document.getElementById("userLabel").textContent = username;
                if (isAdmin == "1") {
                    dom.window.document.getElementById("admin").style.display = "block";
                }
                dom.window.document.getElementById("loginBtn").style.display = "none";
                res.write(dom.window.document.documentElement.outerHTML);
                res.end();
            } else {
                dom.window.document.getElementById("arrow").style.display = "none";
                res.write(dom.window.document.documentElement.outerHTML);
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
    //console.log(exactPage);
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
                var isAdmin = cookies.get('isAdmin', { signed: true });
                if ((typeof lastVisit !== 'undefined') && (typeof username !== 'undefined')) {
                    const dom = new JSDOM(data);
                    dom.window.document.getElementById("username").textContent = username;
                    if (!(exactPage == "admin.html")) {
                        if (isAdmin == "1") {
                            dom.window.document.getElementById("admin").style.display = "block";
                        } else {
                            dom.window.document.getElementById("admin").style.display = "none";
                            res.write(dom.window.document.documentElement.outerHTML);
                            res.end();
                        }
                    }
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

exports.ranking_page = function(req, res) {
    var pathFile = __dirname + url.parse(req.url).pathname;
    var exactPage, PathXML;
    if (process.platform == "win32") {
        pathFile = pathFile.replace("\\Backend\\services", "");
        pathFile = pathFile.replace("/FrontEnd/pages/", "\\FrontEnd\\pages\\");
        exactPage = req.url.replace("/FrontEnd/pages/", "");
        PathXML = pathFile.replace("\\FrontEnd\\pages\\", "\\Backend\\FilesToDownload\\");
    } else {
        pathFile = pathFile.replace("/Backend/services", "");
        exactPage = req.url.replace("/FrontEnd/pages/", "");
        PathXML = pathFile.replace("/FrontEnd/pages/", "/Backend/FilesToDownload/");
    }
    PathXML = PathXML.replace("ranking.html", "Order.xml");
    //console.log(PathXML);
    var cookies = new Cookies(req, res, { keys: keys });
    fs.readFile(pathFile, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.write('Page not found' + JSON.stringify(err));
            res.end();
        } else {
            res.writeHead(200, { 'Content-type': 'text/html' });
            var lastVisit = cookies.get('last-active', { signed: true });
            var username = cookies.get('username', { signed: true });
            var isAdmin = cookies.get('isAdmin', { signed: true });
            //console.log(username);
            const dom = new JSDOM(data);
            if ((typeof lastVisit !== 'undefined') && (typeof username !== 'undefined')) {
                dom.window.document.getElementById("username").textContent = username;
                if (isAdmin == "1") {
                    dom.window.document.getElementById("admin").style.display = "block";
                } else {
                    dom.window.document.getElementById("admin").style.display = "none";
                }
                connection.query('SELECT * FROM animals ORDER BY likes DESC LIMIT 30', function(error, results, fields) {
                    //var Order = "";
                    var ws = fs.createWriteStream(PathXML);
                    xw = new XMLWriter(true, function(string, encoding) {
                        ws.write(string, encoding);
                    });
                    xw.startElement('Order_Animals_Popularity');
                    for (i = 0; i < results.length; i++) {
                        //var htmlContentToADD = "<tr> <th>" + results[i].animalName + "</th><th>" + results[i].likes + "</th></tr>";
                        //dom.window.document.getElementById("ranking").appendChild(htmlContentToADD);
                        const tr = dom.window.document.createElement("tr");
                        const td1 = dom.window.document.createElement("td");
                        td1.textContent = `${i+1}. ${results[i].animalName}`;
                        const td2 = dom.window.document.createElement("td");
                        td2.textContent = results[i].likes;
                        tr.appendChild(td1);
                        tr.appendChild(td2);
                        dom.window.document.getElementById("ranking").appendChild(tr);
                        xw.startElement('Animal').writeElement("Position", i + 1).writeElement("Name", results[i].animalName).writeElement("Likes", results[i].likes).endElement();
                        //Order = Order + htmlContentToADD;
                    }
                    xw.endElement('Order_Animals_Popularity');
                    //console.log(Order);
                    //dom.window.document.getElementById("ranking").innerHTML = dom.window.document.getElementById("ranking").innerHTML + Order;
                    res.write(dom.window.document.documentElement.outerHTML);
                    res.end();
                });
            } else {
                dom.window.document.getElementById("arrowUserOptions").style.display = "none";
                res.write(dom.window.document.documentElement.outerHTML);
                res.end();
            }
        }
    });
}