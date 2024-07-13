import React, { useState, useEffect } from 'react'
import CourseSlider from '../Components/Core/CategoryPage/CourseSlider'
import Footer from '../Components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector'
import { useDispatch } from 'react-redux'
import { categories } from '../services/apis'
import { fetchCategoryPageData } from '../services/operations/categoryPageApi'
import { toast } from 'react-hot-toast'
import CourseCard from '../Components/Core/CategoryPage/CourseCard'
import { getAverageRating } from '../services/operations/ratingAndReviewApi'

const Category = () => {

    const { categoryName } = useParams();
    const [categoryId, setCategoryId] = useState("");
    const [categoryPageData, setCategoryPageData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [active1, setActive1] = useState(true);
    const [active2, setActive2] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("CategoryPageData", categoryPageData);
    }, [])

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await apiConnector("GET", categories.CATEGORIES_API);
                if (!response?.data?.success) {
                    toast.error("Courses not found");
                    throw new Error(response?.data?.message);
                }
                // console.log("Response", response?.data?.allCategory);
                // console.log("CategoryNAme", categoryName);
                const category_Id = response?.data?.allCategory?.filter((cat) => cat?.name.split(" ").join("").toLowerCase() === categoryName.toLowerCase())[0]._id;
                // console.log("CategoryId", {category_Id});
                setCategoryId(category_Id);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllCategories();
    }, [categoryName]);

    useEffect(() => {
        const categoryPageDetails = async () => {
            try {
                const res = await fetchCategoryPageData(categoryId);
                // console.log("Response", res);
                if (res) {
                    setCategoryPageData(res?.data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        if (categoryId) {
            categoryPageDetails();
        }
    }, [categoryId]);


    return (
        <div className='text-richblack-50 '>
            <div className='bg-[#0289a1] text-richblue-800 px-[100px] py-[50px]'>
                <p className='pt-[4rem] mb-[5px]'>{`Home / Catalog / `}<span className='text-yellow-50'>{categoryPageData?.selectedCategory?.name}</span></p>
                <p className='text-[50px] font-bold'>{categoryPageData?.selectedCategory?.name}</p>
                <p>{categoryPageData?.selectedCategory?.description}</p>
            </div>
            <div className='mt-[4rem]  flex flex-col w-10/12 mx-auto'>
                <p className='text-4xl font-bold'>Courses to get you Started</p>
                {/* Section-1 */}
                <div className='mt-[1rem]'>
                    <div className='flex gap-3'>
                        <button className={`${active1 ? "text-yellow-50 border-b-2 border-b-yellow-50" : "text-richblack-400"} `}
                        onClick={() =>{ setActive2(false); 
                            setActive1(true)}}
                        >Most Popular</button>
                        <button className={`${active2 ?  "text-yellow-50 border-b-2 border-b-yellow-50" : "text-richblack-400"} `}
                        onClick={() =>  { setActive2(true); 
                            setActive1(false)}}
                        >New</button>
                    </div>
                    <div className='mt-10'>
                        {
                            categoryPageData?.selectedCategory?.courses ? 
                            categoryPageData?.selectedCategory?.courses?.length < 2 ? (<div className='flex justify-center items-center w-[500px]'>
                                <CourseCard course={categoryPageData?.selectedCategory?.courses[0]}></CourseCard>
                            </div>) : 
                             (<CourseSlider courses={categoryPageData?.selectedCategory?.courses}></CourseSlider>) : (
                                <div>No Courses</div>
                            )
                        }
                    </div>
                </div>
                {/* Section-2 */}
                <div>
                    <p className='text-4xl font-bold my-10'>Top courses</p>
                    <div>
                        {
                            categoryPageData?.differentCategory?.courses ? (<CourseSlider courses={categoryPageData?.differentCategory?.courses}></CourseSlider>) : (
                                <div>No Courses</div>
                            )
                        }
                    </div>
                </div>
                <div>
                    <p className='text-4xl font-bold my-10'>Frequently Bought</p>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-y-10 mb-[50px] gap-x-10'>
                        {
                            categoryPageData?.mostSellingCourses?.map((course, index) => {
                                return (
                                    <div className=''>
                                        <CourseCard course={course} key={index}></CourseCard>
                                    </div>
                                )
                            }
                            )}
                    </div>
                </div>
            </div>
            <Footer ></Footer>
        </div>
    )
}

export default Category