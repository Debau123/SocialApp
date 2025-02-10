'use client'

import { insertLike } from "../lib/action"
import { HeartIcon } from "@heroicons/react/24/outline"
import clsx from "clsx";
import { useState } from "react";
import { removeLike } from "../lib/action";



export default ({ post_id, user_id, isLikedInitial}) => {
    
    let [isLiked, setIsLiked ]= useState(isLikedInitial);
    
    function togleLike() {

        if(isLiked){
            removeLike(post_id, user_id)
            setIsLiked(false)
            
        }else{

            insertLike(post_id, user_id)
            setIsLiked(true)
        }
    }

  return (
    <HeartIcon
      onClick={togleLike}
      className={clsx("h-6 w-6", { "text-red-500": isLiked })}
    />
  );
};