(function() {
  var __sections__ = {};
  (function() {
    for(var i = 0, s = document.getElementById('sections-script').getAttribute('data-sections').split(','); i < s.length; i++)
      __sections__[s[i]] = true;
  })();
  (function() {
  if (!__sections__["brands"] && !window.DesignMode) return;
  try {
    
function process_slick_event(evt) {
      var carousel = $('[data-owl]');
      if (carousel.length) {
         carousel.each(function(index, el) {
            $(this).owlCarousel($(this).data('owl'));
         });
	  }
}    
$(document)
 .on( 'shopify:section:load', process_slick_event )
 .on( 'shopify:section:unload', process_slick_event )
;

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["homepage-block-trending"] && !window.DesignMode) return;
  try {
    
function process_slick_event(evt) {
      var carousel = $('[data-owl]');
		  carousel = $('.widget-trending-product .products-grid');
      if (carousel.length) {
         carousel.each(function(index, el) {
            $(this).owlCarousel($(this).data('owl'));
         });
	  }
}    
$(document)
 .on( 'shopify:section:load', process_slick_event )
 .on( 'shopify:section:unload', process_slick_event )
;

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["lookbook"]) return;
  try {
    
function process_slick_event(evt) {
  var _slick = $( "#" +evt.target.id + " .lookbook_page .single-item");
  if( _slick.length )
  {
    switch ( evt.originalEvent.type ) {
      case "shopify:section:load" : 
        console.log('Load ' + _slick.attr("id"));
        _slick.slick (
            {
              dots: true,
     		 slidesToScroll: 1,
      		 
              autoplay: _slick.data('slick').autoplay,
              autoplaySpeed: _slick.data('slick').autoplaySpeed
            }
          );
      break; 
      case "shopify:section:unload" :
        console.log('Unload ' + _slick.attr("id"));
        _slick.slick('unslick');
      break;

     } 
  }
}
    
$(document)
 .on( 'shopify:section:load', process_slick_event )
 .on( 'shopify:section:unload', process_slick_event )
;


  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["slideshow"] && !window.DesignMode) return;
  try {
    
function process_slick_event(evt) {
  var _slick = $( "#" +evt.target.id + " .home-slideshow .variable-width");
  if( _slick.length )
  {
    switch ( evt.originalEvent.type ) {
      case "shopify:section:load" : 
        console.log('Load ' + _slick.attr("id"));
        _slick.slick (
            {
              dots: true,
     		 slidesToScroll: 1,
      		 
              autoplay: _slick.data('slick').autoplay,
              autoplaySpeed: _slick.data('slick').autoplaySpeed
            }
          );
      break; 
      case "shopify:section:unload" :
        console.log('Unload ' + _slick.attr("id"));
        _slick.slick('unslick');
      break;

     } 
  }
}
    
$(document)
 .on( 'shopify:section:load', process_slick_event )
 .on( 'shopify:section:unload', process_slick_event )
;


  } catch(e) { console.error(e); }
})();

})();
