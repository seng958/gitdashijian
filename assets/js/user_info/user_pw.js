$(function() {
    const form = layui.form
    const layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        repwd: function(value) {
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.layui-form [name=nickname]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    $('#btn_res').on('click', function(res) {
        res.preventDefault()
        $(".layui-form")[0].reset()

    })
    $('#btn_xiugai').on('click', function(res) {
        res.preventDefault()
        const data = {
            oldPwd: $(".layui-form [name=username]").val(),
            newPwd: $(".layui-form [name=nickname]").val()
        }
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                $(".layui-form")[0].reset()
            }
        });

    })


})