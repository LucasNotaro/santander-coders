const fs = require('fs');
const path = require('path');

const IGNORED_EXTENSIONS = [
  '.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico',
  '.bmp', '.webp', '.tiff', '.mp4', '.mp3', '.wav', '.db', '.angular', '.gitignore'
];
const IGNORED_FILES = ['package-lock.json', 'a.js', 'b2.js'];
const IGNORED_DIRS = ['node_modules', '.git', '.vscode', '.idea', 'dist'];

function generateProjectStructure(rootPath) {
  const projectName = path.basename(rootPath);

  function processPath(currentPath) {
    const stats = fs.statSync(currentPath);
    const name = path.basename(currentPath);
    const relativePath = path.relative(rootPath, currentPath);

    // Check if item should be ignored
    const isIgnored =
      IGNORED_DIRS.includes(name) ||
      IGNORED_FILES.includes(name) ||
      IGNORED_EXTENSIONS.some(ext => name.endsWith(ext));

    if (stats.isDirectory()) {
      // Process directory
      const children = isIgnored ? null : fs.readdirSync(currentPath)
        .map(child => processPath(path.join(currentPath, child)))
        .filter(Boolean);

      return {
        type: 'directory',
        name,
        path: relativePath,
        ignored: isIgnored,
        ...(children && { children })
      };
    } else {
      // Process file
      if (isIgnored) {
        return {
          type: 'file',
          name,
          path: relativePath,
          ignored: true
        };
      }

      try {
        const content = fs.readFileSync(currentPath, 'utf-8');
        return {
          type: 'file',
          name,
          path: relativePath,
          content
        };
      } catch (error) {
        console.warn(`Could not read file ${currentPath}: ${error.message}`);
        return null;
      }
    }
  }

  const projectStructure = {
    projectName,
    generatedAt: new Date().toISOString(),
    root: processPath(rootPath)
  };

  // Write to project-structure.json
  const outputPath = path.join(rootPath, 'project-structure.json');
  fs.writeFileSync(outputPath, JSON.stringify(projectStructure, null, 2), 'utf-8');

  console.log(`Project structure generated at ${outputPath}`);
  return projectStructure;
}

// Usage example (uncomment and modify path as needed)
generateProjectStructure(process.cwd());

module.exports = generateProjectStructure;
