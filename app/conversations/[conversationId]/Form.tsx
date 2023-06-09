"use client";

import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const handleUpload = async (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setValue("message", "", { shouldValidate: true });

    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  return (
    <div className='flex items-center w-full gap-2 px-4 py-4 bg-white border-t lg:gap-4'>
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        onUpload={handleUpload}
        uploadPreset='xopiei1w'>
        <HiPhoto size={32} className='text-sky-500' />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-center w-full gap-2 lg:gap-4'>
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          required
          placeholder='Write a message'
        />
        <button
          type='submit'
          className='p-2 transition rounded-full cursor-pointer bg-sky-500 hover:bg-sky-600'>
          <HiPaperAirplane size={18} className='text-white' />
        </button>
      </form>
    </div>
  );
};

export default Form;
