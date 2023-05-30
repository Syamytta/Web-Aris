
(function ($) {
    "use strict";

    /*[ Load page ]
    ===========================================================*/
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="loader05"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'html',
        transition: function(url){ window.location.href = url; }
    });
    
    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height()/2;

    $(window).on('scroll',function(){
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display','flex');
        } else {
            $("#myBtn").css('display','none');
        }
    });

    $('#myBtn').on("click", function(){
        $('html, body').animate({scrollTop: 0}, 300);
    });
    

    /*==================================================================
    [ Fixed Header ]*/
    var headerDesktop = $('.container-menu-desktop');
    var wrapMenu = $('.wrap-menu-desktop');

    if($('.top-bar').length > 0) {
        var posWrapHeader = $('.top-bar').height();
    }
    else {
        var posWrapHeader = 0;
    }
    

    if($(window).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top',0); 
    }  
    else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
    }

    $(window).on('scroll',function(){
        if($(this).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top',0); 
        }  
        else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
        } 
    });


    /*==================================================================
    [ Menu mobile ]*/
    $('.btn-show-menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu-m');

    for(var i=0; i<arrowMainMenu.length; i++){
        $(arrowMainMenu[i]).on('click', function(){
            $(this).parent().find('.sub-menu-m').slideToggle();
            $(this).toggleClass('turn-arrow-main-menu-m');
        })
    }

    $(window).resize(function(){
        if($(window).width() >= 992){
            if($('.menu-mobile').css('display') == 'block') {
                $('.menu-mobile').css('display','none');
                $('.btn-show-menu-mobile').toggleClass('is-active');
            }

            $('.sub-menu-m').each(function(){
                if($(this).css('display') == 'block') { console.log('hello');
                    $(this).css('display','none');
                    $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                }
            });
                
        }
    });


    /*==================================================================
    [ Show / hide modal search ]*/
    $('.js-show-modal-search').on('click', function(){
        $('.modal-search-header').addClass('show-modal-search');
        $(this).css('opacity','0');
    });

    $('.js-hide-modal-search').on('click', function(){
        $('.modal-search-header').removeClass('show-modal-search');
        $('.js-show-modal-search').css('opacity','1');
    });

    $('.container-search-header').on('click', function(e){
        e.stopPropagation();
    });


    /*==================================================================
    [ Isotope ]*/
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-tope-group');

    // filter items on button click
    $filter.each(function () {
        $filter.on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({filter: filterValue});
        });
        
    });

    // init Isotope
    $(window).on('load', function () {
        var $grid = $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows',
                percentPosition: true,
                animationEngine : 'best-available',
                masonry: {
                    columnWidth: '.isotope-item'
                }
            });
        });
    });

    var isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function(){
        $(this).on('click', function(){
            for(var i=0; i<isotopeButton.length; i++) {
                $(isotopeButton[i]).removeClass('how-active1');
            }

            $(this).addClass('how-active1');
        });
    });

    /*==================================================================
    [ Filter / Search product ]*/
    $('.js-show-filter').on('click',function(){
        $(this).toggleClass('show-filter');
        $('.panel-filter').slideToggle(400);

        if($('.js-show-search').hasClass('show-search')) {
            $('.js-show-search').removeClass('show-search');
            $('.panel-search').slideUp(400);
        }    
    });

    $('.js-show-search').on('click',function(){
        $(this).toggleClass('show-search');
        $('.panel-search').slideToggle(400);

        if($('.js-show-filter').hasClass('show-filter')) {
            $('.js-show-filter').removeClass('show-filter');
            $('.panel-filter').slideUp(400);
        }    
    });




    /*==================================================================
    [ Cart ]*/
    $('.js-show-cart').on('click',function(){
        $('.js-panel-cart').addClass('show-header-cart');
    });

    $('.js-hide-cart').on('click',function(){
        $('.js-panel-cart').removeClass('show-header-cart');
    });

    /*==================================================================
    [ Cart ]*/
    $('.js-show-sidebar').on('click',function(){
        $('.js-sidebar').addClass('show-sidebar');
    });

    $('.js-hide-sidebar').on('click',function(){
        $('.js-sidebar').removeClass('show-sidebar');
    });

    /*==================================================================
    [ +/- num product ]*/
    $('.btn-num-product-down').on('click', function(){
        var numProduct = Number($(this).next().val());
        if(numProduct > 0) $(this).next().val(numProduct - 1);
    });

    $('.btn-num-product-up').on('click', function(){
        var numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
    });

    /*==================================================================
    [ Rating ]*/
    $('.wrap-rating').each(function(){
        var item = $(this).find('.item-rating');
        var rated = -1;
        var input = $(this).find('input');
        $(input).val(0);

        $(item).on('mouseenter', function(){
            var index = item.index(this);
            var i = 0;
            for(i=0; i<=index; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });

        $(item).on('click', function(){
            var index = item.index(this);
            rated = index;
            $(input).val(index+1);
        });

        $(this).on('mouseleave', function(){
            var i = 0;
            for(i=0; i<=rated; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });
    });
    
    /*==================================================================
    [ Show modal1 ]*/

    // DCI

    // classic series
    $('.js-show-modal11a').on('click',function(e){
        e.preventDefault();
        $('.js-modal11a').addClass('show-modal11a');
    });
    $('.js-hide-modal11a').on('click',function(){
        $('.js-modal11a').removeClass('show-modal11a');
    });

    $('.js-show-modal11b').on('click',function(e){
        e.preventDefault();
        $('.js-modal11b').addClass('show-modal11b');
    });
    $('.js-hide-modal11b').on('click',function(){
        $('.js-modal11b').removeClass('show-modal11b');
    });

    $('.js-show-modal11c').on('click',function(e){
        e.preventDefault();
        $('.js-modal11c').addClass('show-modal11c');
    });
    $('.js-hide-modal11c').on('click',function(){
        $('.js-modal11c').removeClass('show-modal11c');
    });

    $('.js-show-modal11d').on('click',function(e){
        e.preventDefault();
        $('.js-modal11d').addClass('show-modal11d');
    });
    $('.js-hide-modal11d').on('click',function(){
        $('.js-modal11d').removeClass('show-modal11d');
    });

    // dilltea pureness

    // japanese tea powder
    $('.js-show-modal21a').on('click',function(e){
        e.preventDefault();
        $('.js-modal21a').addClass('show-modal21a');
    });
    $('.js-hide-modal21a').on('click',function(){
        $('.js-modal21a').removeClass('show-modal21a');
    });
//
    $('.js-show-modal21b').on('click',function(e){
        e.preventDefault();
        $('.js-modal21b').addClass('show-modal21b');
    });
    $('.js-hide-modal21b').on('click',function(){
        $('.js-modal21b').removeClass('show-modal21b');
    });
    //
    $('.js-show-modal21c').on('click',function(e){
        e.preventDefault();
        $('.js-modal21c').addClass('show-modal21c');
    });
    $('.js-hide-modal21c').on('click',function(){
        $('.js-modal21c').removeClass('show-modal21c');
    });
    //
    $('.js-show-modal21d').on('click',function(e){
        e.preventDefault();
        $('.js-modal21d').addClass('show-modal21d');
    });
    $('.js-hide-modal21d').on('click',function(){
        $('.js-modal21d').removeClass('show-modal21d');
    });

    // modal 3
    $('.js-show-modal31a').on('click',function(e){
        e.preventDefault();
        $('.js-modal31a').addClass('show-modal31a');
    });
    $('.js-hide-modal31a').on('click',function(){
        $('.js-modal31a').removeClass('show-modal31a');
    });
    //
    $('.js-show-modal31b').on('click',function(e){
        e.preventDefault();
        $('.js-modal31b').addClass('show-modal31b');
    });
    $('.js-hide-modal31b').on('click',function(){
        $('.js-modal31b').removeClass('show-modal31b');
    });
    //
    $('.js-show-modal31c').on('click',function(e){
        e.preventDefault();
        $('.js-modal31c').addClass('show-modal31c');
    });
    $('.js-hide-modal31c').on('click',function(){
        $('.js-modal31c').removeClass('show-modal31c');
    });
    //
    $('.js-show-modal31d').on('click',function(e){
        e.preventDefault();
        $('.js-modal31d').addClass('show-modal31d');
    });
    $('.js-hide-modal31d').on('click',function(){
        $('.js-modal31d').removeClass('show-modal31d');
    });
    //
    $('.js-show-modal31e').on('click',function(e){
        e.preventDefault();
        $('.js-modal31e').addClass('show-modal31e');
    });
    $('.js-hide-modal31e').on('click',function(){
        $('.js-modal31e').removeClass('show-modal31e');
    });
    //
    $('.js-show-modal31f').on('click',function(e){
        e.preventDefault();
        $('.js-modal31f').addClass('show-modal31f');
    });
    $('.js-hide-modal31f').on('click',function(){
        $('.js-modal31f').removeClass('show-modal31f');
    });
    //
    $('.js-show-modal31g').on('click',function(e){
        e.preventDefault();
        $('.js-modal31g').addClass('show-modal31g');
    });
    $('.js-hide-modal31g').on('click',function(){
        $('.js-modal31g').removeClass('show-modal31g');
    });
    
    // modal 4
    $('.js-show-modal12a').on('click',function(e){
        e.preventDefault();
        $('.js-modal12a').addClass('show-modal12a');
    });

    $('.js-hide-modal12a').on('click',function(){
        $('.js-modal12a').removeClass('show-modal12a');
    });


})(jQuery);