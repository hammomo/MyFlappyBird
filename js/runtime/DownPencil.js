// 下半部分的铅笔
import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class DownPencil extends Pencil {
    constructor(top) {
        const image = Sprite.getImage('pencilDown');
        super(image, top);
    }

    draw() {
        const gap = DataStore.getInstance().canvas.height / 4;
        this.y = this.top + gap; // 左上角y的位置
        super.draw();
    }
}