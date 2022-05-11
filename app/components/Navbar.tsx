import { useUser } from '../utils';
import Aero from './icons/Aero';
import Arrow from './icons/Arrow';
import { useState } from 'react';
import UserDropdown from './UserDropdown';

const Navbar: React.FC = () => {
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-10 py-4 2xl:px-80">
      <img
        src="/icons/aerolab-logo.svg"
        className="hidden 2xl:block"
        alt="Aerolab"
      />
      <img
        src="/icons/aerolab-logo-mobile.svg"
        className="2xl:hidden"
        alt="Aerolab"
      />

      <div className="font-semibold relative z-50  shadow-[0px_2px_12px_rgba(0,0,0,0.08)] flex items-center border border-neutral-300 px-3 py-[7px] rounded-2xl">
        <UserDropdown isOpen={isOpen} />

        <Aero brand />

        <p className="ml-3 mr-4 text-lg text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
          {user.points}
        </p>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Show Less' : 'Expand'}
          className={!isOpen ? 'rotate-180' : ''}
        >
          <Arrow />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
