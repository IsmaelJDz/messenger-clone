"use client";

import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { Oi } from "next/font/google";
import { IoClose } from "react-icons/io5";

interface IModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Transition.Root as={Fragment} show={isOpen}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-full p-4 text-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel className='relative w-full px-4 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xsl sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                <div className='absolute top-0 right-0 z-10 hidden pt-4 pr-4 sm:block'>
                  <button
                    onClick={onClose}
                    type='button'
                    className='text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'>
                    <span className='sr-only'>Close</span>
                    <IoClose className='w-6 h-6' />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
