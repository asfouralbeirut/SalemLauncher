const fs = require('fs-extra')
const path = require('path')

let lang

exports.loadLanguage = function(id){
    const langId = (id && typeof id === 'string') ? id : 'tr_TR'
    try {
        lang = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'lang', `${langId}.json`), 'utf8')) || {}
    } catch (e) {
        lang = {}
    }
}

exports.query = function(id){
    if (!lang || typeof id !== 'string') return {}
    let query = id.split('.')
    let res = lang
    for(let q of query){
        res = res && res[q]
    }
    return res === lang ? {} : (res || {})
}

exports.queryJS = function(id){
    return exports.query(`js.${id}`)
}