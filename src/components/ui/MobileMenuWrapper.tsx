'use client';

/**
 * MobileMenuWrapper - Client-side wrapper for MobileMenu
 * Handles state management for the menu
 */

import { useState } from 'react';
import MobileMenu from './MobileMenu';

interface NavLink {
  text: string;
  href: string;
}

interface MobileMenuWrapperProps {
  links: NavLink[];
}

export default function MobileMenuWrapper({ links }: MobileMenuWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return <MobileMenu isOpen={isOpen} onToggle={handleToggle} links={links} />;
}
