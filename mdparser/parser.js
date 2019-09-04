

exports.parse = (code) => {

    var documentCode = ''
    code = code.toString()
    var lines = code.split('\n')
    for(var i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace('\r', '')
    }

    var linei = 0;
    lines.forEach((line) => {
        linei++;

        var codelines = new Array()


        if(line[0] == 'h' && line[1] == '>') {
            documentCode += '\n# ' + line.replace('h>', '')
        }
        
        else if(line[0] == 'h' && line[1] == 'h' && line[2] == '>') {
            documentCode += '\n## ' + line.replace('hh>', '')
        } 
        
        else if(line[0] == 'h' && line[1] == 'h' && line[2] == 'h' && line[3] == '>') {
            documentCode += '\n### ' + line.replace('hhh>', '')
        }
        
        else if(line[0] == 'h' && line[1] == 'h' && line[2] == 'h' && line[3] == 'h' && line[4] == '>') {
            documentCode += '\n#### ' + line.replace('hhhh>', '')
        } 
        
        else if(line[0] == 'h' && line[1] == 'h' && line[2] == 'h' && line[3] == 'h' && line[4] == 'h' && line[5] == '>') {
            documentCode += '\n##### ' + line.replace('hhhhh>', '')
        } 
        
        else if(line[0] == 'h' && line[1] == 'h' && line[2] == 'h' && line[3] == 'h' && line[4] == 'h' && line[5] == 'h' && line[6] == '>') {
            documentCode += '\n###### ' + line.replace('hhhhhh>', '')
        } 
        
        else if(line[0] == '%' && line[1] == 'l' && line[2] == 'i' && line[3] == 'n' && line[4] == 'k' && line[5] == '>') {
            documentCode += '[' + line.replace('%link>', '') + '](' + line.replace('%link>', '') + ')'
        }
        
        else if(line[0] == 'l' && line[1] == 'i' && line[2] == 'n' && line[3] == 'k' && line[4] == '>') {
            documentCode += '\n[' + line.replace('link>', '') + '](' + line.replace('link>', '') + ")"
        }

        else if(line[0] == 'i' && line[1] == 'm' && line[2] == 'a' && line[3] == 'g' && line[4] == 'e' && line[5] == '>') {
            documentCode += '\n![' + line.replace('image>', '') + '](' + line.replace('image>', '') + ')'
        }

        else if(line[0] == 'l' && line[1] == 'i' && line[2] == 'n' && line[3] == 'k' && line[4] == '-') {
            var placeholder = '';
            for(var i = 3; i < line.length; i++) {
                if(i == 4 && line[i] !== '-') {
                    console.error('Could not parse link placeholder.')
                    process.exit(0)
                }
                if(line[i] !== '>') {
                    placeholder += line[i]
                } else if(line[i] == '>') {
                    break
                }
            }

            placeholder = placeholder.replace('k-', '')
            
            var link = line.replace('link-' + placeholder + '>', '').replace('<', '')
            
            var codeblock = '\n[' + placeholder + '](' + link + ')'
            documentCode += '\n' + codeblock
        }

        else if(line[0] == '%' && line[1] == 'l' && line[2] == 'i' && line[3] == 'n' && line[4] == 'k' && line[5] == '-') {
            var placeholder = '';
            for(var i = 4; i < line.length; i++) {
                if(i == 5 && line[i] !== '-') {
                    console.error('Could not parse language name.')
                }
                if(line[i] !== '>') {
                    placeholder += line[i]
                } else if(line[i] == '>') {
                    break
                }
            }

            placeholder = placeholder.replace('k-', '')
            
            var link = line.replace('link-' + placeholder + '>', '').replace('<', '')
            
            var codeblock = '[' + placeholder + ']' + '(' + link + ')'
            documentCode += '\n' + codeblock
        }

        else if(line[0] == 'c' && line[1] == 'o' && line[2] == 'd' && line[3] == 'e') {
            var language = '';
            for(var i = 3; i < line.length; i++) {
                if(i == 4 && line[i] !== '-') {
                    console.error('Could not parse language name.')
                    process.exit(0)
                }
                if(line[i] !== '>') {
                    language += line[i]
                } else if(line[i] == '>') {
                    break
                }
            }

            language = language.replace('e-', '')
            var codeblock = '```' + language
            var codeitems = new Array()

            var i1 = linei - 1;
            for(var i = linei - 1; i < lines.length; i++) {
                if(!lines[i].includes('<<')) {
                    if(lines[i].includes('code-' + language + '>')) {
                        if(i == i1) {
                            codeblock += lines[i].replace('code-' + language + '>', '')
                            codeitems.push(lines[i])
                        } else {
                            codeblock += '\n' + lines[i]
                            codeitems.push(lines[i])
                        }
                    } else {
                        codeblock += '\n' + lines[i]
                        codeitems.push(lines[i])
                    }
                } else
                    break
            }

            

            codeblock += lines[i].substring(0, lines[i].indexOf('<<')).replace('code-' + language + '>', '') + '\n```'
            documentCode += '\n' + codeblock
            codeitems.forEach((item) => {
                lines[lines.indexOf(item)] = ''
            }) 
        } 

        else if(line[0] == 't' && line[1] == 'e' && line[2] == 'x' && line[3] == 't' && line[4] == '>') {
            var codeitems = new Array()
            var codeblock = ''
            var i1 = linei - 1;
            for(var i = linei - 1; i < lines.length; i++) {
                
                if(!lines[i].includes('<<')) {
                    if(lines[i].includes('text>')) {
                        if(i1 == i) {
                            codeblock += lines[i].replace('text>', '')
                            codeitems.push(lines[i])
                        } else {
                            codeblock += lines[i]
                            codeitems.push(lines[i])
                        }
                    } else {
                        codeblock += '\n' + lines[i]
                        codeitems.push(lines[i])
                    }
                } else
                    break

                
            }
            codeblock +=  lines[i].substring(0, lines[i].indexOf('<<')).replace('text>', '')
            documentCode += '\n' + codeblock

            codeitems.forEach((obj) => {
                lines[lines.indexOf(obj)] = ''
            })
        } 

        else if(line[0] == '%' && line[1] == 't' && line[2] == 'e' && line[3] == 'x' && line[4] == 't') {
            var codeitems = new Array()
            var codeblock = ''
            var i1 = linei - 1;
            for(var i = linei - 1; i < lines.length; i++) {
                
                if(!lines[i].includes('<<')) {
                    if(lines[i].includes('text>')) {
                        if(i == i1) {
                            codeblock += lines[i].replace('text>', '')
                            codeitems.push(lines[i])
                        } else {
                            codeblock += lines[i]
                            codeitems.push(lines[i])
                        }
                    } else {
                        codeblock += '\n' + lines[i]
                        codeitems.push(lines[i])
                    }
                } else
                    break

                
            }
            codeblock +=  lines[i].substring(0, lines[i].indexOf('<<')).replace('%text>', '')
            documentCode += codeblock.replace('%', '')

            codeitems.forEach((obj) => {
                lines[lines.indexOf(obj)] = ''
            })
        } 
    })

    return documentCode 
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return ele != value;
    });
 
 }