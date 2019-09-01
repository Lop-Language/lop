#!/usr/bin/env node
var args = process.argv;
var fs = require('fs'), path = require('path')

if(args.length >= 3) {
    var filename = args[2]
    if(filename.split('.').pop() == 'lop') {
        var code = fs.readFileSync(path.join(path.join(args[1], '../'), filename))
        fs.writeFileSync(path.join(path.join(args[1], '../'), filename.replace('.lop', '.html')), require('./parser/parser.js').parse(code))
    } else {
        console.log('Cannot parse files that arent .lop files!')
    }
} else {
    console.log('No arguments found! Please use the format: lop [filename]!')
}
