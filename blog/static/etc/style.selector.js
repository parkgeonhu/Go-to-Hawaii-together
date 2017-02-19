;jQuery.cookie.defaults.path = selectorL10n.home_url.replace(/^.*\/\/[^\/]+/, '');
(function($){
var demo_assets_url = selectorL10n.home_url + 'wp-content/plugins/noo-jobmonster-demo/assets/images/';
var styleSelector = {
	primary_color: '#e6b706',
	isChanging: false,
	cookieColor: 'noo-selector-color', 
	cookieSkin: 'noo-selector-skin',
	cookieLayout: 'noo-selector-layout',
	cookiePattern: 'noo-selector-pattern',
	cookieOpened: 'noo-selector-opened',
	initialize: function() {
		iThis = this;
		iThis.build();
		iThis.events();
		// Color
		if( typeof $.cookie( iThis.cookieColor ) != "undefined" ) {
			iThis.setColor($.cookie( iThis.cookieColor ));
			$("#colorPickerHolder1").wpColorPicker('color', $.cookie( iThis.cookieColor ));
		} else {
			$("#colorPickerHolder1").wpColorPicker('color', iThis.primary_color);
		}

		// Skin
		if( typeof $.cookie( iThis.cookieSkin ) != "undefined" ) {
			iThis.setSkin( $.cookie( iThis.cookieSkin ) );
		}

		// Layout
		if( typeof $.cookie( iThis.cookieLayout ) != "undefined" ) {
			iThis.setLayout( $.cookie( iThis.cookieLayout ) );
		}

		// Pattern
		if( typeof $.cookie( iThis.cookiePattern ) != "undefined" ) {
			iThis.setPattern( $.cookie( iThis.cookiePattern ) );
		}

		// open Style Selector the first it's loaded
		if( typeof $.cookie( iThis.cookieOpened ) == "undefined" ) {
			iThis.container.addClass("opened");
			$.cookie( iThis.cookieOpened, true, { expires : 3 } );
		}
	},
	build: function() {
		var iThis = this;
		iThis.container = $("#styleSelector");
		// var presetColors = [
		// 	{
		// 		Hex1: iThis.primary_color,
		// 		colorName1: "Soft red"
		// 	},
		// 	{
		// 		Hex1: "#49c9b2",
		// 		colorName1: "Moderate cyan"
		// 	},
		// 	{
		// 		Hex1: "#eb5982",
		// 		colorName1: "Soft pink"
		// 	},
		// 	{
		// 		Hex1: "#4f9fd1",
		// 		colorName1: "Moderate blue"
		// 	},
		// 	{
		// 		Hex1: "#eab129",
		// 		colorName1: "Bright orange"
		// 	},
		// 	{
		// 		Hex1: "#578223",
		// 		colorName1: "Green"
		// 	}
		// ];
		
		// presetColorsEl = iThis.container.find("ul[data-type=colors]");
		// $.each(presetColors, function(index) {
		// 	var colorEl = $("<li />").append($("<a />").css("background-color", presetColors[index].Hex1).attr({
		// 		"data-color-hex1": presetColors[index].Hex1,
		// 		"data-color-name1": presetColors[index].colorName1,
		// 		// "data-color-hex2": presetColors[index].Hex2,
		// 		// "data-color-name2": presetColors[index].colorName2,
		// 		href: "#",
		// 		title: presetColors[index].colorName1
		// 	}));
		// 	presetColorsEl.append(colorEl);
		// });
		// presetColorsEl.find("a").click(function(e) {
		// 	e.preventDefault();
		// 	iThis.setColor($(this).attr("data-color-hex1"));
		// });

		// $("#colorPickerHolder1").ColorPicker({
		// 	color: iThis.primary_color,
		// 	flat: true,
		// 	livePreview: true,
		// 	onChange: function(e, value) {
		// 		iThis.setColor(iThis.primary_color, "#" + value);
		// 	}
		// });
		
		$("#colorPickerHolder1").wpColorPicker( {
			hide: false,
			palettes: ['#ff514a', "#49c9b2", "#eb5982", "#4f9fd1", "#eab129", "#578223"],
			color: iThis.primary_color,
			defaultColor: iThis.primary_color,
			change: function(event, ui) {
				iThis.setColor( ui.color.toCSS() );
			}
		});
		iThis.container.find("div.options-links.layout a").click(function(e) {
			e.preventDefault();
			iThis.setLayout($(this).attr("data-layout"));
		});

		// Background patterns
		var patterns = ["bright_squares", "random_grey_variations", "wild_oliva", "denim", "subtle_grunge", "az_subtle", "straws", "textured_stripes"];
		var patternsOption = iThis.container.find("ul[data-type=patterns]");
		$.each(patterns, function(index, value) {
			var patternEl = $("<li />").append($("<a />").addClass("pattern").css("background-image", "url(" + demo_assets_url + "patterns/" + value + ".png)").attr({
				"data-pattern": value,
				href: "#",
				title: value.charAt(0).toUpperCase() + value.slice(1)
			}));
			patternsOption.append(patternEl);
		});
		patternsOption.find("a").click(function(e) {
			e.preventDefault();
			iThis.setPattern($(this).attr("data-pattern"));
		});

		iThis.container.find("a.reset").click(function(e) {
			e.preventDefault();
			iThis.reset();
		});
	},
	events: function() {
		var iThis = this;
		iThis.container.find(".selector-title a").click(function(e) {
			e.preventDefault();
			if( iThis.container.hasClass("active") ) {
				iThis.container.animate({
					left: "-" + iThis.container.width() + "px"
				}, 300).removeClass("active");
			} else {
				iThis.container.animate({
					left: "0"
				}, 300).addClass("active");
			}
		});
	},
	setColor: function( primary_color ) {
		var iThis = this;
		
		if( iThis.isChanging ) {
			return false;
		}

		iThis.primary_color = primary_color;
		iThis.updateCSS();
		$.cookie( iThis.cookieColor, primary_color );
		$(document).trigger('noo-color-changed');
	},
	setSkin: function(value) {
		var iThis = this;
		// Update buttons status
		var skinOptionEl = iThis.container.find("div.options-links.skin");
		skinOptionEl.find("a.active").removeClass("active");
		skinOptionEl.find("a[data-skin=" + value + "]").addClass("active");

		// Update Inline CSS
		iThis.updateCSS();

		// Update Main External CSS
		$mainCSS = $('#noo-main-style-css');
		cssHref = $mainCSS.attr( 'href');

		if( value === 'dark' ) {
			oldHref = 'noo.css';
			newHref = 'noo-dark.css';
		} else {
			oldHref = 'noo-dark.css';
			newHref = 'noo.css';
		}
		cssHref = cssHref.replace( oldHref, newHref );
		$mainCSS.attr( 'href', cssHref );

		iThis.updateLogo();

		$.cookie( iThis.cookieSkin, value );
	},
	updateLogo: function() {
		var skin = iThis.container.find("div.options-links.skin a.active").attr("data-skin");
		image_url = ( skin === 'dark' ) ? demo_assets_url + 'logo-dark.png' : demo_assets_url + "logo.png";
		image_floating_url = demo_assets_url + "logo-dark.png";

		if( image_url !== '') {
			$('.navbar-brand .noo-logo-img').remove();
			$('.navbar-brand .noo-logo-retina-img').remove();
			$('.navbar-brand').append('<img class="noo-logo-img noo-logo-normal" src="' + image_url + '">');
			$('.navbar-brand').append('<img class="noo-logo-retina-img noo-logo-normal" src="' + image_url + '">');
			$('.navbar-brand').append('<img class="noo-logo-img noo-logo-floating" src="' + image_floating_url + '">');
			$('.navbar-brand').append('<img class="noo-logo-retina-img noo-logo-floating" src="' + image_floating_url + '">');
		}
		$(document).trigger('noo-logo-changed');
	},
	setLayout: function( value ) {
		var iThis = this;
		// Update buttons status
		var layoutOptionEl = iThis.container.find("div.options-links.layout");
		var	patternsEl = iThis.container.find("div.patterns");
		layoutOptionEl.find("a.active").removeClass("active");
		layoutOptionEl.find("a[data-layout=" + value + "]").addClass("active");

		if( "fullwidth" == value ) {
			patternsEl.hide();
			$("body").removeClass('boxed-layout').addClass('full-width-layout');
			$("body").css("background-image", "none");
			$("body").find(".site").removeAttr('style');;
			$.removeCookie("pattern");
		} else {
			patternsEl.show();
			$("body").removeClass('full-width-layout').addClass('boxed-layout');
			$("body").find(".site").css("width", "90%").css("max-width", "1400px");
			if( typeof $.cookie(iThis.cookiePattern) === "undefined" ) {
				// Choose the first pattern
				iThis.container.find("ul[data-type=patterns] li:first a").click();
			}				
		}
		
		$.cookie(iThis.cookieLayout, value);
		//
		$(document).trigger('noo-layout-changed');
		
	},
	setPattern: function( value ) {
		var iThis = this;
		if( $("body").hasClass("boxed-layout") ) {
			$("body").css("background-image", "url(" + demo_assets_url + "patterns/" + value + ".png)")
					.css("background-repeat", "repeat");
			$.cookie(iThis.cookiePattern, value);
		}
		$(document).trigger('noo-pattern-changed');
	},
	updateCSS: function () {
		iThis = this;

		var customized = {
			noo_site_link_color: iThis.primary_color,
		};

		// $(".noo-sw-style-selector-overlay").addClass("opened");
		jQuery.ajax( selectorL10n.ajax_url, {
			type: 'POST',
			data: {
				'noo_customize_ajax': 'on',
				'customized'        : JSON.stringify( customized ),
				'action'            : 'noo_get_customizer_css_design',
				'nonce'             : selectorL10n.customize_live_css,
			},
			success: function ( data ) {
				// Place new css to customizer css
				var $customizeCSS = jQuery( '#noo-customizer-css-design').length ? jQuery( '#noo-customizer-css-design') : jQuery('<style id="noo-customizer-css-design' + '" type="text/css" />').appendTo('head');
				$customizeCSS.text( data );
				jQuery('#noo-customizer-css-design').text( data );
				// $(".noo-sw-style-selector-overlay").removeClass("opened");
			}
		} );
		jQuery.ajax( selectorL10n.ajax_url, {
			type: 'POST',
			data: {
				'noo_customize_ajax': 'on',
				'customized'        : JSON.stringify( customized ),
				'action'            : 'noo_get_customizer_css_header',
			},
			success: function ( data ) {
				// Place new css to customizer css
				jQuery('#noo-customizer-css-header').text( data );
				$(".noo-sw-style-selector-overlay").removeClass("opened");
			}
		} );

	},
	reset: function() {
		var iThis = this;
		$.removeCookie(iThis.cookieColor);
		$.removeCookie(iThis.cookieSkin);
		$.removeCookie(iThis.cookieLayout);
		$.removeCookie(iThis.cookiePattern);
		location.reload();
	},
};

// Don't run on Customize live preview
if( ( typeof nooCustomizerL10n === 'undefined' ) || ( nooCustomizerL10n.is_preview !== "true" ) ) {
	styleSelector.initialize();
}

})(jQuery);