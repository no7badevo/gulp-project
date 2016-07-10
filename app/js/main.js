'use strict';

$(document).ready(function(){
	console.log('Hello, world!');

	$(window).load(function() {
	 	// will first fade out the loading animation 
	  	$("#status").fadeOut("slow"); 
	  	// will fade out the whole DIV that covers the website. 
	  	$("#preloader").delay(500).fadeOut("slow").remove();      
	});

	// Show footer year.
	var date = new Date(),
		year = date.getFullYear();

	console.log(year);
	$('#footer__date').text(year);

	//Up To Top
	$('.s-up').on('click', function(e){
		e.preventDefault();

		console.log('ev');	

		$('.scroll-content').mCustomScrollbar("scrollTo",'top',{
			scrollEasing:"easeOut"
		});
	});

	// Site navigation
	$('.main-nav__toggle').on('click', function(e){
		e.preventDefault();
		console.log('Mobile button navigation On click!\n');

		if(!$('.main-nav').hasClass('show-nav')){
			$('.main-nav').addClass('show-nav');
		} else {
			$('.main-nav').removeClass('show-nav');
		}

		$(document).click(function (e) {
		    var container = $('.main-nav');
		    if (container.has(e.target).length === 0){
		        container.removeClass('show-nav');
		    }
		});
	});

	$('.parallax__section').parallax({imageSrc: 'images/img-3.png'});


	//  Tabs 
	$('.work-control__link').on('click', function(e){
		e.preventDefault();
		console.log('Tab button On click! \n');


		// 2.2 data atr html5
		var item = $(this).closest('.work-control__item'),
			contentItem = $('.work-content__item'),
			itemPos = item.data('class');
		
		contentItem.filter('.work-content__item_'+itemPos)
			.add(item)
			.addClass('active')
			.siblings()
			.removeClass('active');
	});
	// ----------------------------------------------------- PLUGINS

	//  Slick slider | Pattern section
	// $('.partner__slider').slick({
	//     slidesToShow: 3,
	//     slidesToScroll: 1,
	//     autoplay: true,
	//     autoplaySpeed: 8000,
	//     infinite: true,
	//     responsive: [
	//         {
	//           breakpoint: 760,
	//           settings: {
	//             slidesToShow: 1,
	//           }
	//         }
	//       ]
	// });

	// FancyBox
	// $(".fancybox").fancybox({
	// 	// fitToView: false,
	// 	padding: 0,
	//     prevEffect		: 'none',
	// 	nextEffect		: 'none',
	// 	closeBtn		: false,
	// 	margin: 50,
	//     helpers : {
	//         overlay : {
	//             css : {
	//                 'background' : 'rgba(0, 0, 0, 0.92)'
	//             }
	//         },
	//         title	: { type : 'inside' },
	//         buttons	: {}
	//     } 
		
	// });



	
});
