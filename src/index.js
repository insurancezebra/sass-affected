// @flow

import { parseDir } from "sass-graph";

export default () => {
  console.log(JSON.stringify(parseDir(`mocks`), null, 2));
};
