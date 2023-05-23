import React from "react";

import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./Header";
import Body from "./Body";
import Form from "./Form";

interface Iparams {
  conversationId: string;
}

const PageConversation = async ({ params }: { params: Iparams }) => {
  const conversation = await getConversationById(
    params.conversationId
  );
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className='h-full lg:pl-80'>
        <div className='flex flex-col h-full'>
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className='h-full lg:pl-80'>
      <div className='flex flex-col h-full'>
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default PageConversation;
