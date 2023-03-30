import fileHandle from "./index.js";
import fs from "fs";
import listValidated from "./http-validates.js";
import chalk from "chalk";

const path = process.argv;

async function prints(validates, results, identifier = "") {
  if (validates) {
    console.log(
      chalk.yellow("validated list"),
      chalk.black.bgGreen(identifier),
      await listValidated(results)
    );
  } else {
    console.log(
      chalk.yellow("lista de links"),
      chalk.black.bgGreen(identifier),
      results
    );
  }
}

async function textProcess(argumentPath) {
  const path = argumentPath[2];
  const validatesLinks = argumentPath[3] === "--valida";

  try {
    fs.lstatSync(path);
  } catch (erro) {
    if (erro.code === "ENOENT") {
      console.log("file or directory no existen!");
      return;
    }
  }

  if (fs.lstatSync(path).isFile()) {
    const result = await fileHandle(path);
    prints(validatesLinks, result);
  } else if (fs.lstatSync(path).isDirectory()) {
    const files = await fs.promises.readdir(path);
    files.forEach(async (fileName) => {
      const list = await fileHandle(`${path}/${fileName}`);
      prints(validatesLinks, list, fileName);
    });
  }
}
textProcess(path);
