"use client";

import React, { useState, useRef, useEffect } from "react";
import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface IBodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<IBodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bntRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bntRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages(current => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bntRef?.current?.scrollIntoView();
    };

    pusherClient.bind("messages:new", messageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
    };
  }, [conversationId]);

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
