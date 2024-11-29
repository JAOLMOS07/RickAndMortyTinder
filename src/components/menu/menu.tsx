
import Link from "next/link";
import { BiSolidMapAlt } from "react-icons/bi";
import { FaHeart, FaThumbsDown } from "react-icons/fa";
import { TfiMapAlt } from "react-icons/tfi";

export default function NavBar() {
  return (
    <nav className="bg-green-900 text-white fixed top-0 left-0 w-full z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Nombre de la app */}
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-gray-300">
            Rick and Morty Tinder
          </Link>
        </div>

        {/* Enlaces de navegación */}
        <div className="space-x-6 flex items-center">
          <Link
            href="/characters/likes"
            className="hover:text-gray-300 flex gap-2 items-center"
          >
            <FaHeart size={20} />
            <span className="hidden sm:inline">Likes</span>
          </Link>
          <Link
            href="/characters/dislikes"
            className="hover:text-gray-300 flex gap-2 items-center"
          >
            <FaThumbsDown size={20} />
            <span className="hidden sm:inline">Dislikes</span>
          </Link>
          <Link
            href="/locations"
            className="hover:text-gray-300 flex gap-2 items-center"
          >
            <BiSolidMapAlt size={20} />
            <span className="hidden sm:inline">Mapa</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
