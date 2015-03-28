(function () {
  var defaultColor = 'FFFFFF'
  var colorRegex = /^([0-9A-F]{3}){1,2}$/

  function fillAndUpdate (color) {
    color = color.toUpperCase()

    if (color.match(colorRegex)) {
      document.body.style.background = '#' + color
      window.location.hash = color
      return true
    }

    document.body.style.background = '#' + defaultColor
    window.location.hash = ''
    return false
  }

  document.addEventListener('DOMContentLoaded', function () {
    var input = document.querySelector('input')

    function handleHashChange () {
      var color = window.location.hash.substring(1)

      if (color !== '') {
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
