import { deleteCategory } from "@/services/apiCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteCategory(){
    const QC = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: deleteCategory,
        onSuccess: ()=>{
            QC.invalidateQueries({queryKey:["categoriesCount"]})
            toast.success("category deleted");
        },
        onError:(err)=>{
            toast.error(err.message);
        }
    })
    return {mutate}
}