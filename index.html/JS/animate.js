//封装该函数，animate动画，obj目标对象，target目标位置
//优化：给不同的调用元素使用不同的定时器，(利用给对象添加属性的方法),
//obj.timer就不用去声明变量开辟了，还有单独的名字如，box.timer，box1.timer

function animate(obj, target, callback) {   //callback传递回调函数
    //var timer = setInterval(function () {
    //这样每次调用函数都会开辟一个timer空间，浪费


    //当绑定了点击事件后，不断点击元素就会越来越快，因为在不断开启定时器
    //解决：让元素只有一个定时器，在添加定时器之前先清除以前的定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {

        //步长值写在定时器里，//公式：(目标值-现在的位置)/10
        //步长值一般是小数，需要往大取整,除数越大速度越慢
        //var step = Math.ceil((target - obj.offsetLeft) / 25);

        //考虑到要返回需要往小取整，用三元表达式判断正负
        var step = (target - obj.offsetLeft) / 20;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);


        //box.offsetLef 盒子当前距左边的距离
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            //回调函数写在定时器结束的位置
            // if (callback) {     //判断如果有回调函数就调用
            //     callback();
            // } 可简写如下
            callback && callback();
            //利用短路运算，有参数进来第一个就为真，就调用函数，没有参数就为假，不再执行
        }

        //通过style赋值，offset来获取值
        //改成缓动动画，
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}