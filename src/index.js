import fs from "fs";
import chalk from "chalk";

function extractLinks(text) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturLinks = [...text.matchAll(regex)];
  const result = capturLinks.map((captur) => ({
    [captur[1]]: captur[2],
  }));
  return result.length !== 0 ? result : "Not links file!";
}

function treatError(erro) {
  throw new Error(chalk.red(erro.code, "Not meet file!"));
}

// Usando async/await
async function fileHandle(filePath) {
  try {
    const encoding = "utf-8";
    const text = await fs.promises.readFile(filePath, encoding);
    return extractLinks(text);
  } catch (erro) {
    treatError(erro);
  }
}

// usando then()
/*function pegaArquivo(caminhoDoArquivo) {
  const encoding = "utf-8";
  fs.promises
    .readFile(caminhoDoArquivo, encoding)
    .then((texto) => console.log(chalk.green(texto)))
    .catch(treatError);
}
*/

export default fileHandle;
