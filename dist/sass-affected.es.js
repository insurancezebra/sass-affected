import sassGraph from 'sass-graph';

// Recursive
const findRoots = (manifest, currentPath, roots = []) => {
  const {
    importedBy
  } = manifest[currentPath];

  if (importedBy.length) {
    return importedBy.reduce((acc, curr) => [...acc, ...findRoots(manifest, curr)], roots);
  }

  return [currentPath];
};

var index = ((sassDir, changedFiles) => {
  const {
    index: manifest,
    loadPaths
  } = sassGraph.parseDir(sassDir);
  const [path] = loadPaths;
  const roots = [// Deduplicate
  ...new Set(changedFiles // Add path in order to match manifest keys
  .map(file => `${path}/${file}`) // Check for missing files
  .map(filePath => {
    if (!manifest[filePath]) throw new Error(`sass-affected - File missing: ${filePath}`);
    return filePath;
  }) // Find root files
  .map(filePath => findRoots(manifest, filePath)).reduce((acc, curr) => [...acc, ...curr], []) // Remove path
  .map(file => file.split(`${path}/`)[1]))];
  return roots;
});

export default index;
