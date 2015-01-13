var Metalsmith = require('metalsmith')
  , sass = require('metalsmith-sass')
  , beautify = require('metalsmith-beautify')
  ;

Metalsmith(__dirname + '/..')
  .source('./src')
  .destination('./build')
  .use(sass({ outputStyle: 'expanded', outputDir: 'stylesheets/' }))
  .use(beautify({ css: true, html: true, indent_size: 2, indent_char: ' ', preserve_newlines: false }))
  .build(function (error, files) {
    if (error) { console.log(error, files); }
  });;
