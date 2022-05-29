const Card = ({ pkgs, checkIfPkgInstalled, onPkgClick, title }) => (
  <div className="card mt-4">
    <p className="card-header-title">{title}</p>
    <div className="card-content pt-0">
      {pkgs.map((pkgName) =>
        checkIfPkgInstalled(pkgName) ? (
          <p
            className="is-underlined"
            onClick={() => onPkgClick(pkgName)}
            key={pkgName}
          >
            {pkgName}
          </p>
        ) : (
          <p key={pkgName}>{pkgName}</p>
        )
      )}
    </div>
  </div>
);

export default Card;
