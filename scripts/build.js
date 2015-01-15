var Metalsmith = require('metalsmith')
  , sass = require('metalsmith-sass')
  , beautify = require('metalsmith-beautify')
  , templates = require('metalsmith-templates')
  , markdown = require('metalsmith-markdown')
  , permalinks = require('metalsmith-permalinks')
  ;

Metalsmith(__dirname + '/..')
  .source('./src')
  .destination('./build')
  .use(markdown())
  .use(templates({ engine: 'swig', directory: './templates' }))
  .use(permalinks({ relative: false }))
  .use(sass({ outputStyle: 'expanded', outputDir: 'stylesheets/' }))
  .use(beautify({ css: true, html: true, indent_size: 2, indent_char: ' ', preserve_newlines: false }))
  .build(function (error, files) {
    if (error) { console.log(error, files); }
  });
