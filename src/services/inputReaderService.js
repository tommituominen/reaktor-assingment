const convertStringToJSON = (text) => {
  return JSON.parse(
    `{${text
      .trim()
      .replaceAll(" =", ":")
      .split("\n")
      .map((row) => {
        let formattedRow = `"${row.replace(":", '":')}`;
        if (formattedRow.includes("{")) {
          formattedRow = `${formattedRow.split(":")[0]}:""`;
        }
        return formattedRow;
      })
      .join(",")}}`
  );
};

const readInputFile = (e, setPackages) => {
  const fr = new FileReader();
  const file = e.target.files[0];
  fr.readAsText(file);

  fr.onload = () => {
    const packagesText = fr.result.split("[metadata]")[0];
    const separatePackages = packagesText
      .split("[[package]]")
      .filter((row) => row);

    const formattedPackages = separatePackages.map((p) => {
      let packageInfo;
      if (
        p.includes("[package.dependencies]") &&
        p.includes("[package.extras]")
      ) {
        packageInfo = convertStringToJSON(p.split("[package.dependencies]")[0]);
        const main = p.split("[package.dependencies]")[1];
        const deps = main.split("[package.extras]");
        packageInfo.deps = convertStringToJSON(deps[0]);
        packageInfo.extras = convertStringToJSON(deps[1]);
      } else if (p.includes("[package.dependencies]")) {
        packageInfo = convertStringToJSON(p.split("[package.dependencies]")[0]);
        packageInfo.deps = convertStringToJSON(
          p.split("[package.dependencies]")[1]
        );
      } else if (p.includes("[package.extras]")) {
        packageInfo = convertStringToJSON(p.split("[package.extras]")[0]);
        packageInfo.deps = convertStringToJSON(p.split("[package.extras]")[1]);
      } else {
        packageInfo = convertStringToJSON(p);
      }
      return packageInfo;
    });
    setPackages(formattedPackages);
  };
};

export default readInputFile;
