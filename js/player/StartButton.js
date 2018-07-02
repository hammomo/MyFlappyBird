// 开始按钮
import {Sprite} from "../base/Sprite.js";

export class StartButton extends Sprite {
    constructor() {
        const image = Sprite.getImage('startButton');
        super(image,
            0, 0, image.width, image.height,
            (window.innerWidth - image.width) / 2,
            (window.innerWidth - image.height),
            image.width, image.height
            );
    }
}