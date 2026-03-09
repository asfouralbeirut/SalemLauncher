/**
 * Sayfa yüklendikten sonra window.Lang'den html metinlerini ilgili elementlere uygular.
 * uibinder.js'ten sonra yüklenmeli.
 */
(function () {
    var L = window.Lang
    if (!L || typeof L.query !== 'function') return
    var htmlStrings = L.query('html')
    if (!htmlStrings || typeof htmlStrings !== 'object') return
    for (var key in htmlStrings) {
        var el = document.getElementById(key)
        if (el && htmlStrings[key]) el.innerHTML = htmlStrings[key]
    }
})()
