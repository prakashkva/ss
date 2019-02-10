var app_url="https://metizapps.com/wishlist/";

// Get query string variables
let param 		= new URLSearchParams(window.location.search);
let key_exist 	= param.has('key');
let secure_key 	= param.get('key');

// console.log(jQuery.fn.jquery);
if (typeof jQuery == 'undefined' || parseFloat(jQuery.fn.jquery) < 1.9) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = app_url+"assets/js/jquery-1.12.3.min.js";
    script.onload = CookieScript;
    document.getElementsByTagName('head')[0].appendChild(script);
}
else CookieScript();

function CookieScript()
{
	if (typeof Cookies == 'undefined'){
	(function(factory){if(typeof define==="function"&&define.amd){define(factory)}else if(typeof exports==="object"){module.exports=factory()}else{var _OldCookies=window.Cookies;var api=window.Cookies=factory();api.noConflict=function(){window.Cookies=_OldCookies;return api}}})(function(){function extend(){var i=0;var result={};for(;i<arguments.length;i++){var attributes=arguments[i];for(var key in attributes){result[key]=attributes[key]}}return result}function init(converter){function api(key,value,attributes){var result;if(arguments.length>1){attributes=extend({path:"/"},api.defaults,attributes);if(typeof attributes.expires==="number"){var expires=new Date;expires.setMilliseconds(expires.getMilliseconds()+attributes.expires*864e5);attributes.expires=expires}try{result=JSON.stringify(value);if(/^[\{\[]/.test(result)){value=result}}catch(e){}if(!converter.write){value=encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent)}else{value=converter.write(value,key)}key=encodeURIComponent(String(key));key=key.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent);key=key.replace(/[\(\)]/g,escape);return document.cookie=[key,"=",value,attributes.expires&&"; expires="+attributes.expires.toUTCString(),attributes.path&&"; path="+attributes.path,attributes.domain&&"; domain="+attributes.domain,attributes.secure?"; secure":""].join("")}if(!key){result={}}var cookies=document.cookie?document.cookie.split("; "):[];var rdecode=/(%[0-9A-Z]{2})+/g;var i=0;for(;i<cookies.length;i++){var parts=cookies[i].split("=");var name=parts[0].replace(rdecode,decodeURIComponent);var cookie=parts.slice(1).join("=");if(cookie.charAt(0)==='"'){cookie=cookie.slice(1,-1)}try{cookie=converter.read?converter.read(cookie,name):converter(cookie,name)||cookie.replace(rdecode,decodeURIComponent);if(this.json){try{cookie=JSON.parse(cookie)}catch(e){}}if(key===name){result=cookie;break}if(!key){result[name]=cookie}}catch(e){}}return result}api.get=api.set=api;api.getJSON=function(){return api.apply({json:true},[].slice.call(arguments))};api.defaults={};api.remove=function(key,attributes){api(key,"",extend(attributes,{expires:-1}))};api.withConverter=init;return api}return init(function(){})});
     BootStrapScript();
	}else BootStrapScript();
	
	
}
function BootStrapScript(){

	if (typeof $().modal != 'function'){
		
	var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = app_url+"assets/js/bootstrap.min.js"; 

	if(key_exist && param.get('key') != '') { // check key exist or not 
	    script.onload = share_wishlist;
	} else {
	    script.onload = MSWishlistScript;
	}

    document.getElementsByTagName('head')[0].appendChild(script);

	} else {

		if(key_exist && param.get('key') != '') { // check key exist or not 
			share_wishlist();
		} else {
			MSWishlistScript();
		}
	}
}

function MSWishlistScript(){
	var msCookies = Cookies.noConflict();
	var mswishlist=msCookies.get('mswishlist'); 
	var ms_customer_id=jQuery('#ms_customer_id').val();
	setTimeout(function(){ 
	jQuery.ajax({
		type:'POST',
		url:app_url+"viewlist/wishlist",
		datatype:"jsonp",
                async:true,
                crossDomain:true,
		data:{mswishlist:mswishlist,shop:jQuery('#ms_shop').val(),ms_customer_id:ms_customer_id},
		success:function(data){
			jQuery(".mswish_products").html(data);
		     //remove modal
			 jQuery('.mswishlist_removebtn').click(function(){
  
			var pid=jQuery(this).attr('data-productid');
			var vid=jQuery(this).attr('data-variantid');
	 
			jQuery('#mswishlist_remove_modal .image').html(jQuery('#product_'+pid+'_'+vid+' .image').html());
		jQuery('#mswishlist_remove_modal .text').html(jQuery('#product_'+pid+'_'+vid+' .text').html());
	 
		jQuery("#ms_modal_remove_button").attr('data-productid',pid);
		jQuery("#ms_modal_remove_button").attr('data-variantid',vid);
		jQuery('#mswishlist_remove_modal').modal('show');
		jQuery('html, body').animate({scrollTop:0},'50');
		// jQuery(window).scrollTop(0);
		});	


			//remove form wishlist start
			jQuery('#ms_modal_remove_button').click(function(){
				var pid=jQuery(this).attr('data-productid');
				var vid=jQuery(this).attr('data-variantid');
				var mswishlist=msCookies.get('mswishlist'); 
				var mswishlist_json=JSON.parse(mswishlist);
				var product_variant=[pid,vid,1];
			
				mswishlist_json.items.splice(variantExists(mswishlist_json.items,product_variant),1);
				msCookies.set('mswishlist',mswishlist_json,{ expires: 365 });
				jQuery('#mswishlist_remove_modal').modal('hide');
				jQuery('#product_'+pid+'_'+vid).remove();
				wishlist_save();
				if(mswishlist_json.items.length==0){
						setTimeout(function(){ 
					location.reload();
					}, 500);
				}

		});
		//remove form wishlist end
		
		//remove all form wishlist start
		jQuery('.mswishlist_removeallbtn').click(function(){
		
		if (confirm(jQuery('#msg_clear_all').val())) {
					jQuery(".mswish_products").html('');
					msCookies.set('mswishlist',JSON.stringify({"items":[]}),{ expires: 365 });
					wishlist_save();
					setTimeout(function(){ 
					location.reload();
					}, 500);
		}
			
		});
		
		//remove all form wishlist end
		
		  //add to cart all start
		jQuery('.mswishlist_addtocartallbtn').click(function(){
		var mswishlist=msCookies.get('mswishlist'); 
		 var mswishlist_json=JSON.parse(mswishlist);
		  item = {};
		  
			jQuery( ".mswishlist_addtocartbtn" ).each(function( index ) {
                 item [jQuery(this).attr('data-variantid')] = 1;
			});
				
			 jQuery.ajax({
			     url:"/cart/update.js",
				 type:"POST",
				 dataType: "json",
				 data:{updates: item,
					},
				success:function(data){
					 if(data.token){
					   alert(jQuery('#msg_items_added').val());
					   location.reload();
					 }
					},
				});
		
			
		});
		
		//add to cart all  end
	
	},
});

	}, 1500);

}
		
 //add to cart start
jQuery(document).on('click', '.mswishlist_addtocartbtn', function() {

	var pid = jQuery(this).attr('data-productid');
	var vid = jQuery(this).attr('data-variantid');

	jQuery.ajax({

		url 		: "/cart/add.js",
		type 		: "POST",
		dataType 	: "json",
		data 		: { quantity : 1, id : vid },
		success		: function(data) {

			if(data.id) {

				alert(jQuery('#msg_item_added').val());
				location.reload();
			}
		},
	});
});
//add to cart end

/*** Share Wishlist ***/
function share_wishlist() {

	var shop 	= $('#ms_shop').val();

	shop 		= (shop != '' && shop != undefined) ? shop : '';
	secure_key 	= (secure_key != '') ? secure_key : '';

	data = { 
				shop 		   : shop,
			 	wishlist_token : secure_key,
 		   };

	$.ajax({
		url  	 	: app_url + 'viewlist/share_wishlist',
		type 	 	: 'POST',
		data 		: data,
		datatype 	: 'jsonp',
        async	 	: true,
        crossDomain : true,
		success		: function(data) {

			$('.mswish_products').html(data);
			$(window).scrollTop(0);
		}
	});	
}
/*** //Share Wishlist ***/
