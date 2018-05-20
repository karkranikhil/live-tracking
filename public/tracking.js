'use strict'
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: -37.82, lng: 144.941}
  });
}

function getLocation() {
  var referesh = true
  let prevLat, prevLong
  const socket = io('/')
  socket.emit('busConnection')
  socket.on('tick', busses => {
    console.log('bus js on tick')
    navigator.geolocation.getCurrentPosition(pos => {
      console.log(pos)
      const lat = pos.coords.latitude
      const long = pos.coords.longitude
      
      if(referesh){
        referesh = false
        createMap(lat, long)
      }
      
      //getAddress(lat, long)
      socket.emit('update', {lat, long})
    })
  })
}
function createMap(lat,long){
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: lat, lng: long}
  });
  var latlng = {
    lat : parseFloat( lat ),
    lng : parseFloat( long )
  };
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

