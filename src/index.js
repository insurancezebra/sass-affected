// @flow

import { parseDir } from "sass-graph";

export default (sassDir: string, changedFiles: string[]) => {
  console.log(JSON.stringify(parseDir(sassDir), null, 2));
};
