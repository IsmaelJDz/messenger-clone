"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import React, { useState, useRef } from "react";
import MessageBox from "./MessageBox";

interface IBodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<IBodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bntRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bntRef} className='pt-24' />
    </div>
  );
};

export default Body;
