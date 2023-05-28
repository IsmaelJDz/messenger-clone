"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";
import React from "react";

interface IImageModalProps {
  src?: string | null;
  isOpen?: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<IImageModalProps> = ({
  src,
  isOpen,
  onClose,
}) => {
  if (!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='w-80 h-80'>
        <Image alt='Image' className='object-cover' fill src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;
