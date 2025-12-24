'use client';
import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react';
import React , {useContext} from 'react';
import { Button } from '../ui/button';

import { useRouter } from 'next/navigation';
import { UserDetailContext } from '@/context/UserDetailContext'; 


function SideBarFooter() {
  const router = useRouter();
  const { setUserDetail } = useContext(UserDetailContext);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserDetail(null);
    window.location.reload();
  };
  const options = [
  {
    name: 'Settings',
    icon: Settings,

  },
  {
    name: 'Help Center',
    icon: HelpCircle,

  },
  {
    name: 'My Subscription',
    icon: Wallet,
    path: '/pricing',
  },
  {
    name: 'Sign Out',
    icon: LogOut,

  },
];

  const onOptionClick = (option) => {
    if (option.name === 'Sign Out') {
      handleLogout();
      return;
    }

    if (option.path) {
      router.push(option.path);
    }
  };
  return (
    <div className="p-2 mb-10">
      {options.map((option, index) => (
        <Button
          onClick={() => onOptionClick(option)}
          key={index}
          variant="ghost"
          className="w-full flex justify-start my-3"
        >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
}

export default SideBarFooter;
