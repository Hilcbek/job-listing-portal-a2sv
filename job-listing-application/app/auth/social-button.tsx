import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

interface socialButtonProps {
  type: 'signin' | 'signup';
}
export default function SocialButton({ type }: socialButtonProps) {
  const handleClick = () => {
    signIn('google', {
      callbackUrl: '/',
    });
  };

  return (
    <Button
      className="font-black cursor-pointer border-[1.5px] border-indigo-200 hover:bg-background text-xl h-14"
      onClick={handleClick}
      variant={'ghost'}
    >
      <Image src={'/google.svg'} alt="none" width={25} height={25} />
      <span className="border-[#d0d0f6] text-[#3833b2]">
        {type === 'signup' ? 'Sign Up' : 'Sign in'} with Google
      </span>
    </Button>
  );
}
