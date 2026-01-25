import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Teste from '../Assets/logo.svg';
export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div className=" w-full overflow-hidden bg-white px-6 py-8 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800 flex flex-col justify-center">
                <div className=' flex justify-center pb-8'>
                    <Link href="/">
                    </Link>
                    <img src={Teste} alt="logo" className='w-44' />
                </div>


                {children}
            </div>
        </div>
    );
}
