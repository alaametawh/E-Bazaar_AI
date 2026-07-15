import toast from "react-hot-toast";
import { createProduct } from "@/services/apiProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function useAddProduct(){
    const QC = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: createProduct,
        onSuccess:()=>{
            toast.success("product added successfully")
            QC.invalidateQueries({queryKey:["productsCount"]})
        },
        onError:()=>{
            toast.error("error")
        }
    })
    return mutate
}