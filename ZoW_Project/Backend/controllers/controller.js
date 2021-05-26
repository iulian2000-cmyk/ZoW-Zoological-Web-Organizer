const http = require('http');
const url = require('url');
const formidable = require('formidable');

module.exports = http.createServer((req, res) => {

    var pageService, login_service, download_service, basic_service;

    if (process.platform == "win32") {
        pageService = require('../services/page_service.js');
        login_service = require('../services/login_service.js');
        download_service = require('../services/download_service.js');
        basic_service = require('../services/basic_services.js');
    } else {
        pageService = require('../services/page_service.js');
        login_service = require('../services/login_service.js');
        download_service = require('../services/download_service.js');
        basic_service = require('../services/basic_services.js');
    }
    //console.log(exactPage);
    const reqUrl = url.parse(req.url, true);


    console.log("Request URL :" + reqUrl.pathname);
    if (reqUrl.pathname.includes("admin.html") || reqUrl.pathname.includes("authentication.html") || (reqUrl.pathname.includes("registerp"))) {
        pageService.load_page(req, res);
    }

    if (reqUrl.pathname.includes("like_")) {
        basic_service.update_likes(req, res);
    }
    if (reqUrl.pathname.includes("add_user") && req.method === 'POST') {
        basic_service.add_user(req, res);
    }
    if (reqUrl.pathname.includes("delete_animal")) {
        basic_service.delete_animal(req, res);
    }
    if (reqUrl.pathname.includes("delete_user")) {
        basic_service.delete_user(req, res);
    }
    if (reqUrl.pathname.includes("add_album")) {
        basic_service.add_album(req, res);
    }
    if (reqUrl.pathname.includes("add_animal")) {
        basic_service.add_animal(req, res);
    }
    if (reqUrl.pathname.includes("delete_album")) {
        basic_service.delete_album(req, res);
    }
    if (reqUrl.pathname.includes("animal") && req.method === 'GET' && (!(reqUrl.pathname.includes("jpg")))) {
        pageService.load_animal_page(req, res);
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
    if ((reqUrl.pathname.includes("get_CSV")) && (req.method === 'GET')) {
        download_service.download_csv(req, res);
    }


    //GET endpoint
    if ((reqUrl.pathname.includes("get_PDF")) && (req.method === 'GET')) {
        download_service.download_pdf(req, res);
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
    if (reqUrl.pathname.includes(".jpeg")) {
        pageService.load_jpeg(req, res);
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
