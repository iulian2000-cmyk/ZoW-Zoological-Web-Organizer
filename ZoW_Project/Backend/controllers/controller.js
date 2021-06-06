import { add_album, add_animal } from '../services/basic_services';
const http = require('http');
const url = require('url');
const formidable = require('formidable');

module.exports = http.createServer((req, res) => {

    var pageService, login_service, download_service, basic_service, load_default_album_service, search_bar_service, save_album_service, load_saved_album_service,
        share_album_service, load_shared_album_service;

    pageService = require('../services/page_service.js');
    login_service = require('../services/login_service.js');
    download_service = require('../services/download_service.js');
    basic_service = require('../services/basic_services.js');
    load_default_album_service = require('../services/load_default_album_service.js');
    generate_album_service = require('../services/generate_album_service.js');
    search_bar_service = require('../services/search_bar_service.js');
    save_album_service = require('../services/save_album_service.js');
    load_saved_album_service = require('../services/load_saved_album_service.js');
    share_album_service = require('../services/share_album_service');
    load_shared_album_service = require('../services/load_shared_album_service.js');

    const reqUrl = url.parse(req.url, true);

    console.log("Request URL :" + reqUrl.pathname);

    /** /FrontEnd/pages/admin.html ||  /FrontEnd/pages/authentication.html  || /FrontEnd/pages/registerp */
    if (reqUrl.pathname.includes("admin.html") || reqUrl.pathname.includes("authentication.html") || (reqUrl.pathname.includes("registerp"))) {
        pageService.load_page(req, res);
    }

    /** /FrontEnd/pages/like_ */
    if (reqUrl.pathname.includes("like_")) {
        basic_service.update_likes(req, res);
    }

    /** /FrontEnd/pages/add_user   */
    if (reqUrl.pathname.includes("add_user") && req.method === 'POST') {
        basic_service.add_user(req, res);
    }
    /** /FrontEnd/pages/delete_animal */
    if (reqUrl.pathname.includes("delete_animal")) {
        basic_service.delete_animal(req, res);
    }
    /** /FrontEnd/pages/delete_user */
    if (reqUrl.pathname.includes("delete_user")) {
        basic_service.delete_user(req, res);
    }

    /** /FrontEnd/pages/add_album */
    if (reqUrl.pathname.includes("add_album")) {
        basic_service.add_album(req, res);
    }
    /** /FrontEnd/pages/add_animal */
    if (reqUrl.pathname.includes("add_animal")) {
        basic_service.add_animal(req, res);
    }
    /** /FrontEnd/pages/delete_album */
    if (reqUrl.pathname.includes("delete_album")) {
        basic_service.delete_album(req, res);
    }
    /** /FrontEnd/*.jpg  */
    if (reqUrl.pathname.includes("animal") && req.method === 'GET' && (!(reqUrl.pathname.includes("jpg")))) {
        pageService.load_animal_page(req, res);
    }
    /** /FrontEnd/pages/ranking.html */
    if (reqUrl.pathname.includes("ranking.html") && req.method === 'GET') {
        pageService.ranking_page(req, res);
    }

    /** /FrontEnd/index.html */
    if (reqUrl.pathname == '/FrontEnd/index.html' && req.method === 'GET') {
        pageService.mainPage(req, res);
    }

    /** /FrontEnd/get_Order*/
    if ((reqUrl.pathname.includes("get_Order")) && (req.method === 'GET')) {
        download_service.download_xml(req, res);
    }

    /** /FrontEnd/pages/get_CSV */
    if ((reqUrl.pathname.includes("get_CSV")) && (req.method === 'GET')) {
        download_service.download_csv(req, res);
    }
    /** /FrontEnd/pages/get_PDF */
    if ((reqUrl.pathname.includes("get_PDF")) && (req.method === 'GET')) {
        download_service.download_pdf(req, res);
    }
    /** /FrontEnd/*.css */
    if (reqUrl.pathname.includes(".css") && req.method === 'GET') {
        pageService.load_css(req, res);
    }
    /** /FrontEnd/*.js */
    if (reqUrl.pathname.includes(".js") && req.method === 'GET') {
        pageService.load_js(req, res);
    }
    /** /FrontEnd/pages/*.png */
    if ((reqUrl.pathname.includes(".png") || reqUrl.pathname.includes(".jpg")) && req.method === 'GET') {
        pageService.load_image(req, res);
    }
    /** /FrontEnd/pages/*.jpeg */
    if (reqUrl.pathname.includes(".jpeg")) {
        pageService.load_jpeg(req, res);
    }

    /** /FrontEnd/pages/*.svg */
    if (reqUrl.pathname.includes(".svg") && req.method === 'GET') {
        pageService.load_svg(req, res);
    }

    /** /FrontEnd/pages/auth */
    if (reqUrl.pathname == '/FrontEnd/pages/auth' && req.method === 'POST') {
        login_service.login(req, res);
    }
    /** /FrontEnd/pages/register */
    if (reqUrl.pathname == '/FrontEnd/pages/register' && req.method === 'POST') {
        login_service.register(req, res);
    }
    /** /FrontEnd/load */
    if (reqUrl.pathname == '/FrontEnd/load' && req.method === 'GET') {
        load_default_album_service.load_album(req, res);
    }
    /** /FrontEnd/generate */
    if (reqUrl.pathname == '/FrontEnd/generate' && req.method === 'GET') {
        generate_album_service.generate_album(req, res);
    }
    /** /FrontEnd/search*/
    if (reqUrl.pathname == '/FrontEnd/search' && req.method === 'GET') {
        search_bar_service.search_data(req, res);
    }
    /** /FrontEnd/load_saved_album */
    if (reqUrl.pathname == '/FrontEnd/load_saved_album' && req.method === 'GET') {
        load_saved_album_service.load_album(req, res);
    }
    /** /FrontEnd/load_shared_album */
    if (reqUrl.pathname == '/FrontEnd/load_shared_album' && req.method === 'GET') {
        load_shared_album_service.load_album(req, res);
    }
    /** /FrontEnd/save */
    if (reqUrl.pathname.includes("save") && req.method === 'POST') {
        save_album_service.save_album(req, res);
    }
    /** /FrontEnd/pages/manual.html*/
    if (reqUrl.pathname.includes("manual.html")) {
        pageService.load_manual(req, res);
    }
    /** /FrontEnd/share */
    if (reqUrl.pathname.includes("/FrontEnd/share") && req.method === 'POST') {
        share_album_service.share_album(req, res);
    }
});