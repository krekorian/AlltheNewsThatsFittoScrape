// $(document).ready(function () {
//     console.log("ready!");
//     $(document).on("click", "#savearticlebtn", function (event) {
//         console.log("ready!");
//     });
// });



window.onload = function () {
    // document.getElementById("savearticlebtn").addEventListener("click", function () {
    //     console.log("ready!");
    // });


    $(function () {
        $(document).on("click", "#savearticlebtn", function (event) {
            console.log("ready222!");
            let id = $(this).attr("data")
            console.log(id)
        });
    })
}

