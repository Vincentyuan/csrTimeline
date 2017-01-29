$(document).ready(function () {
     $(document).on('mouseover', ".time-point", function () {
       $(this).parents(".time-block").find(".time-detail").css("display", "block");
    });
     $(document).on('mouseleave', ".time-point", function () {
       $(this).parents(".time-block").find(".time-detail").css("display", "none");
    });
    $(document).on('click', ".time-point", function () {
       $(this).parents(".time-block").find(".time-detail").addClass("show");
    });
     $(document).on('click', ".close-btn", function () {
       $(this).parents(".time-detail").removeClass("show");
            $(this).parents(".time-detail").css("display", "none");
    });
        //read json file
    function loadJson() {
        var jqxhr = $.getJSON("json/test.json", function (json) {
            var list = json.csrDataList;
            var title;
            var year;
            var catalog;
            var author;
            var discription;
            var articalLink;
            var imagePath;
            for (var i = 0; i < list.length; i++) {
                title = list[i].title;
                year = list[i].year;
                catalog = list[i].catalog;
                author = list[i].author;
                discription = list[i].discription;
                articalLink = list[i].articalLink;
                imagePath = list[i].imagePath;
                var html = ' <div class="time-block row"> <div class="col-xs-5 "><span class="right" style="padding-top: 9px;">' + year + '</span> </div><div class="col-xs-2 "> <div class="time-point center-block" style="background-image: url(../' + imagePath + ');"></div></div><div class="col-xs-5 "> <div class="time-detail"> <p ><a href="'+articalLink+'"><span class="title">' + title + '</span></a><span class="right close-btn">X</span></p><p class="sm">Submitted by: <span class="blue">' + author + '</span></p> <p class="sm">Categories: <span class="blue">' + catalog + ' </span></p> <div class="hor-line xs"></div><div class="description">' + discription + '</div></div> </div>  </div>';
                $(".time-blocks").append(html);
            } 
        }).error(function () {
            alert("ajax return error");
        })
    }
    loadJson();
});