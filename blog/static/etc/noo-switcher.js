jQuery( document ).ready( function ($) {
	$('.noo-sw-style-selector-toggle').click(function(e){
		e.preventDefault();
		$('.noo-sw-style-selector').toggleClass('opened');
	});

	$('.noo-sw-demo-screenshot').each( function() {
		var $screenshot = $(this);
		$screenshot.offset( $screenshot.offset() );
	} );
	$('.noo-sw-demo').on( 'mouseenter', function() {
		var $this = $(this);
		var $screenshot = $(this).children( '.noo-sw-demo-screenshot' );
		$screenshot.addClass( 'opened' );
		var s_top = $this.offset().top + $this.height() - 370;
		if ( s_top < 0 ) s_top = $this.offset().top;
		$screenshot.offset( {
			left: $this.closest( '.noo-sw-style-selector' ).offset().left - 420 + 5,
			top: s_top
		} );
	} );
	$('.noo-sw-demo').on( 'mouseleave', function() {
		$(this).children( '.noo-sw-demo-screenshot' ).removeClass( 'opened' );
	} );
});