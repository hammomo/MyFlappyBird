// 进行API测试
export class ApiExamples {
    getUserInfo() {
        wx.getUserInfo({
            success: function (res) {
                console.log(res);
            }
        });
    }

    login() {
        wx.login({
            success: function (res) {
                console.log(res);
            }
        });
    }

    getSetting() {
        wx.getSetting({
            success: function (res) {
                console.log(JSON.stringify(res));
            }
        });
    }

    httpExample() {
        wx.request({
            url: 'http://127.0.0.1:8181/',
            method: 'POST',
            data: 'MyData',
            success: function (response) {
                console.log(response);
            }
        });
    }

    socketExample() {
        wx.connectSocket({
            url: 'ws://127.0.0.1:8282/',
            success: function () {
                console.log('客户端连接成功');
            }
        });
        
        wx.onSocketOpen(function () {
            wx.sendSocketMessage({
                data: 'Hello, Server.'
            });
        });
    }

    download() {
        wx.downloadFile({
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530715328041&di=3df7b9bf758fc78ec1c7f95712b5386e&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a4f155fd31e06ac7251df827af09.jpg',
            success: function(temp) {
                console.log(JSON.stringify(temp));
            }
        });
    }
}