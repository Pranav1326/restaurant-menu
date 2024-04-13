'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {

    const [ user, setUser ] = useState(null);
    const router = useRouter();
    
    const handleLogout = () => {
        sessionStorage.removeItem('ut');
        setUser(null);
        router.push('/');
    }
    
    useEffect(() => {
        setUser(sessionStorage.getItem('ut'));
    }, [ user ]);
    
    return(
        <nav className="w-full bg-slate-800 px-28 py-6 flex justify-between items-center font-kanit sticky top-0">
            <h1 className="text-4xl">Food Court</h1>
            <div className="links">
                <ul className="flex gap-5 text-2xl">
                    <Link href="/#menu" className='hover:text-green-500'>
                        <li>Menu</li>
                    </Link>
                    { user ? 
                        <Link href="/dashboard" className='hover:text-green-500'>
                            <li>Dashboard</li>
                        </Link> 
                        :
                        <Link href="/login" className='hover:text-green-500'>
                            <li>Login</li>
                        </Link>
                    }
                    { user ? <li className='hover:text-green-500 cursor-pointer' onClick={handleLogout}>Logout</li> : null }
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;