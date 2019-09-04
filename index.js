var fs = require('fs')

/**
 * Reads a file from the path and returns markdown code.
 * @param { String } file
 */
function toMarkdown(file) {
    return require('./mdparser/parser.js').parse(fs.readFileSync(file))
}

/**
 * Parses the code and returns interpreted markdown code.
 * @param { String } code
 */
function toMarkdownCode(code) {
    return require('./mdparser/parser.js').parse(code)
}

/**
 * Reads a file from the path and returns html code.
 * @param { String } file
 */
function toHtml(file) {
    return require('./htmlparser/parser.js').parse(fs.readFileSync(file))
}

/**
 * Parses the code and returns interpreted html code.
 * @param { String }code
 */
function toHtmlCode(code) {
    return require('./htmlparser/parser.js').parse(code)
}

module.exports = {
    toMarkdown: toMarkdown,
    toMarkdownCode: toMarkdownCode,
    toHtml: toHtml,
    toHtmlCode: toHtmlCode
}