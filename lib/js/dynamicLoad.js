$(document).ready(function() {

	bindEvents();
	var hash = window.location.hash.substr(1);
	var prevHash='index';
	/**
	 * THE FOLLOWING BLOCK CHECKS IF THE INITAL URL CONTAINS HASH STRING
	 * AND IF IT FINDS A VALID HASH STRING IT REDIRECTS TO THAT PARTICULAR CONVERSION PAGE
	 */
	if(hash){
		var href = hash+".html";
		var hrefElement = $('a[href="'+href+'"]');
		if(hrefElement){
			loadPage(href);
			prevHash=hash;
			
		}
	}

   /**
    * FUNCTION TO DYNAMICALLY LOAD THE GIVEN HTML PAGE AND REPLACE 'details' DIV
    */
   function loadPage(href){
	   if(isNullorEmpty(href)){
		   return;
	   }
	    var toLoad = href+' #content';
	    var hash = href.substr(0,href.length-5);
	    if(hash === prevHash){
	    	return;
	    }
	    prevHash =hash;
	    $('#details').hide('fast',loadContent);
	    window.location.hash = hash;	    
	    function loadContent() {
	        $('#details').load(toLoad,'',showNewContent());
	        $(document).trigger("categoryChange",[hash]);
	    }
	    function showNewContent() {
	        $('#details').show('normal',bindEvents);
	    } 
   }

   function bindEvents() {
	   $('.mdl-navigation__link').click(function(e){
		   var href = $(this).attr('href');
		   loadPage(href);
		   e.preventDefault();
	   });
   }
});