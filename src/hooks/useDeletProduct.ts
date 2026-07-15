import { deleteProduct } from "@/services/apiProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteProduct(){
    const QC = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: deleteProduct,
        onSuccess: ()=>{
            QC.invalidateQueries({queryKey:["productsCount"]})
            toast.success("Product deleted");
        },
        onError:(err)=>{
            toast.error(err.message);
        }
    })
    return {mutate}
}