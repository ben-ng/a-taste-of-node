#!/usr/bin/env node

var zlib = require('zlib')
  , gzip = zlib.createGzip();

process.stdin.pipe(gzip)
             .pipe(process.stdout);
