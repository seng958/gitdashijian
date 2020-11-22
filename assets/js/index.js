$(function() {
    // var q = localStorage.getItem("token")

    // console.log(q);
    getqinghqiu()
    const layer = layui.layer

    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function() {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
                // 2. 重新跳转到登录页面
            location.href = '/login.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })
    })

})

function getqinghqiu() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem("token") || ""
        },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg("res.message")
                    // console.log(res);
            }
            // console.log(res);
            renderAvatar(res.data)
        },

    });

}
// 8986 0620 1550 1589 489V


// 渲染用户的头像

function renderAvatar(user) {
    // 1. 获取用户的名称
    console.log(user);
    var name = user.nickname || user.username
        // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3. 按需渲染用户的头像
        // console.log(user.user_pic);
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        //  2. attr(属性名, 属性值)   设置属性的值 （为所有匹配的元素设置一个属性值。）
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
            // 一、说明：把输入字符串中的小写字母全部变成大写字符。
        var first = name[0].toUpperCase()
            // console.log(first);
        $('.text-avatar')
            .html(first)
            .show()
    }
}