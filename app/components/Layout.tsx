import type { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout: FC = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>{children}</main>

      <Toaster position="bottom-left" />

      <Footer />
    </>
  );
};

export default Layout;
