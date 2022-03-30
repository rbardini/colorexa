function colorexa() {
  var w = window, d = document
  var c = String(w.getSelection ? w.getSelection() : d.getSelection ? d.getSelection() : d.selection.createRange().text)
  if (c == '') c = prompt('Enter a hexadecimal color code:', 'FFFFFF')
  if (c != null) {
    if (c != '') {
      if (c.charAt(0) == '#') c = c.substring(1)
      c = c.toUpperCase()
      if (c.match(/^([0-9A-F]{3}){1,2}$/)) w.open('https://colorexa.rbrd.in/#' + c, 'colorexa', 'width=640,height=480').focus()
      else alert('#' + c + ' is not a valid hexadecimal color code.')
    }
    else alert('Holy cow, you just divided by zero!\n\nSeriously now, for this thing to work you must either type or select a hexadecimal color code on your browser and try again.')
  }
}
