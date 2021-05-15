const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {

    var pageService, login_service, download_service;

    if (process.platform == "win32") {
        pageService = require('..\\services\\page_service.js');
        login_service = require('..\\services\\login_service.js');
        download_service = require('..\\services\\download_service.js');
    } else {
        pageService = require('../services/page_service.js');
        login_service = require('../services/login_service.js');
        download_service = require('../services/download_service.js');
    }
    //console.log(exactPage);
    const reqUrl = url.parse(req.url, true);


    console.log("Request URL :" + reqUrl.pathname);
    // GET endpoint 
    if (reqUrl.pathname.includes("/FrontEnd/pages/") && req.method === 'GET' && (!reqUrl.pathname.includes("ranking.html")) && (!(reqUrl.pathname.includes("get_Order"))) {
        pageService.load_page(req, res);
    }
    if (reqUrl.pathname.includes("ranking.html") && req.method === 'GET') {
        pageService.ranking_page(req, res);
    }

    // GET endpoint
    if (reqUrl.pathname == '/FrontEnd/index.html' && req.method === 'GET') {
        pageService.mainPage(req, res);
    }
    // GET endpoint 
    if ((reqUrl.pathname.includes("get_Order")) && (req.method === 'GET')) {
        download_service.download_xml(req, res);
    }

    //GET endpoint
    if ((reqUrl.pathname.includes("get_OrderCSV")) && (req.method === 'GET')) {
        download_service.download_csv(req, res);
    }
    // GET endpoint 
    if (reqUrl.pathname.includes(".css") && req.method === 'GET') {
        pageService.load_css(req, res);
    }
    // GET endpoint
    if (reqUrl.pathname.includes(".js") && req.method === 'GET') {
        pageService.load_js(req, res);
    }
    // GET endpoint 
    if ((reqUrl.pathname.includes(".png") || reqUrl.pathname.includes(".jpg")) && req.method === 'GET') {
        pageService.load_image(req, res);
    }
    // GET endpoint 
    if (reqUrl.pathname.includes(".svg") && req.method === 'GET') {
        pageService.load_svg(req, res);
    }
    // POST endpoint
    if (reqUrl.pathname == '/FrontEnd/pages/auth' && req.method === 'POST') {
        login_service.login(req, res);
    }
    // POST endpoint
    if (reqUrl.pathname == '/FrontEnd/pages/register' && req.method === 'POST') {
        login_service.register(req, res);
    }
});