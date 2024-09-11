const fs = require("fs");
const path = require("path");
const { sha3_256 } = require("js-sha3");

const carpeta = "./files";

const email = "diego.castillo170901@gmail.com";

function callSHA3_256(file) {
  const fileData = fs.readFileSync(file);
  return sha3_256(fileData);
}

let archivos = fs.readdirSync(carpeta);

let hashes = archivos.map((file) => callSHA3_256(path.join(carpeta, file)));

hashes.sort();

console.log(sha3_256(hashes.join("") + email));
