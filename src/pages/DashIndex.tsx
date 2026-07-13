import { ShoppingCart, PackageSearch, Package, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import usePcount from '@/hooks/usePcount';
import useCcount from '@/hooks/useCcount';
import useOcount from '@/hooks/useOcount';
import Divider from '@/components/Divider';


export default function DashIndex(){
    const nav = useNavigate();
    const {count:Pcount} = usePcount()
    const {count:Ccount} = useCcount()
    const {count:Ocount} = useOcount()


    return(
        <div>
            <div className=" flex flex-col gap-4 mb-8 lg:flex-row justify-between items-center mx-3 lg:mx-0">
                <div className=" border-2 bg-[#292825] hover:bg-[#33322f] border-accent p-6 w-full lg:w-1/4 rounded-2xl flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-1">
                        <h3 className="text-lg font-semibold">Orders:</h3>
                        <p className="text-xl font-bold">{Ocount}</p>
                    </div>
                    <div className=" border-2 p-3 border-accent rounded-2xl bg-background"><ShoppingCart className="w-6 h-6" /></div>
                </div>

                <div className=" border-2 bg-[#292825] hover:bg-[#33322f] border-accent p-6 w-full lg:w-1/4 rounded-2xl flex flex-row justify-between items-center ">
                    <div className="flex flex-row gap-1">
                        <h3 className="text-lg font-semibold">Categories:</h3>
                        <p className="text-xl font-bold">{Ccount}</p>
                    </div>
                    <div className=" border-2 p-3 border-accent rounded-2xl bg-background"><PackageSearch className="w-6 h-6" /></div>
                </div>

                <div className=" border-2 bg-[#292825] hover:bg-[#33322f] border-accent p-6 w-full lg:w-1/4 rounded-2xl flex flex-row justify-between items-center ">
                    <div className="flex flex-row gap-1">
                        <h3 className="text-lg font-semibold">Products:</h3>
                        <p className="text-xl font-bold">{Pcount}</p>
                    </div>
                    <div className=" border-2 p-3 border-accent rounded-2xl bg-background"><Package className="w-6 h-6" /></div>
                </div>

                <div className=" border-2 bg-[#292825] hover:bg-[#33322f] border-accent p-6 w-full lg:w-1/4 rounded-2xl flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-1">
                        <h3 className="text-lg font-semibold">Sales:</h3>
                        <p className="text-xl font-bold">0</p>
                    </div>
                    <div className=" border-2 p-3 border-accent rounded-2xl bg-background"><DollarSign className="w-6 h-6" /></div>
                </div>
            </div>

            <Divider/>

            <div className=" flex flex-col gap-4 mb-6 lg:flex-row justify-between items-center mt-7 mx-3 lg:mx-0">
                <div onClick={() => nav("productsManage")}  className=" cursor-pointer hover:text-accent hover:border-yellow-500 border-3 bg-[#21201d] hover:bg-[#33322f] border-accent p-6 w-full lg:w-1/2 rounded-2xl flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-1">
                        <h3 className="text-lg font-semibold">Products manage</h3>
                        <p></p>
                    </div>
                    <div className=" border-2 p-3 border-accent rounded-2xl bg-background"><PackageSearch className="w-6 h-6 text-red-500" /></div>
                </div>

                <div onClick={() => nav("ordersManage")}  className=" cursor-pointer hover:text-accent hover:border-yellow-500 border-3 bg-[#21201d] hover:bg-[#33322f] border-accent p-6 w-full lg:w-1/2 rounded-2xl flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-1">
                        <h3 className="text-lg  font-semibold">Orders manage</h3>
                        <p></p>
                    </div>
                    <div className=" border-2 p-3 border-accent rounded-2xl bg-background"><ShoppingCart className="w-6 h-6 text-red-500" /></div>
                </div>
            </div>

        </div>
    )
}