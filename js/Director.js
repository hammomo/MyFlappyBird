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
        const minTop = window.innerHeight / 6;
        const maxTop = window.innerHeight / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    run() {
        if(!this.isGameOver) {
            this.dataStore.get('background').draw();
            const pencils = this.dataStore.get('pencils');
            if(pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
                pencils.shift(); // 把数组的第一个元素推出
                pencils.shift();
            }

            if(pencils[0].x <= (window.innerWidth - pencils[0].width) / 2
                && pencils.length === 2) {
                this.createPencil();
            }

            this.dataStore.get('pencils').forEach((value) => {
                value.draw();
            });
            this.dataStore.get('land').draw();
            this.dataStore.get('birds').draw();
            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);
        } else {
            console.log('游戏结束');
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy(); // 内存释放
        }
    }
}