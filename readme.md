# Lop Language
Lop is a language interpreter for making websites.

### Read the full documentation [here](https://github.com/Lop-Language/lop/wiki)

## Installing
```
npm i -g lop-language
```

## Usage
```
lop [filename].lop
```
The lop command creates an HTML file with the same name in the same folder that 

## Basic Syntax
```
Normal object
[tagname]>[value]

Same line object
%[tagname]>[value]

Multi-Line object
%[tagname]>
[values]
<

Multi-value object
%[tagname]-[value1]>[value2]
```
A normal object would be something like, let's say.. A header.
```
h>Hello, World!
```
A same line object would be an object thats on the same line as the last line, For instance, a link.
```
link>https://www.google.com
```
A multi-line object would be an object that can have multiple lines, such as text.
```
text>
Hello, World!
<
```
And a multi-value object would be an object that has multiple values, like code, which has 2 values, language and text.
```
code-js>
console.log('multiple values.')
<
```
