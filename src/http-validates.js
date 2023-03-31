function extractsLinks(arrLinks) {
  return arrLinks.map((objectLink) => Object.values(objectLink).join());
}
async function checkStatus(arrUrls) {
  const arrStatus = await Promise.all(
    arrUrls.map(async (urls) => {
      try {
        const response = await fetch(urls);
        return response.status;
      } catch (erro) {
        return manipulationErr(erro);
      }
    })
  );
  return arrStatus;
}

function manipulationErr(erro) {
  if (erro.cause.code === "ENOTFOUND") {
    return "Not meet link!";
  } else {
    return "There is an error!";
  }
}

export default async function listValidated(linksList) {
  const links = extractsLinks(linksList);
  const status = await checkStatus(links);

  return linksList.map((object, indice) => ({
    ...object,
    status: status[indice],
  }));
}
