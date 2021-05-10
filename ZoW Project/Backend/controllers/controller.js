const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {

    var pageService = require('../services/page_service.js');
    var login_service = require('../services/login_service.js');

    const reqUrl = url.parse(req.url, true);


    console.log("Request URL :" + reqUrl.pathname);
    // GET endpoint 
    if (reqUrl.pathname.includes("/FrontEnd/pages/") && req.method === 'GET') {
        pageService.load_page(req, res);
    }
    // GET endpoint
    if (reqUrl.pathname == '/FrontEnd/index.html' && req.method === 'GET') {
        pageService.mainPage(req, res);
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