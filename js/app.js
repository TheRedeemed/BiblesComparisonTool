$(document).ready(function(){

	var bookToTranslateIndex;
	var bookToTranslateName;
	var fromLang;
	var toLang;
	var ajax_load;
	
  $('#result').hide();
  $('#fromLangDiv').hide();
  //$('#resultContentFrom').hide();
  $('#toLangDiv').hide();
  //$('#resultContentTo').hide();
  $('#error').hide();
  $('#fromLangBtn').attr("disabled", true);
  $('#toLangBtn').attr("disabled", true);
  $('#submitBtn').attr("disabled", true);
  
  $('#selectBook li').click(function(){
	bookToTranslateIndex = $(this).index();
	bookToTranslateName = $(this).text();
	
	$('#allBooks').modal('hide');
	
	//$('#getBook').empty();
	//$('#getBook').append(bookToTranslateName);
	
	//alert(bookToTranslateName);
	
	if(bookToTranslateName != ''){
		$('#fromLangBtn').attr("disabled", false);
	}
	
  });
	
	$('#fromLangVal li').click(function(){
		fromLang = $(this).text();
		//alert(bookToTranslateName + ' ' + fromLang);
		
		if(fromLang != ''){
		$('#toLangBtn').attr("disabled", false);
		
		//$('#fromLangVal').empty();
		//$('#fromLangVal').append(fromLang);
	}
	});
	
	
	$('#toLangVal li').click(function(){
		toLang = $(this).text();
		//alert(bookToTranslateName + ' ' + fromLang + ' ' + toLang);
		
		if(toLang != ''){
		$('#submitBtn').attr("disabled", false);
	}	
	});
	

		$.ajaxSetup ({
        cache: false
		});

		//ajax_load = "<img class='loading' src='img/ajax-loading.gif' alt='loading...' />";
	
	$('#submitBtn').click(function(){
		 
		//load() functions
		//var loadUrl = "file:///C:/Users/v543644/Desktop/portfolio/index.html"; //"ajax/load.php";
		//$('#result').show("slow");
		//$("#result").html(ajax_load);//.load(loadUrl);

		getBookName(bookToTranslateName);

		/*
		$.ajax({
		    url: 'http://getbible.net/json',
		    dataType: 'jsonp',
		    data: {p: bookToTranslateName},
		    jsonp: 'getbible',
		    success: function(response) {
		        console.log('callback success');
		    },
		    error: function(xhr, status, error) {
		        console.log(status + '; ' + error);
		    }
		});*/

	});
	
  
});

function getBookName(book){

	ajax_load = "<img class='loading' src='img/loading.gif' alt='loading...' />";

	$('#result').show("slow");
	$("#result").html(ajax_load);
	
	/*
	$('#fromLangDiv').show();
	//$('#resultContentFrom').show();
	$('#fromLangHead').html('Getting book name 1...');
    $('#resultContentFrom').html('Getting book Content 1...');  
	
	$('#toLangDiv').show();
	//$('#resultContentTo').show();
	$('#toLangHead').html('Getting book name 2...');
    $('#resultContentTo').html('Getting book Content 2...');  
	*/

	// the parameters we need to pass in our request to StackOverflow's API
	var request = {p: book,
				   ver: 'kjv'};

	var resultReturned = $.ajax({
		url: "http://getbible.net/json",
		dataType: "jsonp",
		data: request,
		jsonp: 'getbible',
		type: "GET",
		})
	.done(function(json){
		$("#result").empty(ajax_load);
		$('#fromLangDiv').show();
		//$('#toLangDiv').show();

		// set text direction
        if (json.direction == 'RTL'){
        	var direction = 'rtl';
        } else {
        	var direction = 'ltr'; 
        }

        var bookName;
		var output = '';
            

            jQuery.each(json.book, function(index, value) {

            	bookName = '<center><b>'+json.book_name+'</b></center>';

            	output += '<br/><b>'+json.book_name+' '+value.chapter_nr+'</b><br/><p class="'+direction+'">';
            	//$('#result').append('<center><b>'+json.book_name+'</b></center>');

            	jQuery.each(value.chapter, function(index, value) {
            		//output += value.chapter_nr;
                    output += value.verse_nr + '. ';
                    output += value.verse;
                    output += '<br/>';
                });
                
            });
            
            $('#fromLangHead').html(bookName);
        	$('#resultContentFrom').html(output);  // <---- Adding book content to the Div

			/*
        	$('#toLangHead').html(bookName);
        	$('#resultContentTo').html(output);  // <---- Adding book content to the Div
			*/

/*
        // check response type
        if (json.type == 'book'){
            var output = '';
            $('#result').append('<center><b>'+json.book_name+'</b></center>');
            jQuery.each(json.book, function(index, value) {
            	//output += '<center><b>'+json.book_name+' '+value.chapter_nr+'</b></center><br/><p class="'+direction+'">';
            	$('#result').append('<center><b>'+json.book_name+'</b></center>');

            /*	jQuery.each(value.chapter, function(index, value) {
            		output += value.chapter_nr;
                    output += value.verse_nr;
                    output += value.verse;
                    output += '<br/>';
                });*/
                
        /*    });
            
        	jQuery('#result').html(output);  // <---- this is the div id we update
        	
        }*/

		//alert(json.book_name);

/*
		// set text direction
        if (json.direction == 'RTL'){
        	var direction = 'rtl';
        } else {
        	var direction = 'ltr'; 
        }

        // check response type
        if (json.type == 'book'){
            var output = '';
            jQuery.each(json.book, function(index, value) {
            	//output += '<center><b>'+json.book_name+' '+value.chapter_nr+'</b></center><br/><p class="'+direction+'">';
            	$('#fromLangHead').append('<center><b>'+json.book_name+json.book_nr+'</b></center>');

            	jQuery.each(value.chapter, function(index, value) {
            		output += value.chapter_nr;
                    output += value.verse_nr;
                    output += value.verse;
                    output += '<br/>';
                });
                
            });
            
        	jQuery('#resultContentFrom').html(output);  // <---- this is the div id we update
        	
        }*/ 

	})
	.fail(function(jqXHR, error, errorThrown){
		
		$("#result").empty(ajax_load);
		$('#error').show("slow");
		$('#errorContent').append(error + '<br>');
		$('#errorContent').append(errorThrown);

		$('#getBook').attr("disabled", true);
		$('#fromLangBtn').attr("disabled", true);
  		$('#toLangBtn').attr("disabled", true);
  		$('#submitBtn').attr("disabled", true);

  		$('#reloadBtn').click(function(){
  			location.reload();
  		});
	});
}