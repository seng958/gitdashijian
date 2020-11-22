$(function() {
    const form = layui.form
    const layer = layui.layer
    form.verify({
        // 自定义了一个叫做 pwd 校验规
        nickname: function(value) {
            // 如果判断失败,则return一个提示消息即可
            if (value.length > 6) {
                return '昵称长度必须在 1-6个字符之间'
            }
        }
    })
    inituserinfo()

    function inituserinfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            headers: { Authorization: localStorage.getItem("token") || "" },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.layui.ms('res.message')
                }
                //给表单赋值
                form.val("formTest", res.data);
                // console.log("fuzhi");

            }
        });
    }
    $('#btn_res').on('click', function(res) {
        // 阻止表单的默认行为
        res.preventDefault();
        $(".layui-form [name=nickname]").val("")
        $(".layui-form [name=email]").val("")

    })
    $('#btn_xiugai').on('click', function(res) {
        res.preventDefault();
        console.log(11);
        var data = {
            id: $(".layui-form [name=id]").val(),
            nickname: $(".layui-form [name=nickname]").val(),
            email: $(".layui-form [name=email]").val()
        }
        console.log(data);
        $.ajax({
            type: "POSt",
            url: "/my/userinfo",
            data,
            success: function(res) {
                if (res.status !== 0 || res.message !== "修改用户信息成功！") {
                    layer.layui.msg(res.message)
                }
                layer.msg(res.message)
                    // inituserinfo()
                window.parent.getqinghqiu()
            }
        });
    })


})