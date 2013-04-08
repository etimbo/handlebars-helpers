(function() {
  var HTML, Handlebars, Utils;

  Handlebars = require('./helpers').Handlebars;

  HTML = require('../utils/html');

  Utils = require('../utils/utils');

  Handlebars.registerHelper('ul', function(context, options) {
    return ("<ul " + (HTML.parseAttributes(options.hash)) + ">") + context.map(function(item) {
      return "<li>" + (options.fn(item)) + "</li>";
    }).join('\n') + "</ul>";
  });

  Handlebars.registerHelper('ol', function(context, options) {
    return ("<ol " + (HTML.parseAttributes(options.hash)) + ">") + context.map(function(item) {
      return "<li>" + (options.fn(item)) + "</li>";
    }).join('\n') + "</ol>";
  });

  Handlebars.registerHelper('br', function(count, options) {
    var br, i;

    br = '<br>';
    if (!Utils.isUndefined(count)) {
      i = 0;
      while (i < count - 1) {
        br += '<br>';
        i++;
      }
    }
    return Utils.safeString(br);
  });

  /*
  Convert new line (\n) to <br>
  from http://phpjs.org/functions/nl2br:480
  */


  Handlebars.registerHelper('nl2br', function(text) {
    var nl2br;

    nl2br = (text + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1" + "<br>" + "$2");
    return new Handlebars.SafeString(nl2br);
  });

  /*
  link helper function.
  
  This will escape the passed in parameters, but mark the response as safe,
  so Handlebars will not try to escape it even if the "triple-stash" is not used.
  
  Usage:
  
  {{link 'href' 'title'}}
  */


  Handlebars.registerHelper('link', function(url, text) {
    var result;

    url = Handlebars.Utils.escapeExpression(url);
    text = Handlebars.Utils.escapeExpression(text);
    result = '<a class="" href="' + url + '" title="' + text + '">' + text + '</a>';
    return new Handlebars.SafeString(result);
  });

}).call(this);