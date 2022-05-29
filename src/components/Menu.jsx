const Menu = ({ packages, onMenuItemClick }) => {
  return (
    <aside className="menu">
      <p className="menu-label">Packages</p>
      <div style={{ height: "80vh", overflowY: "scroll" }}>
        <ul className="menu-list ">
          {packages.map((pkg) => (
            <li key={pkg.name} onClick={() => onMenuItemClick(pkg)}>
              <p className="is-underlined">{pkg.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Menu;
