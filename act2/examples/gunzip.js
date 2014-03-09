#!/usr/bin/env node

var zlib = require('zlib')
  , gzip = zlib.createGunzip();

process.stdin.pipe(gzip)
             .pipe(process.stdout);
