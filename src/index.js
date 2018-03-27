// @flow

import sassGraph from "sass-graph";

type Manifest = {
  [key: string]: {
    imports: string[],
    importedBy: string[],
    modified: string
  }
};

// Recursive
const findRoots = (
  manifest: Manifest,
  currentPath: string,
  roots: string[] = []
): string[] => {
  const { importedBy } = manifest[currentPath];
  if (importedBy.length) {
    return importedBy.reduce(
      (acc, curr) => [...acc, ...findRoots(manifest, curr)],
      roots
    );
  }
  return [currentPath];
};

export default (sassDir: string, changedFiles: string[]) => {
  const { index: manifest, loadPaths } = sassGraph.parseDir(sassDir);
  const [path] = loadPaths;

  const roots = [
    // Deduplicate
    ...new Set(
      changedFiles
        // Add path in order to match manifest keys
        .map(file => `${path}/${file}`)
        // Find root files
        .map(filePath => findRoots(manifest, filePath))
        .reduce((acc, curr) => [...acc, ...curr], [])
        // Remove path
        .map(file => file.split(`${path}/`)[1])
    )
  ];

  return roots;
};
