
/* Instagram Feed Component */

// Imports //

import $ from "jquery";

// Component Export //

export default function componentInstagramFeed() {

    // Retrieve Instagram Image Feed //

    var token = "8987997106.924f677.8555ecbd52584f41b9b22ec1a16dafb9",
    num_photos = 4;
    let x;
 
	$.ajax({

		url: "https://api.instagram.com/v1/users/self/media/recent",
		dataType: "jsonp",
		type: "GET",
		data: {access_token: token, count: num_photos},
		success: function(data){

 			console.log(data);
			for( x in data.data ){

				$('ul').append('<li><a href="' + data.data[x].link + '"><img src="'+data.data[x].images.low_resolution.url+'"></a></li>');
			}
		},
		error: function(data){

			console.log(data);
		}
	});
}

