# Lop Language
Lop is a language interpreter for making websites.

[![CircleCI](https://circleci.com/gh/Lop-Language/lop.svg?style=svg)](https://circleci.com/gh/Lop-Language/lop) ![downloads](https://img.shields.io/npm/dt/lop-language) ![version](https://img.shields.io/npm/v/lop-language) 

![issues](https://img.shields.io/github/issues/lop-language/lop) ![pullrequests](https://img.shields.io/github/issues-pr/lop-language/lop) 
[![star](https://img.shields.io/github/stars/lop-language/lop?style=social)](https://github.com/lop-language/lop) [![watch](https://img.shields.io/github/watchers/lop-language/lop?style=social)](https://github.com/lop-language/lop)

### [SYNTAX UPDATE] Multi line items must use '<<' instead of '<' to close them off as of 1.0.1!

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
<<

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
<<
```
And a multi-value object would be an object that has multiple values, like code, which has 2 values, language and text.
```
code-js>
console.log('multiple values.')
<<
```
