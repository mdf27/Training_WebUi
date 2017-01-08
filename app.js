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
					var $albumTitle,
					$box = $("<div>").attr({"id":"box"+i,"class":"box col-xs-3 col-sm-2 col-md-3 col-lg-2"}),
					$article = $("<article>"),
					$leftColumn = $("<div>").attr({"class": "column left-column"}),
					$rightColumn = $("<div>").attr({"class": "column right-column"}),
					$imageContainer = $("<img>").attr( "src", item.images[0].url ),
					$nameSpan = $("<span>").text("Name: ").attr("class","tag"),
					$typeSpan  = $("<span>").text("Type: ").attr("class","tag"),
					$typeValue = $("<span>").text(item.type),
					$link = $("<a>").attr("href",item.uri).text("Listen on spotify"),
					$linkIcon = $("<a>").attr({"href":item.uri, "class":"glyphicon glyphicon-music"});
					$nameSpan.appendTo ($leftColumn);
					$albumTitle = wordSplitAddTooltip(item.name);
					$albumTitle.appendTo ($nameSpan);
					$typeSpan.appendTo ($leftColumn);
					$typeValue.appendTo ($typeSpan);
					$imageContainer.appendTo($rightColumn);
					$link.appendTo ($rightColumn);								
					$linkIcon.appendTo ($rightColumn);					
					$leftColumn.appendTo($article);
					$rightColumn.appendTo($article);    		 
					$article.appendTo($box);
	        		$box.appendTo("#albums");        		         		    		
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
	function wordSplitAddTooltip(albumTitle){
		if (albumTitle.length > 20) {
			$titleTooltip  = albumTitle;
			albumTitle = albumTitle.slice(0,20) + "...";
			albumTitle = $("<span>").text(albumTitle).attr({"data-toggle":"tooltip", "title":$titleTooltip}).tooltip();
		}else{
			albumTitle = $("<span>").text(albumTitle);
		}

		return albumTitle;
	};	
});		