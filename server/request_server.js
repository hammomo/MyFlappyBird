// 模拟服务器，接受前端http请求
// http是短链接， websocket是长链接
// node.js
(function () {
    'use strict';
    const http = require('http');

    http.createServer(function (request, response) {
        let body = '';
        request.on('data', function(chunk) {
            body += chunk;
        });

        request.on('end', function () {
            response.end('测试服务器返回的数据');
            console.log(body);
        });
    }).listen(8181);
})();