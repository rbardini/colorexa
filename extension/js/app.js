;(function () {
  var input = document.querySelector('input')

  var defaultColor = input.placeholder
  var colorRegex = /^([0-9A-F]{3}){1,2}$/

  function fill(color) {
    color = color.toUpperCase()

    var isColor = color.match(colorRegex)
    var colorValue = isColor ? color : defaultColor

    document.body.style.background = '#' + colorValue

    return isColor
  }

  function getSelectedText(input) {
    chrome.tabs
      .query({ active: true, currentWindow: true })
      .then(function (tabs) {
        chrome.scripting
          .executeScript({
            target: { tabId: tabs[0].id },
            func: function () {
              return getSelection().toString()
            },
          })
          .then(function (results) {
            var color = results[0].result

            if (color) {
              if (color.charAt(0) == '#') color = color.substring(1)
              input.value = fill(color) ? color : ''
            }
          })
      })
  }

  input.addEventListener('keyup', function (e) {
    fill(e.target.value)
  })

  getSelectedText(input)
})()
