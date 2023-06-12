window.addEventListener('load', function () {
    // 1. 获取元素
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var promo = document.querySelector('.promo');
    var promoWidth = promo.offsetWidth;   //获取图片的宽度

    // 2. 绑定鼠标经过离开事件
    promo.addEventListener('mouseover', function () {
        //鼠标经过就显示左右按钮,并停止自动播放
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);   //停止自动播放定时器
        timer = null;   //清空变量
    })
    promo.addEventListener('mouseleave', function () {
        //鼠标离开就隐藏，并开启自动播放
        prev.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function () {  //开启自动播放定时器
            next.click();
        }, 3000);
    })

    // 3. 把图片和圆点绑定
    var ul = document.querySelector('.lun');
    var nav = document.querySelector('.promo-nav');
    //通过ul.children.length得知有多少张图片，并用for循环生成对应的圆点
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');   //创建对应的li圆点

        //记录当前li的索引号，通过自定义属性
        li.setAttribute('index', i);
        nav.appendChild(li);    //把li插入圆点列表
        //给每个小圆点绑定点击事件，排他思想
        li.addEventListener('click', function () {
            for (var i = 0; i < nav.children.length; i++) {
                nav.children[i].className = '';    //清除每个Li的类名
            }
            this.className = 'selected';    //给当前li圆点添加颜色类

            //点击圆点移动图片ul
            //ul的移动距离是小圆圈的索引和乘图片的宽度,往左走是负值
            //当点击了li就过去该li的索引号
            var index = this.getAttribute('index');    //获取当前Li的索引号
            //把当前li的索引号给num和circle，好让圆点和图片对应变化
            num = circle = index;
            //var promoWidth = promo.offsetWidth;   
            //获取图片的宽度,要声明在函数外，因为后面其他函数要用
            animate(ul, -index * promoWidth);    //给ul添加左移动效果
        })
    }
    //把第一个圆点选中，类名selected
    nav.children[0].className = 'selected';


    // 4. 点击右侧按钮滚动一张图片
    //声明一个变量，每点击一次就加1，用变量值乘图片宽度就是移动距离；
    //需要用到无缝滚动，原理：把第一张复制一份放在最后面，
    //用克隆节点的方法cloneNode(true)，深克隆，再用appendChild放到最后；
    //当滚动到最后一张时，让ul不做动画的跳到第一张：left为0，再把num置0;
    var frist = ul.children[0].cloneNode(true);     //克隆第一张
    ul.appendChild(frist);    //放到最后

    var num = 0;     //控制图片移动
    var circle = 0;    //控制圆点跟随图片上色
    //flag 就是节流阀
    var flag = true;
    next.addEventListener('click', function () {
        if (flag) {
            flag = false;   //关闭节流阀
            //判断是否到了最后那张复制图，
            if (num == ul.children.length - 1) {
                ul.style.left = 0;     //ul跳到第一张
                num = 0;
            }
            num++;
            animate(ul, -num * promoWidth, function () {
                flag = true;     //打开节流阀
            });    //动画执行完毕了


            // 5. 小圆圈跟随两侧按钮变化
            // 声明一个变量circle，每次点击自增一，声明成全局按钮，因为左侧要用
            circle++;
            //判断是否到了最后一个圆点
            if (circle == ul.children.length - 1) {
                circle = 0;     //回到第一个圆点

            }
            circleChange();   //调用清除/添加颜色类名的函数
        }

    });

    // 6. 点击左侧按钮滚动图片
    prev.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //判断是否到了第一张图，
            if (num == 0) {
                num = ul.children.length - 1;   //索引号重置到最后一张    
                ul.style.left = -num * promoWidth + 'px';  //索引号乘盒子宽度，ul跳到最后一张

            }
            num--;
            animate(ul, -num * promoWidth, function () {
                flag = true;
            });

            circle--;
            //如果circle小于0，说明要跳到最后一张图
            // if (circle < 0) {
            //     circle = nav.children.length - 1;     //跳到第最后一个圆点
            //     //可以写成如下的三元表达式
            // }
            circle = circle < 0 ? nav.children.length - 1 : circle;
            circleChange();   //调用清除/添加颜色类名的函数
        }

    });

    // 7. 把给圆点清除/添加颜色类名的代码封装成函数
    function circleChange() {
        for (var i = 0; i < nav.children.length; i++) {
            nav.children[i].className = '';    //清除每个圆点的颜色类

        }
        nav.children[circle].className = 'selected';   //给当前圆点上色
    }

    // 8. 自动播放轮播图，通过定时器实现
    //自动播放类似不停的点击右键按钮
    //使用手动调用右侧按钮点击事件  next.click()
    var timer = this.setInterval(function () {
        next.click();
    }, 3000);
})