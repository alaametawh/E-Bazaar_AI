import toast from "react-hot-toast";
import { createCategory } from "@/services/apiCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function useAddCategory(){
    const QC = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: createCategory,
        onSuccess:()=>{
            toast.success("Category added successfully")
            QC.invalidateQueries({queryKey:["categoriesCount"]})
        },
        onError:()=>{
            toast.error("error")
        }
    })
    return mutate
}