$(function() {
    var layer = layui.layer
    var form = layui.form

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 定义一个查询的参数对象，将来请求数据的时候，
    // 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    initTable()
    initCate()
        // 初始化文章数据
    function initTable() {
        $.ajax({
            method: "GET",
            url: "/my/article/list",
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res.data);
                    return layer.msg(res.message);
                }
                const htmmls = template('tpl-table', res)
                $('tbody').html(htmmls)
                renderPage(res.total)
            }
        });
    }

    // 初始化文章分类的方法
    function initCate() {
        var form = layui.form
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // console.log(11);
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)

                // $('tbody').html(htmlStr)
                // console.log(res.data);
                $('[name=cate_id]').html(htmlStr)
                    // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }

    // 筛选
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
        var cate_id = $("[name=cate_id]").val()
        var state = $("[name=state]").val()
            // console.log(state);
            // console.log(cate_id);
        q.cate_id = cate_id
        q.state = state
            //从新渲染文章列表数据
        initTable()
    })

    // 渲染分页
    var laypage = layui.laypage

    function renderPage(total) {
        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ["count", "limit", 'prev', 'page', 'next', "refresh", "skip"],
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr
                if (!first) {
                    initTable()
                }
            }
        })
    }

    // 删除
    $('body').on('click', ".btn-shanchu", function(e) {
        var id = $(this).attr('data-id')
            // console.log(id);
            // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')

                    initTable()
                }
            })
            layer.close(index)
        })
    })

})