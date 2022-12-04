import React from 'react';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/Footer';
import Header from '../components/Header';

import { LayoutProps } from '../types/layout';

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <>
      <ToastContainer />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
