
// A $( document ).ready() block.
$(document).ready(function () {
    $('.carousel').carousel();
    $('.mdb-select').material_select();


    $(".search-mobile").click(function () {
        $(".search-detail").addClass("serch_dect");
        // $(".serch_dect").show(300);
        // $(".block_search .icons-close").show();
    });
    $(".search-detail .icons-close").click(function () {
        $(".search-detail").removeClass("serch_dect");
        // $(".block_search .icons-close").hide();
    });
    //click menu serch mobile trang sub
    $(".search_cate").click(function () {

        // $(".block_search_cate").addClass("serch_dect");
        // $(".block_search_cate .container").css("max-width","100%")
        // $(".block_search_cate .icons-close").show();
        // $(".search-detail__category").
    }); 
    // $(".block_search_cate .icons-close").click(function () {
    //     $(".block_search_cate").removeClass("serch_dect");
    //     $(".block_search_cate .icons-close").hide();
    // });

    
    
    
    
})

