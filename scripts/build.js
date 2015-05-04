var Metalsmith = require('metalsmith')
  , sass = require('metalsmith-sass')
  , beautify = require('metalsmith-beautify')
  , templates = require('metalsmith-templates')
  , markdown = require('metalsmith-markdown')
  , permalinks = require('metalsmith-permalinks')
  , collections = require('metalsmith-collections')
  , marked = require('marked')
  ;

function preview(files, ms, done) {
  Object.keys(files).forEach(function (file) {
    if (!/.md/.test(file)) {
      return;
    }
    var lines = files[file].contents.toString().split('\n');

    preview = lines.filter(function (line, i) {
      return i <= 2;
    }).concat('\n').concat('...').join('\n');

    files[file].preview = marked(preview, {});
  });
  done();
}

Metalsmith(__dirname + '/..')
  .source('./src')
  .destination('./build')
  .use(preview)
  .use(markdown())
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
