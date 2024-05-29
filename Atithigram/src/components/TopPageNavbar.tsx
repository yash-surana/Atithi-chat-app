import { AiFillGithub } from "react-icons/ai";
import { SlideBarOuterButton } from "./button/SlideBarResponsiveExitButton";
import { TiSocialLinkedin, TiSocialTwitter } from "react-icons/ti";
import Image from "next/image";
import { getAuthSession } from "@/lib/auth";
import { FC } from "react";
import Link from "next/link";
import logo from '../../public/image.png';

interface TopPageNavbarProp {
  title: string;
}

const TopPageNavbar: FC<TopPageNavbarProp> = async ({ title }) => {
  const session = await getAuthSession();

  return (
    <div className="fixed top-0 left-0 w-full bg-[#EBC4A0] flex items-center justify-between h-[50px] z-50">
      <div className="flex items-center">
        <Image src={logo} alt="Logo" width={220} height={30} className="ml-2" />
      </div>
      <div className="mr-2">
        <SlideBarOuterButton />
      </div>
    </div>
  );
};

export default TopPageNavbar;
