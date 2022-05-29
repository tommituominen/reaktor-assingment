import { useState } from "react";
import FileInput from "./components/FileInput";
import Menu from "./components/Menu";
import PackageDetails from "./components/PackageDetails";

const App = () => {
  const [packages, setPackages] = useState([]);
  const [chosenPackage, setChosenPackage] = useState({});

  return (
    <main className="container my-6">
      <FileInput setPackages={setPackages} />
      <div className="columns">
        <div className="column is-one-third">
          <Menu
            packages={packages}
            onMenuItemClick={(menuItem) => setChosenPackage(menuItem)}
          />
        </div>
        <div className="column is-two-thirds">
          <PackageDetails
            getReverseDeps={(pkgName) =>
              packages
                .filter((pkg) => Object.keys(pkg.deps || {}).includes(pkgName))
                .map((pkg) => pkg.name)
            }
            checkIfPkgInstalled={(pkgName) =>
              packages.find((pkg) => pkg.name === pkgName)
            }
            onPkgClick={(pkgName) =>
              setChosenPackage(packages.find((pkg) => pkg.name === pkgName))
            }
            pkg={chosenPackage}
          />
        </div>
      </div>
    </main>
  );
};

export default App;
