$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        // 从 layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
            // 自定义了一个叫做 pwd 校验规则
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            // 校验两次密码是否一致的规则
            repwd: function(value) {
                // 如果判断失败,则return一个提示消息即可
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致！'
                }
            }
        })
        // 监听 注册表单的提交事件
    $("#form_reg").on('submit', function(e) {
            // 1. 阻止默认的提交行为
            e.preventDefault()
                // console.log(11);
            var ulr = "http://ajax.frontend.itheima.net"
            var data = {
                username: $("#form_reg [name=user]").val(),
                password: $("#form_reg [name=password]").val()
            }
            console.log(data);
            $.post("/api/reguser", data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                $('#link_login').click()

                $("#form_reg [name=user]").val('')
                $("#form_reg [name=password]").val("")
            })
        })
        // 监听 登录表单的提交事件
    $("#from_deng").on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
            // console.log(11);
        var data = {
            username: $("#from_deng [name=user]").val(),
            password: $("#from_deng [name=password]").val()
        }
        console.log(data);
        $.post("/api/login", data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg("登陆成功")
                // $("#form_deng [name=user]").val('')
                // $("#form_deng [name=password]").val("")
                // 创建本地 缓存 名字 为token 

            localStorage.setItem('tokec', res.token)
            console.log(res);
            location.href = '/index.html'
        })
    })
})