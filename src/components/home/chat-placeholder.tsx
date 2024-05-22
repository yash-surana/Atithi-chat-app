import { Lock } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

const ChatPlaceHolder = () => {
	return (
		<div className='w-3/4 bg-gray-secondary flex flex-col items-center justify-center py-10 bg-brown'>
			<div className='flex flex-col items-center w-full justify-center py-10 gap-4 '>
				<Image src={"/desktop-hero.png"} alt='Hero' width={320} height={188} />
				
			</div>
		</div>
	);
};
export default ChatPlaceHolder;
