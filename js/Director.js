// 导演类，控制游戏的逻辑
export class Director {
    constructor() {
        console.log('构造器初始化');
    }

    // 导演类单例模式的实现
    static getInstance() {
        if(!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }
}