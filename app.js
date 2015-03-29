(function () {
  var defaultColor = 'FFFFFF'
  var colorRegex = /^([0-9A-F]{3}){1,2}$/

  var iconSize = 32
  var iconCanvas = document.createElement('canvas')
  iconCanvas.width = iconSize
  iconCanvas.height = iconSize

  var faviconTag

  function createIcon (color) {
    var ctx = iconCanvas.getContext('2d')
    ctx.fillStyle = '#' + color
    ctx.fillRect(0, 0, iconSize, iconSize)

    return iconCanvas
  }

  function updateFavicon (color) {
    var iconURL = createIcon(color).toDataURL()

    if (faviconTag) {
      faviconTag.href = iconURL

    } else {
      faviconTag = document.createElement('link')
      faviconTag.rel = 'icon'
      faviconTag.type = 'image/x-icon'
      faviconTag.href = iconURL
      document.head.appendChild(faviconTag)
    }
  }

  function fillAndUpdate (color) {
    color = color.toUpperCase()

    var isColor = color.match(colorRegex)
    var finalColor = isColor ? color : defaultColor

    document.body.style.background = '#' + finalColor
    window.location.hash = isColor ? finalColor : ''
    updateFavicon(finalColor)

    return isColor
  }

  document.addEventListener('DOMContentLoaded', function () {
    var input = document.querySelector('input')

    function handleHashChange (e) {
      var color = window.location.hash.substring(1)
      var simulated = e == null

      if (color !== '' || simulated) {
        if (color.charAt(0) === '#') color = color.substring(1)
        input.value = fillAndUpdate(color) ? color : ''
      }
    }

    window.addEventListener('hashchange', handleHashChange, false)

    input.addEventListener('input', function (e) {
      fillAndUpdate(e.target.value)
    })

    input.placeholder = defaultColor
    handleHashChange()
  })
})()
