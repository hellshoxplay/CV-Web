(function ( $ ){

	'use strict';
	
	
	// Animate Name on nav bar 
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*		
	if ( $('#home').length > 0 ){
		var flag = false;
		$(window).scroll(function() {
			var $nav = $('#home .navbar-default'); 
			//var navPos = $nav.offset().top;
			var topOfWindow = $(window).scrollTop();
			var heightScreen = $(window).height();	
			
			if ( topOfWindow > heightScreen ) {				
				$nav.addClass('fixed-nav');
				flag = true; 
			
			} else {
				$nav.removeClass('fixed-nav');
			} 
			
		});
	}
	

	// Menu navigation scroll animation
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*		
	var lastId,
		topMenu = $('.navbar-default'),
		topMenuHeight = topMenu.outerHeight() + 0,
		// All list items
		menuItems = topMenu.find("a"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function(){
		  var item = $($(this).attr("href"));
		  if (item.length) { return item; }
		});
	
	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e){
	  var href = $(this).attr("href"),
		  offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
	  $('html, body').stop().animate({ 
		  scrollTop: offsetTop
	  }, 300);
	  //When screen is less than 767
	  if ($(window).width()<767){
	  	$('.navbar-toggle').click();
	  }
	  
	  e.preventDefault();
	});
	
	$('.link-more').click(function(e){
	  var href = $(this).attr("href"),
		  offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
	  $('html, body').stop().animate({ 
		  scrollTop: offsetTop
	  }, 300);

	  e.preventDefault();
	});
	
	// Resize
	$(window).resize(function(){
		topMenu = $('.navbar-default');
		topMenuHeight = topMenu.outerHeight() + 0;
		
		// All list items
		menuItems = topMenu.find("a"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function(){
		  var item = $($(this).attr("href"));
		  if (item.length) { return item; }
		});
	})
	
	var widthThumb = widthThumbnail();
	$('.container-portfolio img').width( widthThumb );
	
	var heightThumb = heightThumbnail();
	$('.container-portfolio .element .text').height( heightThumb ); 
	
	var fontSizeThumb = fontSize() + '%';
	$('.text h3').css({'font-size': fontSizeThumb});
	
	function widthThumbnail(){		
		var widthScreen = $(window).width();
		var nElements = $(window).width() > 1200 ? 5 : $(window).width() > 1000 ? 4 : $(window).width() > 800 ? 3 : $(window).width() > 480 ? 2 : 1;
		return ( parseInt( widthScreen / nElements, 10) );
	}
	
	function heightThumbnail(){
		heightThumb = $('.thumb img').height();
		return ( heightThumb );
	}
	
	function fontSize(){
		var widthThumbSize = 381;
		var fontSize = 160;
		var widthThumbNow = widthThumbnail();
		return ( widthThumbNow * fontSize / widthThumbSize );
	}
	
	// Resize
	$(window).resize(function(){	
		widthThumb = widthThumbnail();	
		$('.container-portfolio img').width( widthThumb );
		
		heightThumb = heightThumbnail();
		 $('.container-portfolio .element .text').outerHeight( heightThumb ); 
		 
		var fontSizeThumb = fontSize() + '%';
		$('.text h3').css({'font-size': fontSizeThumb});
		
	})

	var TimeOut = function resizeTimeOut() {

		$('*[data-filter="*"]').get(0).click();
		widthThumb = widthThumbnail();	
		$('.container-portfolio img').width( widthThumb );
		
		heightThumb = heightThumbnail();
		 $('.container-portfolio .element .text').outerHeight( heightThumb ); 
		 
		var fontSizeThumb = fontSize() + '%';
		$('.text h3').css({'font-size': fontSizeThumb});
		
	}
	setTimeout(TimeOut, 1000);
	
	/*$('.element').hover(function(){
		$(this).find('.thumb').stop().animate({ marginTop: - heightThumb + 'px' });
		$(this).find('.text').stop().animate({ bottom: - heightThumb + 'px' });
	}, function(){
		$(this).find('.thumb').stop().animate({ marginTop: '0px' });
		$(this).find('.text').stop().animate({ bottom: '0px' });
	})*/
	
	// Bind to scroll
	$(window).scroll(function(){
	   // Get container scroll position
	   var fromTop = $(this).scrollTop()+topMenuHeight;
	   
	   // Get id of current scroll item
	   var cur = scrollItems.map(function(){
		 if ($(this).offset().top < fromTop)
		   return this;
	   });
	   // Get the id of the current element
	   cur = cur[cur.length-1];
	   var id = cur && cur.length ? cur[0].id : "";
	   
	   if (lastId !== id) {
		   lastId = id;
		   // Set/remove active class
		   menuItems
			 .parent().removeClass("active")
			 .end().filter("[href=#"+id+"]").parent().addClass("active");
	   }                   
	});


	// Get internet explorer version
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*	
	function getInternetExplorerVersion()
	// Returns the version of Internet Explorer or a -1
	// (indicating the use of another browser).
	{
	  var rv = -1; // Return value assumes failure.
	  if (navigator.appName == 'Microsoft Internet Explorer')
	  {
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
		  rv = parseFloat( RegExp.$1 );
	  }
	  return rv;
	}

	
	// On hover thumbnail
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*	
	$('.item-content').hover(function(){ 
		$(this).find('.img-hover').removeClass('bounceOut').addClass('animated bounceIn show');
	}, function(){
		if (getInternetExplorerVersion < 9 ){
			$(this).find('.img-hover').removeClass('bounceIn').addClass('bounceOut'); 
		} else {
			$(this).find('.img-hover').removeClass('animated bounceIn show'); 
		}
	})
	
	// Initialize isotope
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*	
	 var $container = $('#container');
      
     $container.isotope({
		 layoutMode : 'fitRows',		 
        itemSelector: '.element'
		
     });

	 // filter items when filter link is clicked
	 $('#filters li a').click(function(){
		$('#filters').find('.active').removeClass('active');	
		$(this).parent().addClass('active');
		
		var selector = $(this).attr('data-filter');
		$container.isotope({ filter: selector }, function(){
			$('body').scrollspy('refresh');
		});
		
		return false;
	  });
	   

	   
	

	
	// Show smooth navigation for progressbars and mapcanvas 
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*	
		
	$('.progress').on('inview', function(event, isInView, visiblePartY) {
		if (isInView) {
			$(this).addClass('inview');
		}
	});
			
	$('#map_canvas').one('inview', function(event, isInView, visiblePartY) {			
		if ( typeof(lat) !== "undefined" || typeof(lng) !== "undefined"){	
			initialize(lat, lng);
		}
	});
	
	
	// Initialize map
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*		
	function initialize(lat, lng) {		
		var myOptions = {
		  zoom: 16,
		  center: new google.maps.LatLng(lat, lng),
		  mapTypeId: google.maps.MapTypeId.ROADMAP,
		  scrollwheel: false,
		  mapTypeControl: false,
		  scaleControl: false,
		  styles: // Styling google maps
			[
			  {
				"featureType": "water",
				"stylers": [
				  { "color": "#cccccc" }
				]
			  },{
				"featureType": "transit",
				"stylers": [
				  { "visibility": "off" }
				]
			  },{
				"featureType": "road.highway",
				"elementType": "geometry.fill",
				"stylers": [
				  { "visibility": "on" },
				  { "color": "#d5d5d5" }
				]
			  },{
				"featureType": "road.highway",
				"elementType": "geometry.fill"  },{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
				  { "hue": "#ffffff" },
				  { "saturation": -100 },
				  { "lightness": 1 }
				]
			  },{
				"featureType": "road.highway.controlled_access",
				"elementType": "labels.text",
				"stylers": [
				  { "visibility": "on" },
				  { "hue": "#ffffff" },
				  { "lightness": -1 },
				  { "gamma": 1.02 },
				  { "weight": 0.1 }
				]
			  },{
				"featureType": "road.arterial",
				"elementType": "geometry.fill",
				"stylers": [
				  { "visibility": "on" },
				  { "color": "#eeeeee" }
				]
			  },{
				"featureType": "road.arterial",
				"elementType": "labels.text",
				"stylers": [
				  { "weight": 0.1 },
				  { "visibility": "on" }
				]
			  },{
				"featureType": "road.highway",
				"elementType": "labels.text",
				"stylers": [
				  { "weight": 0.1 },
				  { "visibility": "on" },
				  { "color": "#333333" }
				]
			  },
			   {
				"featureType": "road.highway",
				"elementType": "labels.text.fill",
				"stylers": [
				  { "visibility": "off" },
				  { "weight": 0.1 }
				]
			  },
			  
			  {
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
				  { "color": "#dbdadb" },
				  { "visibility": "on" }
				]
			  },{
			  }
			]
		};
		
		var map = new google.maps.Map( document.getElementById("map_canvas"), myOptions );	
		
		var myLatLng = new google.maps.LatLng(lat, lng);
		var beachMarker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			icon: gIcon
		});
	}
	

	// Lightbox
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*	
	var screenWidth, marginLeft;
	
	var stateObj = {foo: "bar"};
    var pathname = window.location.pathname;
	
	function AnimateLightBox( poplink, postWidth ){
		
		var contentWidth = postWidth ? 0.62 : 0.75; 
		
		if ( postWidth ) {
			screenWidth = ($(window).width() * contentWidth) > 770 ?  770 : $(window).width() * contentWidth;
		} else {
			screenWidth = ($(window).width() * contentWidth) > 770 ?  770 : $(window).width() * contentWidth;
		}
		
		marginLeft =  ((screenWidth) / 2);
		
		// Change the url of the page to the one in the post
		history.pushState( stateObj, 'page', poplink );
				
		$('body').append('<div class="overlay" /><div class="overlay-container" />').addClass('noscroll');
		
		$('.overlay').animate({ opacity : '1' },'fast', function(){
			
			$('.overlay-container').append('<div class="popup-back load-lightbox" /><div class="close-btn"><span class="left"></span><span class="right"></span></div><div class="popup" /> ');

			$.ajax({
				url: poplink,
				data: {},
				cache: false,
				success: function(data){
					// Change the url of the page to the one in the post
					history.pushState( stateObj, 'page', poplink );			
					
					$('.popup').empty().css({marginLeft : -marginLeft + 'px',  width : screenWidth + 'px'});
					
					if ( $(window).width() > 940 ){
						$('.popup').addClass('animated bounceInDown')
					} else {
						$('.popup').animate({top: '+=100', opacity: 1}, 'fast','swing');
					}
					
					$('.popup-back').removeClass('load-lightbox');
					// Get the information from the portfolio div
					$('.popup').html($(data).find('.content-element')).fadeIn();				
					
					$('.popup-back, .close-btn').on ('click touchend',  function(e){
						
						$('.popup').animate({top: '-=140', opacity: 0}, 'fast','linear', function(){
							$('.overlay-container, .overlay').fadeOut('fast',function(){
						
								$(this).remove();
								$('body').removeClass('noscroll');
							});
														
							history.pushState(stateObj, "page", pathname);
						});
					})						   																
				},
				complete: function(){	
					
					var popHeight = $('.popup').height();
					$('.popup-back').height(popHeight);			
									
					if 	( $('.flexslider').length > 0 ){			
					
					// Flexslider for lightbox		
					  $('.flexslider').fitVids().flexslider({
						animation: "fade",
						smoothHeight: true,
						useCSS: true, 
						touch: true,
						video: true, 
						pauseOnHover: false,
						slideshow: false,
						start: function( slider ){
							
							var sliderHeight = slider.slides.eq(0).height();
							slider.height(sliderHeight);	
									
														
						 }//start
						 						 
					  }); //flexslider
					} else {
					
						if ( $('iframe').length > 0 ){					
					   		$('.media').fitVids();
						}
								
					}
				}
			});//ajax		
		});

	}

	// Testimonial
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*	
	$('.nav-testimonials li a').click(function(e){		
		e.preventDefault();
		var index = $(this).parent().index();
		
		$(this).parent().siblings().removeClass('active');
		$(this).parent().addClass('active');
		
		$('.content-testimonials li').removeClass('active');
		$('.content-testimonials li').eq(index).addClass('active');

	})

	
	// When the user click on thumbnails
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*	
	$('.open-popup').on('click touchend', function(e){
		
		e.preventDefault();
		var postWidth = false;
		
		if ( $(window).width() >= 360 && ( navigator.appName !== 'Microsoft Internet Explorer') ){
			
			e.preventDefault();	
			if ($(this).parents().hasClass('preview') || $(this).parents().hasClass('post_image')){
				postWidth = true;
			} else {
				postWidth = false;
			}
			AnimateLightBox($(this).attr('href'), postWidth);
		} else {
			window.location = $(this).attr('href');
		}
	})
	
	// Send Email 
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*	
	$('form').submit(function(e){
		e.preventDefault();
		$('.loading').show();
		$.post('sendmail.php', $('.form').serialize(), function(data){
			$('.results').html(data);
		}).success(function(){
			$('.loading').hide();
		})
	})
	
	// Flexslider	
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*		
	if ( $('.flexslider').length > 0 ){		
		$('.flexslider').fitVids().flexslider({
			animation: "fade",
			smoothHeight: true,
			useCSS: true,
			pauseOnHover: false,
			touch: true,
			video: true,
			slideshow: false 
	
		});
	}
	
// timeline effects

	// Fit videos not in a slider	
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*	
	$('.media').fitVids();
	

})( jQuery );
