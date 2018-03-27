"use strict";

var sassGraph = require("sass-graph");

var index = (sassDir, changedFiles) => {
  console.log(JSON.stringify(sassGraph.parseDir(sassDir), null, 2));
};

module.exports = index;
