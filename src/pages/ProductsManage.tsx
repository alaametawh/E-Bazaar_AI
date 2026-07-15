import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Plus, Trash2 } from 'lucide-react';

import ReusableTable from "../components/DashTable"
import usePcount from '@/hooks/usePcount';
import useCcount from '@/hooks/useCcount';
import useAddProduct from '@/hooks/useAddProduct';
import useDeleteProduct from '@/hooks/useDeletProduct';
import useDeleteCategory from '@/hooks/useDeleteCategory';
import useAddCategory from '@/hooks/useAddCategory';

export default function OrdersManage(){
    const [isform,setisform] = useState(false)
    const [isCform,setisCform] = useState(false)
    const [isproduct,setisproduct] = useState(true)
    const { data:Pdata } = usePcount();
    const { data:Cdata } = useCcount();
    const { mutate } = useDeleteProduct()
    const { mutate:mutateC } = useDeleteCategory()
    const nav = useNavigate()

    return(
        <div className="text-white">
            <div className="mb-7 flex items-center justify-between">
                <h2 className="text-xl font-bold">Products Manage</h2>
                <button onClick={() => nav("/dashboard")} className="cursor-pointer text-accent">
                <ArrowRight className="h-9 w-9" />
                </button>
            </div>

            <div className=' mb-7 text-black font-bold flex flex-row items-center border border-dashed border-accent rounded-xl p-3 gap-3'>
                <button onClick={()=>setisproduct(false)} className={` cursor-pointer border-2 border-accent p-2 rounded w-full ${!isproduct ? "bg-accent": "bg-[#33322f] text-text"}`}>Categories</button>
                <button onClick={()=>setisproduct(true)} className={` cursor-pointer border-2 border-accent p-2 rounded w-full ${isproduct ? "bg-accent": "bg-[#33322f] text-text"}`}>Products</button>
            </div>

            <div className='mb-7'>
                {isproduct && 
                <div className=' border-2 rounded-2xl border-gray-500 bg-[#21201e]'>
                    <div className=' flex flex-row text-text p-4 justify-between items-center'>
                        <h2 className=' text-xl font-bold'>Products</h2>
                        <button onClick={()=> setisform(true)}  className={` flex flex-row justify-between text-xs sm:text-lg items-center gap-2 border hover:bg-accent/85 p-2 rounded text-black font-bold cursor-pointer bg-accent`}><Plus className='w-5 h-5'/> new product </button>
                    </div>
                    <ReusableTable data={Pdata ?? []} columns={[
                        {
                            header: "Image",
                            accessor: "img_url",
                            render: (img_url) => <img className='w-14 h-14 rounded-xl' src={`${img_url}`}></img>,
                        },
                        {
                            header: "Product Name",
                            accessor: "name",
                        },
                        {
                        header: "Category",
                        accessor: "category",
                        render: (category) => category?.name ?? "No Category",
                        },
                        {
                            header: "Price",
                            accessor: "price",
                        },
                        {
                            header: "Created At",
                            accessor: "created_at",
                            render: (created_at) => created_at.slice(0, 10),
                        },
                        {
                            header: "Procedures",
                            accessor: "id",
                            render: (id) => (
                                <button onClick={() => mutate({ id })} className="bg-red-500 text-white p-2 rounded cursor-pointer hover:bg-red-600">
                                    <Trash2 />
                                </button>
                            ),
                        }
                    ]}/>
                </div>}

                {!isproduct &&
                <div className=' border-2 rounded-2xl border-gray-500 bg-[#21201e]'>
                    <div className=' flex flex-row text-text p-4 justify-between items-center'>
                        <h2 className=' text-xl font-bold'>Categories</h2>
                        <button onClick={()=> setisCform(true)}  className={` flex flex-row text-xs sm:text-lg justify-between items-center gap-2 border hover:bg-accent/85 p-2 rounded text-black font-bold cursor-pointer bg-accent`}><Plus className='w-5 h-5'/> new Category </button>
                    </div>
                    <ReusableTable data={Cdata ?? []} columns={[
                        {
                            header:"Category ID",
                            accessor: "id",
                        },
                        {
                            header: "Category Name",
                            accessor: "name",
                        },
                        {
                            header: "Created At",
                            accessor: "created_at",
                            render: (created_at) => created_at.slice(0, 10),
                        },
                        {
                            header: "Procedures",
                            accessor: "id",
                            render: (id) => (
                                <button onClick={() => mutateC({ id })} className="bg-red-500 text-white p-2 rounded cursor-pointer hover:bg-red-600">
                                    <Trash2 />
                                </button>
                            ),
                        }
                    ]}/>
                </div>}
            </div>
            <AddNewProductPopup isform={isform} setisform={setisform}/>
            <AddNewCategoryPopup isCform={isCform} setisCform={setisCform}/>
        </div>
    )
}



type AddNewProductPopupProps = {
    isform: boolean;
    setisform: React.Dispatch<React.SetStateAction<boolean>>;
};

type NewProduct = {
    name: string;
    description: string;
    price: number;
    img_url: string;
    sec_id: string;
    year: number;
};


function AddNewProductPopup({
    isform,
    setisform,
    }: AddNewProductPopupProps) {

    const {register, handleSubmit, formState: {errors},reset} = useForm<NewProduct>();
    const mutate = useAddProduct()


    function onSubmit(data: NewProduct) {
    mutate(data, {
        onSuccess: () => {
            setisform(false);
        },
        });
        reset()
    }


    if (!isform) return null;

    return (
        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className=" max-h-160 overflow-y-scroll w-[90%] max-w-lg rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl">
                <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                    Add New Product
                </h2>
                <button
                    onClick={() => setisform(false)}
                    className="rounded-lg px-3 py-1 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                    ✕
                </button>
                </div>


                <div>
                    <form className="bg-[#292825] p-6 rounded-2xl border border-accent" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4 flex flex-col gap-2">
                            <label htmlFor="name"> <span className="flex items-center mb-1"> Product Name </span></label>
                            <input className="text-text bg-bg/70 placeholder:text-text/50 border border-accent focus:outline-none focus:ring-2 focus:ring-accent p-1.5 pl-4 rounded-xl" type="text" id="name"
                            placeholder="Enter The Product Name"
                            {...register("name", {
                                required: "Product name is required",
                            })} />
                            {errors.name && <span className="text-red-500 font-bold">{errors.name.message}</span>}
                        </div>

                        <div className="mb-4 flex flex-col gap-2">
                            <label htmlFor="description"> <span className="flex items-center mb-1"> Product Description </span></label>
                            <textarea  className="text-text bg-bg/70 placeholder:text-text/50 border border-accent focus:outline-none focus:ring-2 focus:ring-accent p-1.5 pl-4 rounded min-h-20"  id="description"
                            placeholder="Enter The Product description"
                            {...register("description", {
                                required: "Product description is required",
                            })} />
                            {errors.description && <span className="text-red-500 font-bold">{errors.description.message}</span>}
                        </div>

                        <div className="mb-4 flex flex-col gap-2">
                            <label htmlFor="price"> <span className="flex items-center mb-1"> Product Price </span></label>
                            <input className="text-text h-12 bg-bg/70 placeholder:text-text/50 border border-accent focus:outline-none focus:ring-2 focus:ring-accent p-1.5 pl-4 rounded-xl" type="number" id="price" min={0}
                            placeholder="Enter The Product price"
                            {...register("price", {
                                valueAsNumber: true,
                                required: "Product price is required",
                                min:{value:1,message:"The product price must be higher than 0"}
                            })} />
                            {errors.price && <span className="text-red-500 font-bold">{errors.price.message}</span>}
                        </div>

                        <div className="mb-4 flex flex-col gap-2">
                            <label htmlFor="img_url"> <span className="flex items-center mb-1"> Product Image </span></label>
                            <input className="text-text bg-bg/70 placeholder:text-text/50 border border-accent focus:outline-none focus:ring-2 focus:ring-accent p-1.5 pl-4 rounded-xl" type="text" id="img_url" min={0}
                            placeholder="Enter The Product Image URL"
                            {...register("img_url", {
                                required: "Product image URL is required",
                            })} />
                            {errors.img_url && <span className="text-red-500 font-bold">{errors.img_url.message}</span>}
                        </div>

                        <div className="mb-4 flex flex-col gap-2">
                            <label htmlFor="year"> <span className="flex items-center mb-1"> Product Year </span></label>
                            <input className="text-text h-12 bg-bg/70 placeholder:text-text/50 border border-accent focus:outline-none focus:ring-2 focus:ring-accent p-1.5 pl-4 rounded-xl" type="number" id="year" min={0}
                            placeholder="Enter The Product Year"
                            {...register("year", {
                                valueAsNumber: true,
                                required: "Product year is required",
                            })} />
                            {errors.year && <span className="text-red-500 font-bold">{errors.year.message}</span>}
                        </div>

                        <div className="mb-4 flex flex-col gap-2">
                            <label htmlFor="sec_id"> <span className="flex items-center mb-1"> Section ID </span></label>
                            <input className="text-text bg-bg/70 placeholder:text-text/50 border border-accent focus:outline-none focus:ring-2 focus:ring-accent p-1.5 pl-4 rounded-xl" type="text" id="sec_id" min={0}
                            placeholder="Enter The Product sec id from supabase"
                            {...register("sec_id", {
                                required: "Product sec id is required",
                            })} />
                            {errors.sec_id && <span className="text-red-500 font-bold">{errors.sec_id.message}</span>}
                        </div>

                        <button  className=" hover:bg-bg/50 w-full border p-2.5 rounded-2xl mt-1.5 bg-bg cursor-pointer border-accent" type="submit">submit</button>
                    </form>
                </div>

            </div>
        </div>
    );
}

type AddNewCategoryPopupProps = {
    isCform: boolean;
    setisCform: React.Dispatch<React.SetStateAction<boolean>>;
};

type NewCategory = {
    name: string;
};


function AddNewCategoryPopup({
    isCform,
    setisCform,
    }: AddNewCategoryPopupProps) {

    const {register, handleSubmit, formState: {errors},reset} = useForm<NewCategory>();
    const mutate = useAddCategory()


    function onSubmit(data: NewCategory) {
    mutate(data, {
        onSuccess: () => {
            setisCform(false);
        },
        });
        reset()
    }


    if (!isCform) return null;

    return (
        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className=" max-h-160 overflow-y-scroll w-[90%] max-w-lg rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl">
                <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                    Add New Category
                </h2>
                <button
                    onClick={() => setisCform(false)}
                    className="rounded-lg px-3 py-1 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                    ✕
                </button>
                </div>

                <div>
                    <form className="bg-[#292825] p-6 rounded-2xl border border-accent" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4 flex flex-col gap-2">
                            <label htmlFor="name"> <span className="flex items-center mb-1"> Category Name </span></label>
                            <input className="text-text bg-bg/70 placeholder:text-text/50 border border-accent focus:outline-none focus:ring-2 focus:ring-accent p-1.5 pl-4 rounded-xl" type="text" id="name"
                            placeholder="Enter The Category Name"
                            {...register("name", {
                                required: "Category name is required",
                            })} />
                            {errors.name && <span className="text-red-500 font-bold">{errors.name.message}</span>}
                        </div>

                        <button  className=" hover:bg-bg/50 w-full border p-2.5 rounded-2xl mt-1.5 bg-bg cursor-pointer border-accent" type="submit">submit</button>
                    </form>
                </div>

            </div>
        </div>
    );
}