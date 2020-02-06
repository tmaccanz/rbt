
/* Map Component */


// Export //

export default function componentMap() {

    // Google Map API //

	const mapsapi = require("google-maps-api")("AIzaSyBMrBP0irD3XSwAUHbK5t8Mckz6KD7FWlg");

	mapsapi().then( function() {

        let myLatlng = new google.maps.LatLng(-37.701431, 176.281166);
        let mapOptions = {

          zoom: 16,
          center: myLatlng
        }
        let map = new google.maps.Map(document.getElementById("map__item"), mapOptions);
        
        let marker = new google.maps.Marker({

            position: myLatlng,
            title:"Refresh Beauty Therapy",
            icon: "/media/graphic/global/map-marker.png"
        });
        marker.setMap(map);
    });
}




  
  
  
  
  