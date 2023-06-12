window.addEventListener('load', function () {
    // 登录框
    var login = document.querySelector('.login');
    var mask = document.querySelector('.login-bg');
    var user = document.querySelector('.iconuser');
    var close = document.querySelector('#closeBtn');
    var title = document.querySelector('#tit');
    //点击iconuser显示login和mask
    user.addEventListener('click', function () {
        login.style.display = 'block';
        mask.style.display = 'block';
    });
    //点击close隐藏 login和mask
    close.addEventListener('click', function () {
        login.style.display = 'none';
        mask.style.display = 'none';
    });

    //动态获取鼠标坐标  赋值给login
    //用鼠标的坐标减去鼠标在盒子内的坐标，移动事件写在按下事件里

    //鼠标按下
    tit.addEventListener('mousedown', function (e) {
        var x = e.pageX - login.offsetLeft;
        var y = e.pageY - login.offsetTop;   //鼠标在盒子内的坐标
        //鼠标移动
        document.addEventListener('mousemove', move);

        function move(e) {    //函数单独写出来，方便后面解除
            //页面内的坐标减去盒子内的坐标，赋值给login
            login.style.left = e.pageX - x + 'px';
            login.style.top = e.pageY - y + 'px';
        }
        //鼠标弹起后解除鼠标移动事件
        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', move);
        })
    })
})