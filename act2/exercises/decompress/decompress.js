#!/usr/bin/env node

var gzip = require('zlib').createGunzip();

// pipe process.stdin into gzip
// then pipe gzip into process.stdout

// run this with cat mystery.jpg.gz | ./decompress.js > out.jpg
