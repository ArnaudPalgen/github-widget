// Generated by CoffeeScript 1.3.3

/*
# to minify: 
java -jar /usr/local/closure-compiler/compiler.jar \
  --compilation_level SIMPLE_OPTIMIZATIONS \
  --js github-widget.js \
  --js_output_file github-widget.min.js
*/


(function() {
  var cls, get, init, jsonp, make, makeWidget, text,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty;

  makeWidget = function(payload, div) {
    var repo, siteRepoName, user, _i, _len, _ref, _results;
    make({
      className: 'gw-clearer',
      prevSib: div
    });
    user = div.getAttribute('data-user');
    siteRepoName = "" + user + ".github.com";
    _ref = payload.data.sort(function(a, b) {
      return b.watchers - a.watchers;
    });
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      repo = _ref[_i];
      if (repo.fork || repo.name === siteRepoName || !(repo.description != null) || repo.description === '') {
        continue;
      }
      _results.push(make({
        parent: div,
        className: 'gw-repo-outer',
        kids: [
          make({
            className: 'gw-repo',
            kids: [
              make({
                className: 'gw-title',
                kids: [
                  make({
                    tag: 'ul',
                    className: 'gw-stats',
                    kids: [
                      make({
                        tag: 'li',
                        text: repo.watchers,
                        className: 'gw-watchers'
                      }), make({
                        tag: 'li',
                        text: repo.forks,
                        className: 'gw-forks'
                      })
                    ]
                  }), make({
                    tag: 'a',
                    href: repo.html_url,
                    text: repo.name,
                    className: 'gw-name'
                  })
                ]
              }), repo.language != null ? make({
                className: 'gw-lang',
                text: repo.language
              }) : void 0, make({
                text: repo.description,
                className: 'gw-repo-desc'
              })
            ]
          })
        ]
      }));
    }
    return _results;
  };

  init = function() {
    var div, _i, _len, _ref, _results;
    _ref = get({
      tag: 'div',
      cls: 'github-widget'
    });
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      div = _ref[_i];
      _results.push((function(div) {
        var url;
        url = "https://api.github.com/users/" + (div.getAttribute('data-user')) + "/repos?callback=<cb>";
        return jsonp({
          url: url,
          success: function(payload) {
            return makeWidget(payload, div);
          }
        });
      })(div));
    }
    return _results;
  };

  cls = function(el, opts) {
    var addClasses, c, classHash, classes, hasClasses, k, removeClasses, toggleClasses, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3;
    if (opts == null) {
      opts = {};
    }
    classHash = {};
    classes = el.className.match(cls.re);
    if (classes != null) {
      for (_i = 0, _len = classes.length; _i < _len; _i++) {
        c = classes[_i];
        classHash[c] = true;
      }
    }
    hasClasses = (_ref = opts.has) != null ? _ref.match(cls.re) : void 0;
    if (hasClasses != null) {
      for (_j = 0, _len1 = hasClasses.length; _j < _len1; _j++) {
        c = hasClasses[_j];
        if (!classHash[c]) {
          return false;
        }
      }
      return true;
    }
    addClasses = (_ref1 = opts.add) != null ? _ref1.match(cls.re) : void 0;
    if (addClasses != null) {
      for (_k = 0, _len2 = addClasses.length; _k < _len2; _k++) {
        c = addClasses[_k];
        classHash[c] = true;
      }
    }
    removeClasses = (_ref2 = opts.remove) != null ? _ref2.match(cls.re) : void 0;
    if (removeClasses != null) {
      for (_l = 0, _len3 = removeClasses.length; _l < _len3; _l++) {
        c = removeClasses[_l];
        delete classHash[c];
      }
    }
    toggleClasses = (_ref3 = opts.toggle) != null ? _ref3.match(cls.re) : void 0;
    if (toggleClasses != null) {
      for (_m = 0, _len4 = toggleClasses.length; _m < _len4; _m++) {
        c = toggleClasses[_m];
        if (classHash[c]) {
          delete classHash[c];
        } else {
          classHash[c] = true;
        }
      }
    }
    el.className = ((function() {
      var _results;
      _results = [];
      for (k in classHash) {
        _results.push(k);
      }
      return _results;
    })()).join(' ');
    return null;
  };

  cls.re = /\S+/g;

  get = function(opts) {
    var el, els, hasCls, inside, tag, _ref, _ref1, _ref2, _ref3;
    if (opts == null) {
      opts = {};
    }
    inside = (_ref = opts.inside) != null ? _ref : document;
    tag = (_ref1 = opts.tag) != null ? _ref1 : '*';
    if (opts.id != null) {
      return inside.getElementById(opts.id);
    }
    hasCls = opts.cls != null;
    if (hasCls && tag === '*' && (inside.getElementsByClassName != null)) {
      return inside.getElementsByClassName(opts.cls);
    }
    els = inside.getElementsByTagName(tag);
    if (hasCls) {
      els = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = els.length; _i < _len; _i++) {
          el = els[_i];
          if (cls(el, {
            has: opts.cls
          })) {
            _results.push(el);
          }
        }
        return _results;
      })();
    }
    if (!(opts.multi != null) && (_ref2 = tag.toLowerCase(), __indexOf.call(get.uniqueTags, _ref2) >= 0)) {
      return (_ref3 = els[0]) != null ? _ref3 : null;
    } else {
      return els;
    }
  };

  get.uniqueTags = 'html body frameset head title base'.split(' ');

  text = function(t) {
    return document.createTextNode('' + t);
  };

  make = function(opts) {
    var c, k, t, v, _i, _len, _ref;
    if (opts == null) {
      opts = {};
    }
    t = document.createElement((_ref = opts.tag) != null ? _ref : 'div');
    for (k in opts) {
      if (!__hasProp.call(opts, k)) continue;
      v = opts[k];
      switch (k) {
        case 'tag':
          continue;
        case 'parent':
          v.appendChild(t);
          break;
        case 'kids':
          for (_i = 0, _len = v.length; _i < _len; _i++) {
            c = v[_i];
            if (c != null) {
              t.appendChild(c);
            }
          }
          break;
        case 'prevSib':
          v.parentNode.insertBefore(t, v.nextSibling);
          break;
        case 'text':
          t.appendChild(text(v));
          break;
        case 'cls':
          t.className = v;
          break;
        default:
          if ((k.substring(0, 2)) === 'on') {
            if (t.addEventListener != null) {
              t.addEventListener(k.substring(2), v, false);
            } else {
              t.attachEvent(k, v);
            }
          } else {
            t[k] = v;
          }
      }
    }
    return t;
  };

  jsonp = function(opts) {
    var callbackName, url, _ref, _ref1;
    callbackName = (_ref = opts.callback) != null ? _ref : '_JSONPCallback_' + jsonp.callbackNum++;
    url = opts.url.replace('<cb>', callbackName);
    window[callbackName] = (_ref1 = opts.success) != null ? _ref1 : jsonp.noop;
    return make({
      tag: 'script',
      src: url,
      parent: get({
        tag: 'head'
      })
    });
  };

  jsonp.callbackNum = 0;

  jsonp.noop = function() {};

  init();

}).call(this);
