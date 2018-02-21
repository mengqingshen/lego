const fs = require('fs')
const path = require('path')

const entries = []

function findEntries (parentDir) {
  const subs = fs.readdirSync(parentDir)
  if (!subs || !subs[0]) return new Error('empry dir')
  subs.forEach((filePath) => {
    const fullPath = path.join(parentDir, filePath)
    const stat = fs.statSync(fullPath)

    if (stat.isFile() && /\/entry\.js$/.test(fullPath)) {
      entries.push(fullPath)
    }
    else if (stat.isDirectory()) {
      findEntries(fullPath)
    }
  })
}

module.exports = (dir) => {
  findEntries(dir)
  return entries
}
