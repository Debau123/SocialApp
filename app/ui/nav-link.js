"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLink({ ruta, texto, Icono }) {
  const path = usePathname();

  return (
    <Link
      href={ruta}
      className={clsx("flex items-center gap-2 hover:bg-gray-500 py-2 ps-2 pe-4 rounded", {
        "font-bold pointer-events-none text-blue-500": path === ruta, // Resalta si está activo
      })}
    >
      <Icono className="w-6 h-6" /> {/* Icono dinámico */}
      <span className="hidden sm:block">{texto}</span>
    </Link>
  );
}
