import NavLink from "./nav-link";

export default () => {
  return (
    <nav className="flex flex-col gap-3 h-dvh border-e p-4">
      <p className="hidden sm:block">Social App</p>
      <NavLink ruta="/" texto="Home" />
      <NavLink ruta="/search" texto="Search" />
      <NavLink ruta="/create" texto="Create" />
      <NavLink ruta="/profile" texto="Profile" />
    </nav>
  );
};