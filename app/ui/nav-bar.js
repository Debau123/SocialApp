"use client";
import NavLink from "./nav-link";
import { HomeIcon, SearchIcon, UserIcon, CameraIcon, LayoutGridIcon, LogOutIcon } from "lucide-react";

export default function NavBar({ session }) {
  return (
    <nav className="flex flex-col gap-6 sticky top-0 h-screen w-48 border-r p-4 shadow-md shadow-gray-400 dark:shadow-gray-600">
      {/* Logo */}
      <div className="mb-4">
        <img
          className="dark:invert w-28 mx-auto"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
          alt="Logo"
        />
      </div>

      {/* Links de navegación */}
      <div className="flex flex-col gap-4">
        <NavLink ruta="/" texto="Home" Icono={HomeIcon} />
        <NavLink ruta="/search" texto="Search" Icono={SearchIcon} />
        <NavLink ruta="/browse" texto="Browse" Icono={LayoutGridIcon} />
        <NavLink ruta="/profile" texto="Profile" Icono={UserIcon} />
        <NavLink ruta="/create" texto="Create" Icono={CameraIcon} />
      </div>

      {/* Botón de Logout */}
      <div className="mt-auto">
        <a
          href="/auth/logout"
          className="flex items-center gap-2 text-red-500 hover:text-red-700 transition"
        >
          <LogOutIcon className="w-5 h-5" />
          Logout
        </a>
      </div>
    </nav>
  );
}
