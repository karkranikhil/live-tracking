'use strict'

$(document).on('ready', () => {
  const socket = io('/')
  const root = document.getElementById('root')

  socket.emit('busConnection')

  socket.on('tick', busses => {
    console.log('bus js on tick')
    navigator.geolocation.getCurrentPosition(pos => {
      console.log(pos)
      const lat = pos.coords.latitude
      const long = pos.coords.longitude
      socket.emit('update', {lat, long})
    })
  })
})
