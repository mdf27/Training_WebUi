$(window).load(function(){
	var $albumsRequest;	
	$search = _.debounce(function(){
		var $artist;				
		if($albumsRequest){			
			$albumsRequest.abort();
			console.log("abort");
		}
		$artist = $(".alias").val();
		$(".pagination").css({"visibility":"hidden"});
		$("#albums").empty();
		$(".alias").focus();
		if($artist){
			$albumsRequest = $.get("https://api.spotify.com/v1/search?",
				{ type: "album",
					q: $artist
				})
			.done(function(data){			
				$.each( data.albums.items, function( i, item ){	
					var $nameContent;
					$("<div>").attr({"id":"box"+i,"class":"box col-xs-6 col-md-3 col-lg-2"}).appendTo( "#albums");
					$("<article>").attr("id",i).appendTo( "#box"+i );
					$("<div>").attr({"id":"left-column"+i, "class": "column"}).appendTo("article#"+i );
					$("<div>").attr({"id":"right-column"+i, "class": "column"}).appendTo("article#"+i );
	        		$("<img>").attr( "src", item.images[0].url ).appendTo( "div#right-column"+i ); 
	        		$nameContent = wordSplit(item.name);
	        		$nameContent.appendTo( $("<span>").text("Name: ").attr("class","tag").appendTo( "div#left-column"+i ) );  
	        		$("<span>").text(item.type).appendTo( $("<span>").text("Type: ").attr("class","tag").appendTo( "div#left-column"+i ) );
	        		$("<a>").attr("href",item.uri).text("Listen on spotify").appendTo( "div#right-column"+i );         		         		    		
	        	});
	        	if (data.albums.items.length){
	        		$(".pagination").css({"visibility":"visible"});
	        	}else{
	        		$("<div>").attr("class","alert").text("There is no results for your search").appendTo("#albums");
	        	}	        	
			})
			.fail(function() {
				if ($albumsRequest.statusText != "abort")
		    	$(".alias").css({"background-color":"red"});
		  	});			
		};		
	}, 800);
	$("section").fadeIn(1000);
	$(".alias").focus();	
	$("input[type='text']").keyup($search);	
	function wordSplit(nameContent){
		if (nameContent.length > 20) {
			$titleTooltip  = nameContent;
			nameContent = nameContent.slice(0,20) + "...";
			nameContent = $("<span>").text(nameContent).attr({"data-toggle":"tooltip", "title":$titleTooltip}).tooltip();
		}else{
			nameContent = $("<span>").text(nameContent);
		}

		return nameContent;
	};	
});		