$(document).ready(function(){

	var bookToTranslateIndex;
	var bookToTranslateName;
	var chapterPicked;
	var fromLang;
	var toLang;
	var ajax_load;
	var chapCount;

	var back;
	var forward;
	
  $('#result').hide();
  $('#fromLangDiv').hide();
  //$('#resultContentFrom').hide();
  $('#toLangDiv').hide();
  //$('#resultContentTo').hide();
  $('#error').hide();
  $('#resultPane').hide();
  $('#fromLangBtn').attr("disabled", true);
  $('#toLangBtn').attr("disabled", true);
  $('#submitBtn').attr("disabled", true);
  
  $('#selectBook li').click(function(){
	bookToTranslateIndex = $(this).index();
	bookToTranslateName = $(this).text();
	
	var chapterLoadStart = "<img src='img/chapter_loading.gif' alt='loading...' />";
	
	$('#fromLangDiv').hide();
	$('#toLangDiv').hide();
	$('#fromLangHead').hide();
	$('#toLangHead').hide();
	$('#resultPane').hide();
	$('#allBooks').modal('hide');
	
	if(bookToTranslateName != ''){
		$('#fromLangBtn').attr("disabled", false);
	}
	
	var bkName = '';
	chapCount = '';
	$.ajax({
		    url: 'http://getbible.net/json',
		    dataType: 'jsonp',
		    data: {p: bookToTranslateName},
		    jsonp: 'getbible',
		    success: function(response) {
				$('#getChpatersLoader').empty(chapterLoadStart);
				
				jQuery.each(response.book, function(index, value) {
					bkName = response.book_name;
					chapCount = value.chapter_nr;
                });
				
				$('#chapBookName').append(bkName);
				
				for(i=1;i<=chapCount;i++){
					$('#selectChapter').append('<li id="chapterSelected" class="chapter btn btn-default">'+i+'</li>');
				}
								
		        //alert( response.book_name+' '+chapCount); 
		    },
		    error: function(xhr, status, error) {
		        console.log(status + '; ' + error);
		    }
		});
	
	$('#chapBookName').empty();
	$('#selectChapter').empty();
	$('#allChapters').modal('show');
	$('#getChpatersLoader').html('<center>'+chapterLoadStart+'</center>');
	
  });
    
	$(document).on("click","#chapterSelected", function() {
		var index = $("#chapterSelected").index(this);
		chapterPicked = $(this).text();
		
		$('#allChapters').modal('hide');
		//alert(chapterPicked);
	});
	
	$('#fromLangVal li').click(function(){
		fromLang = $(this).text();
		
		if(fromLang != ''){
		$('#toLangBtn').attr("disabled", false);

		//getBookName(bookToTranslateName,fromLang,'#fromLangDiv','#fromLangHead','#resultContentFrom');
		
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
		
		if(chapterPicked == null){
			chapterPicked = 1;
		}

		if(chapterPicked == 1 ){

			back = '<div id="prev"></div>';
			forward = '<div id="next" class="glyphicon glyphicon-circle-arrow-right pull-right"></div>';

			getBookName(bookToTranslateName,fromLang,chapterPicked,'#fromLangDiv','#fromLangHead',back,'#resultContentFrom');
			getBookName(bookToTranslateName,toLang,chapterPicked,'#toLangDiv','#toLangHead',forward,'#resultContentTo');	

		} else if(chapterPicked == chapCount){

			back = '<div id="prev" class="glyphicon glyphicon-circle-arrow-left pull-left"></div>';
			forward = '<div id="next"></div>';

			getBookName(bookToTranslateName,fromLang,chapterPicked,'#fromLangDiv','#fromLangHead',back,'#resultContentFrom');
			getBookName(bookToTranslateName,toLang,chapterPicked,'#toLangDiv','#toLangHead',forward,'#resultContentTo');

		} else {

			back = '<div id="prev" class="glyphicon glyphicon-circle-arrow-left pull-left"></div>';
			forward = '<div id="next" class="glyphicon glyphicon-circle-arrow-right pull-right"></div>';

			getBookName(bookToTranslateName,fromLang,chapterPicked,'#fromLangDiv','#fromLangHead',back,'#resultContentFrom');
			getBookName(bookToTranslateName,toLang,chapterPicked,'#toLangDiv','#toLangHead',forward,'#resultContentTo');

		}
		

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
	
	$(document).on("click","#prev", function() {
		--chapterPicked;
		if(chapterPicked == 1 ){

			back = '<div id="prev"></div>';
			forward = '<div id="next" class="glyphicon glyphicon-circle-arrow-right pull-right"></div>';

			getBookName(bookToTranslateName,fromLang,chapterPicked,'#fromLangDiv','#fromLangHead',back,'#resultContentFrom');
			getBookName(bookToTranslateName,toLang,chapterPicked,'#toLangDiv','#toLangHead',forward,'#resultContentTo');	

		} else if(chapterPicked == chapCount){

			back = '<div id="prev" class="glyphicon glyphicon-circle-arrow-left pull-left"></div>';
			forward = '<div id="next"></div>';

			getBookName(bookToTranslateName,fromLang,chapterPicked,'#fromLangDiv','#fromLangHead',back,'#resultContentFrom');
			getBookName(bookToTranslateName,toLang,chapterPicked,'#toLangDiv','#toLangHead',forward,'#resultContentTo');

		} else {

			back = '<div id="prev" class="glyphicon glyphicon-circle-arrow-left pull-left"></div>';
			forward = '<div id="next" class="glyphicon glyphicon-circle-arrow-right pull-right"></div>';

			getBookName(bookToTranslateName,fromLang,chapterPicked,'#fromLangDiv','#fromLangHead',back,'#resultContentFrom');
			getBookName(bookToTranslateName,toLang,chapterPicked,'#toLangDiv','#toLangHead',forward,'#resultContentTo');

		}
		
	});
	
	$(document).on("click","#next", function() {
		++chapterPicked;

		if(chapterPicked == 1 ){

			back = '<div id="prev"></div>';
			forward = '<div id="next" class="glyphicon glyphicon-circle-arrow-right pull-right"></div>';

			getBookName(bookToTranslateName,fromLang,chapterPicked,'#fromLangDiv','#fromLangHead',back,'#resultContentFrom');
			getBookName(bookToTranslateName,toLang,chapterPicked,'#toLangDiv','#toLangHead',forward,'#resultContentTo');	

		} else if(chapterPicked == chapCount){

			back = '<div id="prev" class="glyphicon glyphicon-circle-arrow-left pull-left"></div>';
			forward = '<div id="next"></div>';

			getBookName(bookToTranslateName,fromLang,chapterPicked,'#fromLangDiv','#fromLangHead',back,'#resultContentFrom');
			getBookName(bookToTranslateName,toLang,chapterPicked,'#toLangDiv','#toLangHead',forward,'#resultContentTo');

		} else {

			back = '<div id="prev" class="glyphicon glyphicon-circle-arrow-left pull-left"></div>';
			forward = '<div id="next" class="glyphicon glyphicon-circle-arrow-right pull-right"></div>';

			getBookName(bookToTranslateName,fromLang,chapterPicked,'#fromLangDiv','#fromLangHead',back,'#resultContentFrom');
			getBookName(bookToTranslateName,toLang,chapterPicked,'#toLangDiv','#toLangHead',forward,'#resultContentTo');

		}
		
	});
	
  
});

function getBookName(book,lang,chapterNum,resultDiv,resultHeader,chapNav,resultContent){

	ajax_load = "<img class='loading' src='img/loading.gif' alt='loading...' />";

	$('#result').show("slow");
	$('#resultPane').show("slow");
	$(resultHeader).show();
	$("#result").html(ajax_load);

	var result=lang.split('_');
	var language=result[0];
	var Bible_Version=result[1];

	// the parameters we need to pass 
	var request = {p: book+chapterNum,
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
		$('#result').hide("slow");
		$(resultDiv).show();

		// set text direction
        if (json.direction == 'RTL'){
        	var direction = 'rtl';
        } else {
        	var direction = 'ltr'; 
        }

        var bookName;
		var output = '';
		var chapNavArrow;
		var chapTitle;
			
			bookName = '<center><b>'+json.book_name+" ("+Bible_Version+')</b></center>';

			chapTitle = '<center><b>'+json.book_name+' '+chapterNum+'</b></center><br/>';
			output += '<p class="'+direction+'">';
			
			jQuery.each(json.chapter, function(index, value) {
            	
				output += ' <sup><b>'+value.verse_nr + '</sup></b> ';
                output += value.verse;
            	/*jQuery.each(value.chapter, function(index, value) {
                    output += ' <sup><b>'+value.verse_nr + '</sup></b> ';
                    output += value.verse;
                });*/
                //output += '<br/>';
                
            });
            
            $(resultHeader).html(bookName);
        	$(resultContent).html(chapNav+chapTitle+output+chapNav+chapTitle);  
        	/*$('#fromLangBtn').attr("disabled", true);
  			$('#toLangBtn').attr("disabled", true);
  			$('#submitBtn').attr("disabled", true);*/

	})
	.fail(function(jqXHR, error, errorThrown){
		
		$("#result").empty(ajax_load);
		$('#resultPane').hide("slow");
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
