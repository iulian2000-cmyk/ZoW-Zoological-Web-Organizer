const url = require('url');
var fs = require('fs');
var Cookies = require('cookies');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var mysql = require('mysql');
var XMLWriter = require('xml-writer');
const { type } = require('os');

var keys = [''];
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'zow_atlas'
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
                if (isAdmin == "1") {
                    dom.window.document.getElementById("admin").style.display = "block";
                    dom.window.document.getElementById("adminMenu").style.display = "block";
                }
                dom.window.document.getElementById("userLabel").textContent = username;
                dom.window.document.getElementById("usernameMenu").textContent = username;
                dom.window.document.getElementById("loginBtn").style.display = "none";
                //console.log(dom.window.innerWidth);
                dom.window.document.getElementById("usernameMenu").style.display = "block";
                dom.window.document.getElementById("loginMenu").style.display = "none";
                dom.window.document.getElementById("logoutMenu").style.display = "block";
                var flag_user_who_shared = 0;
                connection.query("SELECT * FROM users WHERE user_name=?", [username], function(error, results, fields) {
                    connection.query("SELECT albumCustomName  FROM shared_albums JOIN customAlbums ON customAlbums.id_albumCustom=shared_albums.id_albumCustom WHERE id_user2=?", [results[0].id_user], function(error, results, fields) {
                        if (results.length > 0) {
                            for (i = 0; i < results.length; i++) {
                                var option = dom.window.document.createElement("option");
                                option.value = results[i].albumCustomName;
                                option.innerHTML = results[i].albumCustomName;
                                dom.window.document.getElementById("shared-albums-select").appendChild(option);
                                flag_user_who_shared = 1;
                            }
                            //res.write(dom.window.document.documentElement.outerHTML);
                        }
                        connection.query(`SELECT albumCustomName from customAlbums natural join users where user_name=?;`, [username], function(error, results, fields) {
                            if (results.length > 0) {
                                for (i = 0; i < results.length; i++) {
                                    var option = dom.window.document.createElement("option");
                                    option.value = results[i].albumCustomName;
                                    option.innerHTML = results[i].albumCustomName;
                                    dom.window.document.getElementById("saved-albums-select").appendChild(option);
                                }
                                if (flag_user_who_shared == 1) {
                                    var parentElement = dom.window.document.getElementsByClassName("content");
                                    var referenceElement = dom.window.document.getElementById("userInstructions");
                                    var newElement = dom.window.document.createElement("p");
                                    newElement.style.color = "#2b4868";
                                    newElement.style.fontSize = "20px";
                                    newElement.style.marginBottom = "0.5em";
                                    newElement.style.marginTop = "1em";
                                    newElement.style.textShadow = "1px 1px 2px #72b0c9";
                                    newElement.id = "notificationText";
                                    newElement.innerHTML = " Someone shared an album with you ! ";
                                    newElement.style.display = "block";
                                    referenceElement.before(newElement);
                                    //parentElement.insertBefore(newElement, referenceElement);
                                }
                            }
                            connection.query('SELECT DISTINCT albumName FROM albumsdefault;', function(error, results, fields) {
                                if (results.length > 0) {
                                    for (i = 0; i < results.length; i++) {
                                        const option = dom.window.document.createElement("option");
                                        option.value = results[i].albumName;
                                        option.innerHTML = results[i].albumName.toUpperCase();
                                        const sel = dom.window.document.getElementById("defaultAlbumsId");
                                        sel.appendChild(option);
                                    }
                                }
                                res.write(dom.window.document.documentElement.outerHTML);
                                res.end();
                            });

                        });
                    });
                });

            } else {
                dom.window.document.getElementsByClassName("myAlbums")[0].style.display = "none";
                dom.window.document.getElementsByClassName("sharedAlbums")[0].style.display = "none";
                dom.window.document.getElementById("arrow").style.display = "none";
                dom.window.document.getElementById("usernameMenu").style.display = "none";
                dom.window.document.getElementById("logoutMenu").style.display = "none";
                connection.query('SELECT DISTINCT albumName FROM albumsdefault;', function(error, results, fields) {
                    if (results.length > 0) {
                        for (i = 0; i < results.length; i++) {
                            const option = dom.window.document.createElement("option");
                            option.value = results[i].albumName;
                            option.innerHTML = results[i].albumName.toUpperCase();
                            const sel = dom.window.document.getElementById("defaultAlbumsId");
                            sel.appendChild(option);
                        }
                    }
                    res.write(dom.window.document.documentElement.outerHTML);
                    res.end();
                });
            }
        }
    });
}

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

exports.load_jpeg = function(req, res) {
    var pathFile = __dirname + url.parse(req.url).pathname;
    if (process.platform == "win32") {

        pathFile = pathFile.replace("\\Backend\\services", "");
    } else {
        pathFile = pathFile.replace("/Backend/services", "");
    }
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    fs.readFile(pathFile, function(err, content) {
        res.end(content);
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
        res.write(content);
        res.end();
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
    var username = cookies.get('username', { signed: true });
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
                const dom = new JSDOM(data);
                dom.window.document.getElementById("username").textContent = username;
                connection.query("SELECT * FROM animals ORDER BY animalName", function(error, results, fields) {
                    const containter = dom.window.document.getElementById("checkContainer");

                    for (i = 0; i < results.length; i++) {
                        var div = dom.window.document.createElement("div");
                        div.style.display = "block";

                        var element = dom.window.document.createElement("input");
                        element.type = "checkbox";
                        element.id = i + 1;
                        element.value = results[i].id_animal;
                        element.name = results[i].animalName;

                        var label = dom.window.document.createElement("label");
                        label.textContent = results[i].animalName;
                        label.for = i + 1;

                        div.appendChild(element);
                        div.appendChild(label);

                        containter.appendChild(div);
                    }
                    res.write(dom.window.document.documentElement.outerHTML);
                    res.end();
                });
            };
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
            } else {
                dom.window.document.getElementById("arrowUserOptions").style.display = "none";
            }
            connection.query("SELECT * FROM animals ORDER BY likes DESC LIMIT 30;", function(error, results, fields) {
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
        }
    });
}

exports.load_animal_page = function(req, res) {

    var pathFile = __dirname + url.parse(req.url).pathname;
    if (process.platform == "win32") {
        pathFile = pathFile.replace("\\Backend\\services", "");
        pathFile = pathFile.replace("/FrontEnd/pages/", "\\FrontEnd\\pages\\");
    } else {
        pathFile = pathFile.replace("/Backend/services", "");
    }
    var index_animal = pathFile.substring(pathFile.lastIndexOf("_") + 1, pathFile.lastIndexOf("."));
    //console.log(index_animal);
    pathFile = pathFile.replace("_" + index_animal, "");

    fs.readFile(pathFile, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.write('Page not found' + JSON.stringify(err));
            res.end();
        } else {
            res.writeHead(200, { 'Content-type': 'text/html' });
            const dom = new JSDOM(data);
            connection.query('SELECT * FROM animals WHERE id_animal=' + connection.escape(index_animal), function(error, results, fields) {

                dom.window.document.title = results[0].animalName;
                dom.window.document.getElementById("Title_Card").textContent = results[0].animalName;
                dom.window.document.getElementById("content1").textContent = results[0].cardLongevitate;
                dom.window.document.getElementById("content2").textContent = results[0].cardCategorie;
                dom.window.document.getElementById("content3").textContent = results[0].cardGreutateMedie;
                dom.window.document.getElementById("content4").textContent = results[0].cardInaltimeMedie;
                dom.window.document.getElementById("content5").textContent = results[0].cardMediuDeViata;
                dom.window.document.getElementById("content6").textContent = results[0].cardModDeHranire;
                dom.window.document.getElementById("content7").textContent = results[0].likes;
                dom.window.document.getElementById("TextGeneralitati").textContent = results[0].generalities;
                dom.window.document.getElementById("StiatiCaText").textContent = results[0].stiatiCa;



                dom.window.document.getElementById("like").action = dom.window.document.getElementById("like").action + index_animal;
                //dom.window.document.getElementById("add").action = dom.window.document.getElementById("add").action + index_animal;

                dom.window.document.getElementsByClassName("ImgGallery")[0].src = results[0].imagePath1;
                dom.window.document.getElementsByClassName("ImgGallery")[1].src = results[0].imagePath2;
                dom.window.document.getElementsByClassName("ImgGallery")[2].src = results[0].imagePath3;
                dom.window.document.getElementsByClassName("ImgGallery")[3].src = results[0].imagePath4;

                //dom.window.document.getElementsByClassName("myImg")[0].src = results[0].imagePath1;


                dom.window.document.getElementsByClassName("demo cursor ")[0].src = results[0].imagePath1;
                dom.window.document.getElementsByClassName("demo cursor ")[1].src = results[0].imagePath2;
                dom.window.document.getElementsByClassName("demo cursor ")[2].src = results[0].imagePath3;
                dom.window.document.getElementsByClassName("demo cursor ")[3].src = results[0].imagePath4;

                res.write(dom.window.document.documentElement.outerHTML);

                res.end();
            });
        }
    });
}

exports.load_manual = function(req, res) {
    var pathFile = __dirname + url.parse(req.url).pathname;
    if (process.platform == "win32") {
        pathFile = pathFile.replace("\\Backend\\services", "");
        pathFile = pathFile.replace("/FrontEnd/pages/", "\\FrontEnd\\pages\\");
    } else {
        pathFile = pathFile.replace("/Backend/services", "");
    }
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
}