// @flow

import sassGraph from "sass-graph";

export default (sassDir: string, changedFiles: string[]) => {
  const { index } = sassGraph.parseDir(sassDir);
  console.log(changedFiles, index);
  console.log(JSON.stringify(sassGraph.parseDir(sassDir), null, 2));
};
