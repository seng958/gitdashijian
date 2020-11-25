$(function() {
    var layer = layui.layer
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function(res) {
                const htmls = template('tpl-table', res)
                $('tbody').html(htmls)
            }
        });
    }
    var indexAdd = null
    $('#btnadd').on('click', function() {
            indexAdd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-add').html()
            })
        })
        // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    // 根据索引，关闭对应的弹出层
                    layer.close(indexAdd);
                    initArtCateList()
                }
            })
        })
        // 点击编辑 弹出 修改曾
    $('body').on('click', '.btn-bianji', function(e) {
        const form = layui.form
        var id = $(this).attr('data-id');

        // console.log(id);

        indexAdd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-care').html()
            })
            // 点击 编辑请求数据
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 成功获取到数据后渲染 表单为form-xiu 里面name 为id,name,alias的值
                // form.val('dddd', res.data)
                $('#form-xiu [name =Id]').val(res.data.Id)
                $('#form-xiu [name =name]').val(res.data.name)
                $('#form-xiu [name =alias]').val(res.data.alias)
                    // console.log(res.data);
            }
        });

    })



    $('body').on('click', '.btn-shanchu', function(e) {
        var id = $(this).attr('data-id')
            // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })

    })

    // 确认修改
    $('body').on('submit', '#form-xiu', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            // 获取表单里面的 有name 属性的值
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                        // console.log(data);
                }
                layer.msg('更新分类数据成功！')
                    // 关闭弹出层
                layer.close(indexAdd)
                initArtCateList()
            }
        })

    })
})