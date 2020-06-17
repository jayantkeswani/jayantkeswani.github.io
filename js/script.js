//------------------------------------- Waiting for the entire site to load ------------------------------------------------//

jQuery(window).load(function() { 
		jQuery("#loaderInner").fadeOut();
		jQuery("#loader").delay(400).fadeOut("slow");
		jQuery("#loaderInner p").removeClass("loading");
				
});





$(document).ready(function(){
	
	
//------------------------------------- Navigation setup ------------------------------------------------//


//--------- Scroll navigation ---------------//


$("#mainNav ul a,.cta a").click(function(e){

	
	var full_url = this.href;
	var parts = full_url.split("#");
	var trgt = parts[1];
	var target_offset = $("#"+trgt).offset();
	var target_top = target_offset.top;
	


	$('html,body').animate({scrollTop:target_top -66}, 800);
		return false;
	
});
//-------------Typewriter effect------------//

	var TxtType = function(el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	};

	TxtType.prototype.tick = function() {
		var i = this.loopNum % this.toRotate.length;
		var fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

		var that = this;
		var delta = 200 - Math.random() * 100;

		if (this.isDeleting) { delta /= 2; }

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}

		setTimeout(function() {
			that.tick();
		}, delta);
	};

	window.onload = function() {
		var elements = document.getElementsByClassName('typewrite');
		for (var i=0; i<elements.length; i++) {
			var toRotate = elements[i].getAttribute('data-type');
			var period = elements[i].getAttribute('data-period');
			if (toRotate) {
				new TxtType(elements[i], JSON.parse(toRotate), period);
			}
		}
		// INJECT CSS
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
		document.body.appendChild(css);
	};


//-------------Highlight the current section in the navigation bar------------//
	var sections = $("section");
		var navigation_links = $("#mainNav a");

		sections.waypoint({
			handler: function(event, direction) {

				var active_section;
				active_section = $(this);
				if (direction === "up") active_section = active_section.prev();

				var active_link = $('#mainNav a[href="#' + active_section.attr("id") + '"]');
				navigation_links.removeClass("active");
				active_link.addClass("active");

			},
			offset: '35%'
		});
		
		
//------------------------------------- End navigation setup ------------------------------------------------//




//----------------------------------  quote -----------------------------------------//

$('.testimoniaContainer .testimonialContent .icoQuote').css({opacity:0.2});

//---------------------------------- End  quote-----------------------------------------//



//------------------------------ Sorting portfolio elements with quicksand plugin- ----------------------------//


//------------------------------ MagnificPopup ----------------------------//

		$('a.prev').magnificPopup({
		  type: 'image'
		});
		

//-------------------------- End magnificPopup ----------------------------//


	var $portfolioClone = $('.portfolio').clone();

	$('.filter a').click(function(e){
		$('.filter li').removeClass('current');	
		var $filterClass = $(this).parent().attr('class');
		if ( $filterClass == 'all' ) {
			var $filteredPortfolio = $portfolioClone.find('li');
		} else {
			var $filteredPortfolio = $portfolioClone.find('li[data-type~=' + $filterClass + ']');
		}
		$('.portfolio').quicksand( $filteredPortfolio, { 
			duration: 800,
			easing: 'easeInOutQuad' 
		}, function(){
			


//------------------------------ Reinitilaizing magnificPopup ----------------------------//

		$('a.prev').magnificPopup({
		  type: 'image',
		  gallery:{
		    enabled:true
		  }
		});
		

//-------------------------- End einitilaizing magnificPopup ----------------------------//

		});


		$(this).parent().addClass('current');
		e.preventDefault();
	});

//--------------------------------- End sorting portfolio elements with quicksand plugin--------------------------------//



//---------------------------------- Form validation-----------------------------------------//




$('#submit').click(function(){ 

	$('input#name').removeClass("errorForm");
	$('textarea#message').removeClass("errorForm");
	$('input#email').removeClass("errorForm");
	
	var error = false; 
	var name = $('input#name').val(); 
	if(name == "" || name == " ") { 
		error = true; 
		$('input#name').addClass("errorForm");
	}
	
	
		var msg = $('textarea#message').val(); 
		if(msg == "" || msg == " ") {
			error = true;
			$('textarea#message').addClass("errorForm");
			
		}
	
	var email_compare = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i; 
	var email = $('input#email').val(); 
	if (email == "" || email == " ") { 
		$('input#email').addClass("errorForm");
		error = true;
	}else if (!email_compare.test(email)) { 
		$('input#email').addClass("errorForm");
		error = true;
	}

	if(error == true) {
		return false;
	}

	var data_string = $('.contactForm form').serialize(); 
	

	$.ajax({
		type: "POST",
		url: $('.contactForm form').attr('action'),
		data: data_string,
		
		success: function(message) {
				if(message == 'SENDING'){
					$('#success').fadeIn('slow');
				}
				else{
					$('#error').fadeIn('slow');
				}
					}
					
					
					
	});

	return false; 
});



//---------------------------------- End form validation-----------------------------------------//


//--------------------------------- Mobile menu --------------------------------//


var fade=false;
$('.mobileBtn').click(function() {
		if(fade==false){
        	$('#mainNav ul').slideDown("slow");
			$('#mainNav ul').css({"display":"block"});
			fade=true;
			return false;
			
		}else{
		
			$('#mainNav ul').slideUp("faste");
			fade=false;
			return false;	
		}
});


//--------------------------------- End mobile menu --------------------------------//


//--------------------------------- Parallax --------------------------------//

$("#teaser").parallax("100%", 0.3);	
$(".testimoniaContainer").parallax("100%", 0.3);


//--------------------------------- End parallax --------------------------------//


//---------------------------------- Testimonials -----------------------------------------//

$('.testimoniaContainer').slides({
	preload: false,
	generateNextPrev: false,
	play: 6500,
	container: 'testimonialContent'
});


//---------------------------------- End testimonial -----------------------------------------//


//---------------------------------- Text animation -----------------------------------------//

$(".rotate").textrotator({
        animation: "fade",
		separator: ",",
    	speed: 2000
});



$(".loading").textrotator({
        animation: "fade",
    	speed: 1000
});


//---------------------------------- End text animation -----------------------------------------//


//--------------------------------- Twitter feed --------------------------------//


jQuery(".tweets").tweet({
  join_text: false,
  username: "KeswaniJayant", // Change username here
  modpath: './twitter/',
  avatar_size: false,
  count: 1,
  auto_join_text_default: ' we said, ',
  auto_join_text_ed: ' we ',
  auto_join_text_ing: ' we were ',
  auto_join_text_reply: ' we replied to ',
  auto_join_text_url: ' we were checking out ',
  loading_text: 'Loading tweets...'

});



//--------------------------------- End twitter feed --------------------------------//



//--------------------------------- To the top handler --------------------------------//

$().UItoTop({ easingType: 'easeOutQuart' });

//--------------------------------- End to the top handler --------------------------------//



});

