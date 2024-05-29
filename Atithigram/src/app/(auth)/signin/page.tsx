
import LoginButton from '@/components/button/LoginButton'
import { getAuthSession } from '@/lib/auth'
import Image from 'next/image';
import logo from '../../../../public/image.png';
async function page() {
    const session = await getAuthSession()
  return (
        <>
    <div className='bg-[#f4f4f4] h-full w-full min-h-screen text-[#344258] overflow-hidden text-base font-normal  '>
    <div className='columns is_gapless flex bg-[#f4f4f4] h-full w-full min-h-screen text-[#344258] overflow-hidden text-base font-normal '>
        {/* LEFT SIDE  */}
        <div className='min-h-full w-2/4 flex justify-center items-center relative bg-[linear-gradient(180deg,#F8ECDE,#CB6573)] bg-[length:400%_400%] signin_animate 
        max-[900px]:hidden'>
            <div className='max-w-[400px]' >
                <Image src={logo} alt="img"/>
            </div>
        </div>
        {/* RIGHT SIDE  */}
        <div className='min-h-full w-2/4 relative bg-white max-[900px]:w-full max-[900px]:flex max-[900px]:justify-center max-[900px]:items-center'>
                <div className='h-full w-full flex justify-center items-center font-serif '>
                    <div className='max-w-xl min-w-fit mx-auto'>
                        { !session ? <LoginButton/> : <h2 className='font-medium border p-4 rounded-md font-mono' >User alredy logged in</h2> }
                    </div>
                </div>
        </div>
    </div>
</div>
    </>
  )
}

export default page