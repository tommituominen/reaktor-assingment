import { useEffect, useState } from "react";
import Card from "./Card";
const PackageDetails = ({
  pkg,
  onPkgClick,
  checkIfPkgInstalled,
  getReverseDeps,
}) => {
  const [reverseDeps, setReverseDeps] = useState([]);
  useEffect(() => {
    setReverseDeps(getReverseDeps(pkg.name));
  }, [pkg, getReverseDeps]);

  return (
    <div className="box">
      <div className="card">
        <p className="card-header-title">Package details</p>
        <div className="card-content pt-0">
          <p>
            <b>Name: </b>
            {pkg.name}
          </p>
          <p>
            <b>Description: </b>
            {pkg.description}
          </p>
        </div>
      </div>
      {pkg.deps && (
        <Card
          title="Dependencies"
          pkgs={Object.keys(pkg.deps)}
          onPkgClick={onPkgClick}
          checkIfPkgInstalled={checkIfPkgInstalled}
        />
      )}

      {pkg.extras && (
        <Card
          title="Optional dependencies"
          pkgs={Object.keys(pkg.extras)}
          onPkgClick={onPkgClick}
          checkIfPkgInstalled={checkIfPkgInstalled}
        />
      )}

      {reverseDeps?.length > 0 && (
        <Card
          title="Reverse dependencies"
          pkgs={reverseDeps}
          onPkgClick={onPkgClick}
          checkIfPkgInstalled={checkIfPkgInstalled}
        />
      )}
    </div>
  );
};

export default PackageDetails;
