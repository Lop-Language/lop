#!/usr/bin/env node
var args = process.argv;
var fs = require('fs'), path = require('path')

if(args.length > 3) {
    var filename = args[3]
    var language = args[2]
    if(language == 'html') {
        if(filename.split('.').pop() == 'lop') {
            var code = fs.readFileSync(path.join(path.join(args[1], '../'), filename))
            fs.writeFileSync(path.join(path.join(args[1], '../'), filename.replace('.lop', '.html')), require('./htmlparser/parser.js').parse(code))
        } else {
            console.log('Cannot parse files that arent .lop files!')
        }
    } else if(language == 'markdown' || language == 'md') {
        if(filename.split('.').pop() == 'lop') {
            var code = fs.readFileSync(path.join(path.join(args[1], '../'), filename))
            fs.writeFileSync(path.join(path.join(args[1], '../'), filename.replace('.lop', '.md')), require('./mdparser/parser.js').parse(code))
        } else {
            console.log('Cannot parse files that arent .lop files!')
        }
    }
} else if(args.length == 3) {
    var filename = args[2]
    if(filename.split('.').pop() == 'lop') {
        
        var code = fs.readFileSync(path.join(path.join(args[1], '../'), filename))
        fs.writeFileSync(path.join(path.join(args[1], '../'), filename.replace('.lop', '.html')), require('./htmlparser/parser.js').parse(code))
    } else {
        console.log('Cannot parse files that arent .lop files!')
    }
}