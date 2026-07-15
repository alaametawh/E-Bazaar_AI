import { LogOut} from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '@/services/apiAuth';

import toast from 'react-hot-toast';

export default function Dashboard() {
    const nav = useNavigate();

    return (
        <div className=" font-default flex flex-col">
            <div className=" border-b-2 border-accent py-4.5 px-3 flex flex-row justify-between items-center">
                <div className="flex flex-col">
                    <h2 className="text-2xl mb-1 font-bold text-accent">Dashboard</h2>
                    <p className='text-xs sm:text-lg'>Welcome to your dashboard!</p>
                </div>
                <button onClick={() => {
                        logout()
                        nav('/login')
                        toast.success('Logged out successfully')
                    }} className="flex flex-row justify-center items-center bg-red-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    logout
                </button>
            </div>

            <div className='mt-7 mx-3'>
                <Outlet/>
            </div>
        </div>
    )
}
