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
	
	$('#fromLangDiv').hide();
	$('#toLangDiv').hide();
	$('#allBooks').modal('hide');
	
	if(bookToTranslateName != ''){
		$('#fromLangBtn').attr("disabled", false);
	}
	
  });
	
	$('#fromLangVal li').click(function(){
		fromLang = $(this).text();
		
		if(fromLang != ''){
		$('#toLangBtn').attr("disabled", false);

		getBookName(bookToTranslateName,fromLang,'#fromLangDiv','#fromLangHead','#resultContentFrom');
		
		}
	});
	
	
	$('#toLangVal li').click(function(){
		toLang = $(this).text();
		
		if(toLang != ''){
		$('#submitBtn').attr("disabled", false);
	}	
	});
	

	$.ajaxSetup ({
        cache: false
	});

	
	$('#submitBtn').click(function(){

		getBookName(bookToTranslateName,toLang,'#toLangDiv','#toLangHead','#resultContentTo');

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

function getBookName(book,lang,resultDiv,resultHeader, resultContent){

	ajax_load = "<img class='loading' src='img/loading.gif' alt='loading...' />";

	$('#result').show("slow");
	$("#result").html(ajax_load);

	var result=lang.split('_');
	var language=result[0];
	var Bible_Version=result[1];

	// the parameters we need to pass in our request to StackOverflow's API
	var request = {p: book,
				   ver: Bible_Version};

	var resultReturned = $.ajax({
		url: "http://getbible.net/json",
		dataType: "jsonp",
		data: request,
		jsonp: 'getbible',
		type: "GET",
		})
	.done(function(json){
		$("#result").empty(ajax_load);
		$(resultDiv).show();

		// set text direction
        if (json.direction == 'RTL'){
        	var direction = 'rtl';
        } else {
        	var direction = 'ltr'; 
        }

        var bookName;
		var output = '';
		
			jQuery.each(json.book, function(index, value) {

            	bookName = '<center><b>'+json.book_name+" ("+Bible_Version+')</b></center>';

            	output += '<br/><b>'+json.book_name+' '+value.chapter_nr+'</b><br/><p class="'+direction+'">';

            	jQuery.each(value.chapter, function(index, value) {
                    output += ' <sup><b>'+value.verse_nr + '</sup></b> ';
                    output += value.verse;
                });
                output += '<br/>';
                
            });
            
            $(resultHeader).html(bookName);
        	$(resultContent).html(output);  
        	/*$('#fromLangBtn').attr("disabled", true);
  			$('#toLangBtn').attr("disabled", true);
  			$('#submitBtn').attr("disabled", true);*/

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
