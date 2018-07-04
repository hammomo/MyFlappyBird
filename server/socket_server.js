(function() {
    'use strict';

    const WebSocketServer = require('ws').Server;
    const ws = new WebSocketServer({
        port: 8282
    });

    ws.on('connection', function(ws) {
        console.log('服务器连接成功');
        // 小游戏发送的数据所调用的方法
        ws.on('message', function (message) {
            console.log(message);
        });
    });
})();