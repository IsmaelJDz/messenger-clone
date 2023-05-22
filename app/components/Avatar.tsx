"use client";

import React from "react";
import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  currentUser?: User;
}

const Avatar: React.FC<AvatarProps> = ({ currentUser }) => {
  return (
    <div className='relative '>
      <div className='relative inline-block overflow-hidden rounded-full h-9 w-9 md:h-11 md:w-11'>
        <Image
          alt='Avatar'
          src={currentUser?.image || "/images/placeholder.jpg"}
          fill
        />
      </div>
      <span className='absolute top-0 right-0 block w-2 h-2 bg-green-500 rounded-full ring-2 ring-white md:h-3 md:w-3' />
    </div>
  );
};

export default Avatar;
