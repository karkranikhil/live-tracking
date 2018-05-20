let map
function initMap() {
  console.log('initMap')
  navigator.geolocation.getCurrentPosition(pos => {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {lat: pos.coords.latitude, lng: pos.coords.longitude}
    })
  })
}

const socket = io('/')
let busMarkers = []
socket.on('tick', busses => {
  console.log('main js on tick')
  busMarkers.forEach(busMarker => {
    busMarker.setMap(null)
  })
  console.log(busses);
  busMarkers = busses.map(bus => {
    let marker = new google.maps.Marker({
      position: {lat: bus.lat, lng: bus.long}
    })
    marker.setMap(map)
    return marker
  })
})
