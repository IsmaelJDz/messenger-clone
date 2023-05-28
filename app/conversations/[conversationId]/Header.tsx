"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Conversation, User } from "@prisma/client";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import useOtherUser from "@/app/hooks/useOtherUser";
import { HiChevronLeft } from "react-icons/hi";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import ProfileDrawer from "./ProfileDrawer";

interface IHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<IHeaderProps> = ({ conversation }) => {
  const otherUsers = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className='
    bg-white
    w-full
    flex
    border-b-[1px]
    sm:px-4
    py-3
    px-4
    lg:px-6
    justify-between
    items-center
    shadow-sm
  '>
        <div className='flex items-center gap-3 '>
          <Link
            className='block transition cursor-pointer lg:hidden text-sky-500 hover:text-sky-600'
            href='/conversation'>
            <HiChevronLeft size={32} />
          </Link>

          {conversation?.isGroup ? (
            <AvatarGroup users={conversation?.users} />
          ) : (
            <Avatar currentUser={otherUsers} />
          )}

          <div className='flex flex-col '>
            <div>{conversation?.name || otherUsers?.name}</div>
            <div className='text-sm font-light text-neutral-500'>
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          onClick={() => setDrawerOpen(true)}
          size={32}
          className='transition cursor-pointer text-sky-500 hover:text-sky-600'
        />
      </div>
    </>
  );
};

export default Header;
