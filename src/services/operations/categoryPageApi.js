import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { categoryPageEndpoints } from "../apis";


export const fetchCategoryPageData = async (data) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    // console.log("Data",data)
    try {
        const response = await apiConnector("POST",categoryPageEndpoints.GET_CATEGORY_PAGE_DETAILS_API,{
            categoryId:data
        });
        if(!response?.data?.success){
            throw new Error("Category page not found"); 
        }
        console.log("Fetch Category Page Data Response >>>>>", response?.data);
        toast.success("Fetched category page details successfully");
        result = response?.data;

    }catch(err){
        console.log(err);
    }
    toast.dismiss(toastId);
    return result;
}
