'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sassGraph = _interopDefault(require('sass-graph'));

var index = ((sassDir, changedFiles) => {
  const {
    index
  } = sassGraph.parseDir(sassDir);
  console.log(changedFiles, index);
  console.log(JSON.stringify(sassGraph.parseDir(sassDir), null, 2));
});

module.exports = index;
