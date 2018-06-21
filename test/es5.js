(function () {
    'use strict';

    // 函数声明
    var Animal = function (name, age) {
        this.name = name;
        this.age = age;
    };

    Animal.prototype.say = function() {
        console.log(this.name + ' ' + this.age);
    };
    //
    // var cat = new Animal('小猫', 3);
    // cat.say();
    //
    // // 寄生组合继承
    // // call() apply()
    // // 调用一个对象的一个方法， 用另一个方法替换当前对象
    // Animal.prototype.say.apply(cat);
    //
    // var params = {
    //     name: '小猫2',
    //     age: 4
    // };
    //
    // cat.say.call(params);

    var Cat = function(name, age) {
        Animal.apply(this, arguments);
    };

    Cat.prototype = Object.create(Animal.prototype);

    Cat.prototype.say = function() {
        var p = {
            name: '父类',
            age: 11
        };
        Animal.prototype.say.apply(p);
        console.log('这是子类' + this.name);
    };

    var cat1 = new Cat('子猫', 5);
    cat1.say();
})();