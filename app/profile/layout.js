import Link from "next/link";

export default ({children}) => {
  return (
    <div>
      <div>
        <Link href="/profile">Perfil</Link>
        <Link href="/profile/likes">Me gustas</Link>
        <Link href="/profile/comments">Comentarios</Link>
      </div>
      { children }
    </div>
  );
};