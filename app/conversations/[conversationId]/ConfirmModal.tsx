"use client";

import React from "react";
import { Dialog } from "@headlessui/react";
import useConversation from "@/app/hooks/useConversation";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import axios from "axios";

interface IConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<IConfirmModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = React.useState(false);

  const onDelete = React.useCallback(() => {
    setIsLoading(true);
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(err => {
        toast.error("Something went wrong. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [conversationId, onClose, router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='sm:flex sm:items-start'>
        <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10'>
          <FiAlertTriangle className='w-6 h-6 text-red-600' />
        </div>
        <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
          <Dialog.Title
            as='h3'
            className='text-base font-semibold leading-6 text-gray-900'>
            Delete conversation
          </Dialog.Title>
          <div className='mt-2'>
            <p className='text-sm text-gray-500'>
              Are you sure you want to delete this conversation? All
              of your data
            </p>
          </div>
        </div>
      </div>
      <div className='gap-2 mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
