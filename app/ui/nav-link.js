"use client";

import Link from "next/link";
import { BeakerIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLink({ ruta, texto }) {
  const path = usePathname();

  return (
    <Link
      href={ruta}
      className={clsx("flex gap-2 hover:bg-gray-500 py-2 ps-2 pe-4 rounded", {
        "font-bold pointer-events-none	" : path === ruta,
      })}
    >
      <BeakerIcon className="w-4" />
      <span className="hidden sm:block">{texto}</span>
    </Link>
  );
}