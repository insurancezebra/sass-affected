'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var firstline = _interopDefault(require('firstline'));
var sassGraph = _interopDefault(require('sass-graph'));

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }

      function _next(value) {
        step("next", value);
      }

      function _throw(err) {
        step("throw", err);
      }

      _next();
    });
  };
}

const magicString = "// sass-affected "; // Recursive

const findRoots = (manifest, currentPath, roots = []) => {
  const {
    importedBy
  } = manifest[currentPath];

  if (importedBy.length) {
    return importedBy.reduce((acc, curr) => [...acc, ...findRoots(manifest, curr)], roots);
  }

  return [currentPath];
};

const findMessage =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (file) {
    const possibleMsg = yield firstline(file);

    if (possibleMsg.startsWith(magicString)) {
      return possibleMsg.substring(magicString.length);
    }

    return `sass-affected: ${file}`;
  });

  return function findMessage(_x) {
    return _ref.apply(this, arguments);
  };
}();

var index = /*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(function* (sassDir, changedFiles) {
    const {
      index: manifest,
      loadPaths
    } = sassGraph.parseDir(sassDir);
    const [path] = loadPaths;
    const missing = [];
    const roots = [// Deduplicate
    ...new Set(changedFiles // Add path in order to match manifest keys
    .map(file => `${path}/${file}`) // Check for missing files
    .filter(filePath => {
      if (!manifest[filePath]) {
        // eslint-disable-next-line no-console
        missing.push(filePath);
        return false;
      }

      return true;
    }) // Find root files and flatten the array
    .reduce((acc, curr) => [...acc, ...findRoots(manifest, curr)], []) // Remove path
    .map(file => file.split(`${path}/`)[1]))].map(
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(function* (file) {
        return {
          file,
          message: yield findMessage(`${path}/${file}`)
        };
      });

      return function (_x4) {
        return _ref3.apply(this, arguments);
      };
    }());
    return {
      roots: yield Promise.all(roots),
      missing
    };
  });

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
})();

module.exports = index;
