import { ChatBubbleOvalLeftIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default ({content, url}) => {
  return (
    <div className=" flex flex-col gap-1 max-w-md">
      <div className="flex gap-2">
        <Image
          src="/ansu.png"
          alt="avatar"
          width={24}
          height={24}
          className="rounded-full"
        />
        <span>Iñaki</span>
        <span>1 dia</span>
      </div>
      <div>
        <Image src={url} alt="post" width={448} height={448} />
      </div>
      <div>
        <div className="flex gap-2">
          <HeartIcon className="h-6 w-6" />
          <ChatBubbleOvalLeftIcon className="h-6 w-6" />
        </div>
        <span>1234 Me gusta</span>
      </div>
      <div>
        <p>
          <span className="font-bold">Iñaki</span> {content}
        </p>
      </div>
      <div>
        <Link href="#">Ver los 33 comentarios</Link>
      </div>
      <div>
        <input className="w-full dark:bg-neutral-950 outline-0" type="text" placeholder="Add coment" />
      </div>
    </div>
  );
};