let map
function initMap() {
  console.log('initMap')
  navigator.geolocation.getCurrentPosition(pos => {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 20,
      center: {lat: pos.coords.latitude, lng: pos.coords.longitude}
    })
  })
}

const socket = io('/')
let busMarkers = []
socket.on('tick', busses => {
  var latRxv, longRxv
  console.log('main js on tick')
  busMarkers.forEach(busMarker => {
    busMarker.setMap(null)
  })
  console.log(busses);
  busMarkers = busses.map(bus => {
    latRxv=bus.lat
    longRxv=bus.long
    let marker = new google.maps.Marker({
      position: {lat: bus.lat, lng: bus.long}
    })
    marker.setMap(map)
    return marker
  })
  getAddressName(latRxv,longRxv)
})

function getAddressName(lat,long){
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;
  var latlng = {lat: parseFloat(lat), lng: parseFloat(long)};
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
