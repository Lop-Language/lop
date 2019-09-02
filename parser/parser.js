

exports.parse = (code) => {

    var documentCode = `
<!DOCTYPE html>
<html>
    <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/themes/prism-tomorrow.min.css" rel="stylesheet"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-core.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/plugins/autoloader/prism-autoloader.min.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Manjari&display=swap" rel="stylesheet">
        <style>
        body {
            font-family: 'Manjari', sans-serif;
        }
        </style>
    </head>
    <body>
`
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
            documentCode += '\n        <h1>' + line.replace('h>', '') + '</h1>'
        }
        
        else if(line[0] == 'h' && line[1] == 'h' && line[2] == '>') {
            documentCode += '\n        <h2>' + line.replace('hh>', '') + '</h2>'
        } 
        
        else if(line[0] == 'h' && line[1] == 'h' && line[2] == 'h' && line[3] == '>') {
            documentCode += '\n        <h3>' + line.replace('hhh>', '') + '</h3>'
        }
        
        else if(line[0] == 'h' && line[1] == 'h' && line[2] == 'h' && line[3] == 'h' && line[4] == '>') {
            documentCode += '\n        <h4>' + line.replace('hhhh>', '') + '</h4>'
        } 
        
        else if(line[0] == 'h' && line[1] == 'h' && line[2] == 'h' && line[3] == 'h' && line[4] == 'h' && line[5] == '>') {
            documentCode += '\n        <h5>' + line.replace('hhhhh>', '') + '</h5>'
        } 
        
        else if(line[0] == 'h' && line[1] == 'h' && line[2] == 'h' && line[3] == 'h' && line[4] == 'h' && line[5] == 'h' && line[6] == '>') {
            documentCode += '\n        <h6>' + line.replace('hhhhhh>', '') + '</h6>'
        } 
        
        else if(line[0] == '%' && line[1] == 'l' && line[2] == 'i' && line[3] == 'n' && line[4] == 'k' && line[5] == '>') {
            documentCode += '<span><a href="' + line.replace('%link>', '') + '">' + line.replace('%link>', '') + "</a></span>"
        }
        
        else if(line[0] == 'l' && line[1] == 'i' && line[2] == 'n' && line[3] == 'k' && line[4] == '>') {
            documentCode += '\n        <a href="' + line.replace('link>', '') + '">' + line.replace('link>', '') + "</a>"
        }

        else if(line[0] == 'i' && line[1] == 'm' && line[2] == 'a' && line[3] == 'g' && line[4] == 'e' && line[5] == '>') {
            documentCode += '\n        <img src="' + line.replace('image>', '') + '"></img>'
        }

        else if(line[0] == 'l' && line[1] == 'i' && line[2] == 'n' && line[3] == 'k' && line[4] == '-') {
            var placeholder = '';
            for(var i = 3; i < line.length; i++) {
                if(i == 4 && line[i] !== '-') {
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

            console.log(link)
            
            var codeblock = '<a href="' + link + '">' + placeholder + '</a>'
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

            console.log(link)
            
            var codeblock = '<a href="' + link + '">' + placeholder + '</a>'
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
            var codeblock = '<pre><code class="language-' + language + '">'
            var codeitems = new Array()


            for(var i = linei - 1; i < lines.length; i++) {
                if(!lines[i].includes('<<')) {
                    if(lines[i].includes('code-' + language + '>')) {
                        codeblock += lines[i]
                        codeitems.push(lines[i])
                    } else {
                        codeblock += '\n' + lines[i]
                        codeitems.push(lines[i])
                    }
                } else
                    break
            }

            

            codeblock += '\n' + lines[i].substring(0, lines[i].indexOf('<<')).replace('code-' + language + '>', '') + '</code></pre>'
            documentCode += '\n' + codeblock
            codeitems.forEach((item) => {
                lines[lines.indexOf(item)] = ''
            }) 
        } 

        else if(line[0] == 't' && line[1] == 'e' && line[2] == 'x' && line[3] == 't' && line[4] == '>') {

            var codeblock = '<p>'

            for(var i = linei - 1; i < lines.length; i++) {
                
                if(!lines[i].includes('<<')) {
                    if(lines[i].includes('text>')) {
                        codeblock += lines[i].replace('text>', '')
                    } else {
                        codeblock += '\n' + lines[i]
                    }
                } else
                    break

                
            }
            codeblock +=  lines[i].substring(0, lines[i].indexOf('<<')).replace('text>', '') + '</p>'
            documentCode += '\n' + codeblock
        } 

        else if(line[0] == '%' && line[1] == 't' && line[2] == 'e' && line[3] == 'x' && line[4] == 't') {

            var codeblock = '<span>'

            for(var i = linei - 1; i < lines.length; i++) {
                
                if(!lines[i].includes('<<')) {
                    if(lines[i].includes('text>')) {
                        codeblock += lines[i].replace('text>', '')
                    } else {
                        codeblock += '\n' + lines[i]
                    }
                } else
                    break

                
            }
            codeblock +=  lines[i].substring(0, lines[i].indexOf('<<')).replace('%text>', '') + '</span>'
            documentCode += codeblock.replace('%', '')
        } 

        else if(line[0] == 'c' && line[1] == 's' && line[2] == 's') {
            var codeblock = '<style>'

            for(var i = linei - 1; i < lines.length; i++) {
                if(!lines[i].includes('<<')) {
                    if(lines[i].includes('css>')) {
                        codeblock += lines[i].replace('css>', '')
                    } else {
                        codeblock += '\n' + lines[i].replace('css>', '')
                    }
                } else
                    break
            }
            codeblock += '\n' + lines[i].substring(0, lines[i].indexOf('<<')).replace('css>') + '</style>'
            documentCode += '\n' + codeblock
        } 
    })
    documentCode += `
    </body>
</html>`

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