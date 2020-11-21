$(function() {
    // var q = localStorage.getItem("token")

    // console.log(q);
    getqinghqiu()
})

function getqinghqiu() {
    // var q = localStorage.getItem("token")
    // console.log(q);
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem("tokec") || ""
        },
        success: function(res) {
            if (res.status !== 0) {
                console.log(res);
            }
            console.log(res);
        }
    });

}