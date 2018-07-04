// 导演类，控制游戏的逻辑
import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 2;
    }

    // 导演类单例模式的实现
    static getInstance() {
        if(!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    createPencil() {
        const minTop = DataStore.getInstance().canvas.height / 6;
        const maxTop = DataStore.getInstance().canvas.height / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    birdsEvent() {
        for (let i = 0; i <= 2; i++) {
            this.dataStore.get('birds').y[i] =
                this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }

    static isStrike(bird, pencil) {
        let s = false;
        if (bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.left > pencil.right ||
            bird.right < pencil.left
        ) {
            s = true;
        }
        return !s;
    }

    check() {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');
        let score = this.dataStore.get('score');

        if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
            console.log('撞击地板啦');
            this.isGameOver = true;
            return;
        }

        // 小鸟的边框模型
        const birdsBorder = {
            top: birds.birdsY[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        };

        // 铅笔边框模型
        const length = pencils.length;
        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };
            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log('撞击铅笔啦');
                this.isGameOver = true;
                return;
            }

        }
        if(birds.birdsX[0] > pencils[0].x + pencils[0].width
        && score.isScore) {
            wx.vibrateShort({
                success: function () {
                    console.log('振动');
                }
            });
            score.isScore = false;
            score.scoreNumber++;
        }
    }

    run() {
        this.check();
        if(!this.isGameOver) {
            this.dataStore.get('background').draw();
            const pencils = this.dataStore.get('pencils');
            if(pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
                pencils.shift(); // 把数组的第一个元素推出
                pencils.shift();
            }

            if(pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2
                && pencils.length === 2) {
                this.createPencil();
                this.dataStore.get('score').isScore = true;
            }

            this.dataStore.get('pencils').forEach((value) => {
                value.draw();
            });
            this.dataStore.get('land').draw();
            this.dataStore.get('score').draw();
            this.dataStore.get('birds').draw();
            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);
        } else {
            console.log('游戏结束');
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy(); // 内存释放
            // 微信小游戏垃圾回收机制
            wx.triggerGC();
        }
    }
}