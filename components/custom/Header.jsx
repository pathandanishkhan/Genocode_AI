"use client";
import Image from "next/image";
import React, { useContext, useState , useEffect} from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";
import Link from "next/link";
import { Download, Rocket } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { ActionContext } from "@/context/ActionContext";
import SignInDialog from "../custom/SignInDialog"; // ✅ import here

function Header() {
  const { userDetail } = useContext(UserDetailContext);
  const { action, setAction } = useContext(ActionContext);
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
    const [isHomePage, setIsHomePage] = useState(false);
 useEffect(() => {
  setIsHomePage(window?.location?.pathname === "/");
}, [pathname]);
  const [openDialog, setOpenDialog] = useState(false); // ✅ dialog state

  const onActionBtn = (actn) => {
    setAction({
      actionType: actn,
      timeStamp: Date.now(),
    });
  };

  return (
    <div className="p-4 flex justify-between items-center">
      <Link href={"/"}>
        <Image src={"/logo.png"} alt="logo" width={70} height={70} />
      </Link>
     
     { isHomePage && ( <Link target="_blank" href={"https://www.linkedin.com/in/pathan-danish-68098536b"}>
     <div className=" flex flex-col items-center text-center">
        <Image 
        className="rounded-full cursor-pointer object-cover" 
        src={"/Resume camera photo.png"} alt="logo" width={70} height={70} />
           <p>Like And Follow</p> 
     </div>
      </Link>)

     } 


      {/* If user not logged in */}
      {!userDetail?.name ? (
        <div className="flex gap-5">
          <Button variant="ghost" onClick={() => setOpenDialog(true)}>
            Sign In
          </Button>
          <Button
            className="text-white"
            style={{
              backgroundColor: Colors.BLUE,
            }}
            onClick={() => setOpenDialog(true)} // also open sign in for Get Started
          >
            Get Started
          </Button>
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          {pathname.includes("/workspace/") && (
            <>
              <Button variant="ghost" onClick={() => onActionBtn("export")}>
                <Download /> Export
              </Button>
              <Button
                onClick={() => onActionBtn("deploy")}
                className="text-white"
                style={{
                  backgroundColor: Colors.BLUE,
                }}
              >
                <Rocket /> Deploy
              </Button>
            </>
          )}
          {userDetail && (
            <Image
              onClick={toggleSidebar}
              src={userDetail?.picture}
              alt="userImage"
              width={40}
              height={40}
              className="rounded-full cursor-pointer object-cover"
            />
          )}
        </div>
      )}

      {/* ✅ Add SignInDialog here */}
      <SignInDialog openDialog={openDialog} closeDialog={setOpenDialog} />
    </div>
  );
}

export default Header;
