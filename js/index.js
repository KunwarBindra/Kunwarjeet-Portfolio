/* ============================================================== */

(function($) {

	"use strict";

	// Init kunwar
	var kunwar = {};

	kunwar.mainContentInActivated = kunwar.mainContentOutActivated = kunwar.sidebarMenuActivated = "home";

	// Toggle Sidebar
	kunwar.toggleSidebar = {
		sidebarWrapper: $('#sidebar-wrapper'),
		overlay: $('#main-content-wrapper > .overlay'),
		isShowSidebar: function(check) {
			if(check==0) {
				this.sidebarWrapper.css({
					'visibility': 'hidden',
					'opacity': 0,
					'transform': 'translateX(-100px)'
				});
			} else if(check==1) {
				this.sidebarWrapper.css({
					'visibility': 'visible',
					'opacity': 1,
					'transform': 'translateX(0)'
				});
			}
		},
		isShowOverlay: function(check) {
			if(check==0) {
				this.overlay.css('display', 'none');
			} else if(check==1) {
				this.overlay.css('display', 'block');
			}
		},
		init: function() {
			// Show or Hide the sidebar depending on the width of the window
			if(window.innerWidth < 992) {
				this.isShowSidebar(0);
				this.isShowOverlay(0);
			} else {
				this.isShowOverlay(0);
				this.isShowSidebar(1);
			}
		}
	};

	// Portfolio Filter
	kunwar.portfolioFilter = {
		// Item container
		container: $('.projects .inner-projects .project-items'),
		// Init function
		init: function() {
			// Checking if all images are loaded
			kunwar.portfolioFilter.container.imagesLoaded(function() {
				// Init isotope once all images are loaded
	            kunwar.portfolioFilter.container.isotope({
	                itemSelector: '.projects .inner-projects .project-items .single-item',
	                layoutMode: 'masonry',
	                transitionDuration: '0.8s'
	            });
	            // Forcing a perfect masonry layout after initial load
	            kunwar.portfolioFilter.container.isotope('layout');
	            // Filter items when the button is clicked
	            $('.projects .inner-projects .project-filters').on('click', 'a', function () {
	            	// Remove the current class from the previous element
	                $('.projects .inner-projects .project-filters .current').removeClass('current');
	                // Add the current class to the button clicked
	                $(this).addClass('current');
	                // Data filter
	                var selector = $(this).attr('data-filter');
	                kunwar.portfolioFilter.container.isotope({
	                    filter: selector
	                });
	                setTimeout(function () {
	                    kunwar.portfolioFilter.container.isotope('layout');
	                }, 6);
	                return false;
	            });
	        });
	    } 
	};

	// Completed Counting
	kunwar.completedCounting = {
		skillProgress: 0,
		funFact: 0
	};

	// Pre Load
	kunwar.preLoad = function(duration) {
		$('#pre-load').fadeOut(parseInt(duration));
	};

	// Replace Viewport Height
	// Solves the issue about the viewport height on mobile devices as when the page loads
	kunwar.replaceVHeight = function() {
		$('html').css({
			'height': $(window).height()
		});
	};

	// Use TypeIt.js
	kunwar.useTypeIt = function() {
		if(typeof TypeIt != 'undefined') {
			new TypeIt('#sidebar-wrapper #head-sidebar .passion', {
				speed: 200,
		        startDelay: 300,
		        strings: ['Frontend Development', 'Embedded Systems', 'Hardware Design'],
		        breakLines: false,
		        loop: true
			});
		} else {
			return false;
		}
	};

	// Theme Switch
	kunwar.themeSwitch = function() {
		$('html').addClass('transition');
		window.setTimeout(function() {
			$('html').removeClass('transition');
		}, 750);
	};

	// Current time
	let currentDate = new Date();
	let currentTime = currentDate.getTime();
	
	// Specific time (e.g., 2:00 PM)
	let specificTime = new Date();
	specificTime.setHours(19, 0, 0, 0); // Set to 2:00 PM

	if(currentTime < specificTime){
		kunwar.themeSwitch();
		$('html').attr('data-theme', 'light');
		$('#checkbox-theme-switch').attr('checked', false);
	} else {
		kunwar.themeSwitch();
		$('html').attr('data-theme', 'dark');
		$('#checkbox-theme-switch').attr('checked', true);
	}

	// Combo Box Theme Switch
	kunwar.comboBoxThemeSwitch = function() {
		var cBoxThemeSwitch = $('.theme-switch input[id="checkbox-theme-switch"]');
		cBoxThemeSwitch.on('change', function() {
			if($(this)[0].checked) {
				kunwar.themeSwitch();
				$('html').attr('data-theme', 'dark');
			} else {
				kunwar.themeSwitch();
				$('html').attr('data-theme', 'light');
			}
		});
	};

	// Use Magnific Popup
	kunwar.useMagnificPopup = function() {
		// For portfolio item
		$('#portfolio .projects .inner-projects .project-items .item-wrapper .overlay').magnificPopup({
			delegate: 'a',
			type: 'inline',
			removalDelay: 300,
			mainClass: 'mfp-fade',
			fixedContentPos: true,
		    callbacks: {
		    	beforeOpen: function() { 
		    		$('html').addClass('mfp-helper'); 
		    	},
		    	close: function() { 
		    		$('html').removeClass('mfp-helper'); 
		    	}
		  	}
		});
	};

	// Skill Progress
	kunwar.skillProgress = function() {
		if(kunwar.completedCounting.skillProgress == 0) {
			$('.skills .single-skill').each(function() {
				var percent = $(this).find('.percentage').data('percent');
				$(this)
					.find('.percentage')
					.countTo({
						from: 0,
						to: percent,
						speed: 1750
					});
				$(this)
					.find('.progress-wrapper .progress')
					.css({
						'width': percent + '%',
						'transition': 'width 1.75s linear'
					});
			});
			kunwar.completedCounting.skillProgress = 1;
		}
	};

	// Counting Fun Fact Value
	kunwar.countingFunFactVal = function() {
		if(kunwar.completedCounting.funFact == 0) {
			$('.fun-facts .content .inner-fun-facts .single-fun-fact .fun-fact-value').each(function() {
				var thisVal = $(this).attr('data-value');
				$(this).countTo({
					from: 0,
					to: thisVal,
					speed: 2000
				});
			});
			kunwar.completedCounting.funFact = 1;
		}
	};

	// Sidebar Menu Button
	kunwar.sidebarMenuButton = function() {
		$('#body-sidebar ul').on('click', 'li', function() {
			var prevSidebarMenu = kunwar.sidebarMenuActivated,
				prevMainContentOut = kunwar.mainContentOutActivated,
				targetIn = $(this)[0].dataset.target,
				targetOut = kunwar.mainContentInActivated;

			if(window.innerWidth < 992) {
				kunwar.toggleSidebar.isShowSidebar(0);
				kunwar.toggleSidebar.isShowOverlay(0);
			}

			if(targetIn != targetOut) {
				if(prevSidebarMenu=="home") {
					$(".main-content#home .body-content .inner-body-content .social-media li").css("transition", "none");
				} else {
					$(".main-content#home .body-content .inner-body-content .social-media li").css("transition", "0.4s ease-in-out");
				}

				$('#body-sidebar ul li[data-target="' + prevSidebarMenu + '"]').removeClass("active");
				$("#" + prevMainContentOut).removeClass("scaleDownCenter");
				$("#" + targetOut).removeClass("scaleUpCenter active");

				$(this).addClass("active");
				$("#" + targetOut).addClass("scaleDownCenter");
				$("#" + targetIn).addClass("scaleUpCenter active");

				kunwar.sidebarMenuActivated = $(this)[0].dataset.target;
				kunwar.mainContentOutActivated = targetOut;
				kunwar.mainContentInActivated = targetIn;
			}

			if(targetIn=='resume') {
				kunwar.skillProgress();
			}
		});
	};

	// Sidebar Overflowing
	kunwar.sidebarOverflowing = function() {
		var sidebarWrapper = $('#sidebar-wrapper')[0],
			sidebarBody = $('#body-sidebar');
		if(window.innerWidth >= 992) {
			if(sidebarWrapper.scrollHeight > sidebarWrapper.clientHeight) {
				$('#main-content-wrapper > div').css("paddingLeft", "25px");
				sidebarBody.css("paddingRight", "30px");
			} else {
				$('#main-content-wrapper > div').css("paddingLeft", 0);
				sidebarBody.css("paddingRight", "25px");
			}
		} else {
			$('#main-content-wrapper > div').css("paddingLeft", 0);
			sidebarBody.css("paddingRight", "30px");
		}
	}

	// About Content Scrolling
	kunwar.aboutContentScrolling = function() {
		$('.main-content#about .body-content .inner-body-content').on('scroll', function() {
			if($(this).scrollTop() + $(this).height() - 120 > $('.fun-facts .content .inner-fun-facts .single-fun-fact .fun-fact-value').offset().top) {
				kunwar.countingFunFactVal();	
			}
		});
	};

	// Contact Me Button
	kunwar.contactMeButton = function() {
		$('#contact-me-button').on('click', function() {
			var prevSidebarMenu = kunwar.sidebarMenuActivated,
				prevMainContentOut = kunwar.mainContentOutActivated,
				targetIn = $(this)[0].dataset.target,
				targetOut = kunwar.mainContentInActivated;

			$('#body-sidebar ul li[data-target="' + prevSidebarMenu + '"]').removeClass("active");
			$("#" + prevMainContentOut).removeClass("scaleDownCenter");
			$("#" + targetOut).removeClass("scaleUpCenter active");

			$('#body-sidebar ul li[data-target="' + targetIn + '"]').addClass("active");
			$("#" + targetOut).addClass("scaleDownCenter");
			$("#" + targetIn).addClass("scaleUpCenter active");

			kunwar.sidebarMenuActivated = $(this)[0].dataset.target;
			kunwar.mainContentOutActivated = targetOut;
			kunwar.mainContentInActivated = targetIn;

			return false;
		});
	};

	// Hamburger Menu On Click
	kunwar.hamburgerMenu = function() {
		$('.hamburger-menu').on('click', function() {
			kunwar.toggleSidebar.isShowSidebar(1);
			kunwar.toggleSidebar.isShowOverlay(1);
		});
	};

	// Close Button On Click
	kunwar.closeButton = function() {
		$('#head-sidebar .close-button, #main-content-wrapper > .overlay').on('click', function() {
			kunwar.toggleSidebar.isShowSidebar(0);
			kunwar.toggleSidebar.isShowOverlay(0);
		});
	};

	// Process Contact Form
	kunwar.processContactForm = function() {
		var form = $('form[name="contact"]'),
			message = $('.contact-form .alert'),
			formData;

		// Success Function
		var doneFunc = function(response) {
			message.text(response);
			message
				.removeClass('alert-danger')
				.addClass('alert-success')
				.fadeIn(1500);
			setTimeout(function() {
				message.fadeOut();
			}, 3000);
			form.find('input:not([type="submit"]), textarea').val('');
		};

		// Fail Function
		var failFunc = function(jqXHR, textStatus, errorThrown) {
			if(jqXHR.status === 400) {
				message.text(jqXHR.responseText);
			} else {
				message.text(jqXHR.statusText);
			}
			message
				.removeClass('alert-success')
				.addClass('alert-danger')
				.fadeIn(1500);
			setTimeout(function() {
				message.fadeOut();
			}, 3000);
		};

		// Form On Submit 
		form.on('submit', function(e) {
			e.preventDefault();
			formData = $(this).serialize();
			$.ajax({
				type: 'POST',
				url: form.attr('action'),
				data: formData
			})
			.done(doneFunc)
			.fail(failFunc);
		});
	};

	// Window On Resize
	$(window).on('resize', function() {
		kunwar.replaceVHeight(),
		kunwar.toggleSidebar.init(),
		kunwar.sidebarOverflowing();
	});

	// Device Orientation Changes
	window.addEventListener("orientationchange", function() {
		kunwar.portfolioFilter.container.isotope('layout');
	}, false);

	// Window On Load 
	$(window).on('load', function() {
		kunwar.preLoad(800);
	});

    // Document ready
    $(document).ready(function() {
    	kunwar.replaceVHeight(),
    	kunwar.sidebarOverflowing(),
    	kunwar.comboBoxThemeSwitch(),
    	kunwar.portfolioFilter.init(),
    	kunwar.useTypeIt(),
    	kunwar.contactMeButton(),
    	kunwar.toggleSidebar.init(),
    	kunwar.hamburgerMenu(),
    	kunwar.closeButton(),
    	kunwar.aboutContentScrolling(),
    	kunwar.sidebarMenuButton(),
    	kunwar.useMagnificPopup(),
    	kunwar.processContactForm();
    });

})(jQuery);