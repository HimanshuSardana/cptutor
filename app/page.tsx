"use client"
import { Button } from '@nextui-org/react'
import { ThemeSwitch } from '@/components/theme-switch'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
        const { data: session } = useSession();
        const router = useRouter();

        session ? router.push('/dashboard') : null;
        return (
                <>

                        <div className="navbar flex w-full justify-between items-center">
                                <h3 className="text-xl font-bold">CPTutor</h3>
                                <div className='flex items-center gap-4'>
                                        <ThemeSwitch />
                                        <Button onClick={() => { session ? signOut() : signIn("github") }} variant='light' color='primary' radius='full'>{session ? "Log Out" : "Log In"}</Button>
                                </div>
                        </div>

                        <div className="hero">
                        </div>

                </>
        );
}
