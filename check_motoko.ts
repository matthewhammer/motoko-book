import mo from "motoko"
import fs from "fs"
import path from "path"

let folders = findFolder("src", "_mo");
console.log(folders)
folders.forEach(folder => checkMoFiles(folder));

function findFolder(dir: string, folderName: string) {
  let array: string[] = []
  let files = fs.readdirSync(dir)
  for (let i = 0; i < files.length; i++) {
    let filePath = path.join(dir, files[i])
    let stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      if (files[i] === folderName) {
        array.push(filePath)
      } else {
        let result = findFolder(filePath, folderName)
        if (result) {
          result.forEach((value) => array.push(value))
        }
      }
    }
  }
  return array
}

function checkMoFiles(directoryPath : string) {
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err)
    }
    files.forEach(function (file) {
      if (path.extname(file) === '.mo') {
        checkMotoko(path.join(directoryPath, file))
      }
    })
  })
}

function checkMotoko(file: string) {
  let f = fs.readFileSync(file).toString()
  mo.write(file, f)
  let check = mo.check(file)
  mo.delete(file)

  if (check.length === 0) {
    console.log("CORRECT: " + file)
  } else {
    console.log("ERROR: " + file)
    console.log(check)
  }
}
