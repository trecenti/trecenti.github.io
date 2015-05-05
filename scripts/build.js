var Metalsmith = require('metalsmith')
  , sass = require('metalsmith-sass')
  , beautify = require('metalsmith-beautify')
  , templates = require('metalsmith-templates')
  , markdown = require('metalsmith-markdown')
  , permalinks = require('metalsmith-permalinks')
  , collections = require('metalsmith-collections')
  , drafts = require('metalsmith-drafts')
  , marked = require('marked')
  ;

Metalsmith(__dirname + '/..')
  .source('./src')
  .destination('./build')
  .use(markdown())
  .use(drafts())
  .use(collections({ posts: { pattern: '/posts/*.md', sortBy: 'date', reverse: true } }))
  .use(permalinks({ relative: false, pattern: 'blog/:date/:title', date: 'YYYY/MM' }))
  .use(templates({ engine: 'swig', directory: './templates' }))
  .use(sass({ outputStyle: 'expanded', outputDir: 'stylesheets/' }))
  .use(beautify({ css: true, html: true, indent_size: 2, indent_char: ' ', preserve_newlines: false }))
  .build(function (error, files) {
    if (error) {
      console.log(error, files);
      throw (error);
    }
  });
