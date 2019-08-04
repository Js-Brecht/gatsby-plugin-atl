const path = require('path');

const themePath = path.resolve(path.join(".", "theme"));

module.exports = {
    "out": "docs",
    "target": "es6",
    "theme": themePath,
    "readme": "README.md",
    "mode": "file",
    "hideGenerator": true,
}
