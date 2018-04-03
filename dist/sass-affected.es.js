import firstline from 'firstline';
import sassGraph from 'sass-graph';

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

const findMessage = async file => {
  const possibleMsg = await firstline(file);

  if (possibleMsg.startsWith(magicString)) {
    return possibleMsg.substring(magicString.length);
  }

  return `sass-affected: ${file}`;
};

var index = (async (sassDir, changedFiles) => {
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
  .map(file => file.split(`${path}/`)[1]))].map(async file => ({
    file,
    message: await findMessage(`${path}/${file}`)
  }));
  return {
    roots: await Promise.all(roots),
    missing
  };
});

export default index;
