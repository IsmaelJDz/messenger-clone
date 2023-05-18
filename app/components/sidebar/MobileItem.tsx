'use client';
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      className={clsx(
        `
      group
      flex
      gap-x-3
      text-sm
      landing-6
      font-semibold
      w-full
      justify-center
      p-4
      text-gray-500
      hover:text-black
      hover-bg-gray-100
    `,
        active && 'bg-gray-100 text-black'
      )}
      href={href}
      onClick={onClick}>
      <Icon className='w-6 h-6' />
    </Link>
  );
};

export default MobileItem;
