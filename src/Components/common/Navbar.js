import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Dark.png'
import { NavbarLinks } from "../../data/navbar-links"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { useState } from 'react'
import { setToken } from '../../slices/authSlice'
import { setUser } from '../../slices/profileSlice'
import { logout } from '../../services/operations/authApi'

const Navbar = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    // SUbLinks of Catalog
    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    //Function to fetch sublinks of catalog
    const fetchSubLinks = async () => {
        setLoading(true);
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log("Result of Catalog Sublinks: ", result.data.allCategory);
            setSubLinks(result.data.allCategory);
        } catch (err) {
            console.log("Error while fetching the sublinks of catalog", err);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchSubLinks();
    }, [])

    useEffect(() => {
        console.log("user", user);
        console.log("token", token);
    },[])

    function clickHandler() {
       dispatch(logout(navigate));
    }

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }
    return (
        <div className='w-screen fixed top-0 z-[1000]'>
            <nav className='w-full bg-[#0289a1] py-3 border-b border-richblue-400'>
                <div className='w-full flex items-center justify-between container mx-auto md:justify-evenly'>
                    <div className=''><Link to='/'><img src={logo} width={160} ></img></Link></div>
                    <div className='hidden lg:flex lg:gap-8 items-center'>
                        {
                            NavbarLinks.map((ele, index) => {
                                if (ele.title === "Catalog") {
                                    return (
                                        <div key={index} className="relative flex items-center gap-1 group  hover:scale-110 hover:text-richblue-800 hover:font-bold">
                                            <Link>{ele.title}</Link>
                                            <IoIosArrowDropdownCircle />
                                            <div className="invisible flex opacity-0 absolute w-[20vw] group-active:visible group-focus:visible  bg-richblack-25
                                    translate-x-[-60%] translate-y-[25px] flex-col z-[1000]
                                    top-[50%] left-[50%] rounded group-hover:visible py-[10px] px-[20px]  group-hover:opacity-100 ">
                                                <div className="absolute z-1 h-8 w-6 top-0 translate-y-[-35%] translate-x-[45px] left-[50%] bg-richblack-25 rotate-45
                                        rounded"></div>
                                                <div className='h-full w-full hover:visible text-lg group-active:visible group-focus:visible group'>
                                                    {loading ? (
                                                        <div>
                                                            <p className="z-10 text-richblack-900 my-3 py-[10px] text-lg group-hover:visible px-[8px] bg-richblack-100 rounded"></p>
                                                        </div>
                                                    ) : (
                                                        subLinks.length > 0 ? (
                                                            subLinks.map((link, index) => (
                                                                <Link className='group-hover:visible' key={index} to={`/category/${link.name.split(" ").join("")}`}>
                                                                    <p className="text-richblack-900 my-3 py-[10px] px-[8px] hover:bg-richblack-100 hover:rounded">{link.name}</p>
                                                                </Link>
                                                            ))
                                                        ) : (
                                                            <div>No Categories</div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={index} className='hover:scale-110 hover:text-richblue-800 hover:font-bold'>
                                            <Link to={ele?.path} className={`${matchRoute(ele?.path) ? "text-richblack-900 font-bold border-b-[4px] " : "text-richblack-800"}`}>
                                                {ele.title}
                                            </Link>
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                    <div className='flex gap-4'>
                        {
                            token === null && <button className=' border-richblack-900 rounded-sm'>
                                <Link to='/login' className={` ${matchRoute('login') ? " text-richblue-100 bg-richblue-700 font-bold px-[6px] py-[4px] rounded-lg" : "border-2 rounded-md text-richblack-800 py-[3px] px-[5px] "} `}>Log in</Link>
                            </button>
                        }
                        {
                            token === null && <button className=' border-richblack-900 rounded-sm'>
                                <Link to='/signup' className={` ${matchRoute('signup') ? " text-richblue-100 bg-richblue-700 font-bold px-[6px] py-[4px] rounded-lg" : "border-2 rounded-md text-richblack-800 py-[3px] px-[5px] "} `}>Sign up</Link>
                            </button>
                        }

                        {
                            token !== null && user && user?.accountType === "Student" && <div className='relative flex items-center mx-8'>
                                <Link to="/dashboard/cart" className='absolute text-3xl'><AiOutlineShoppingCart /></Link>
                                {
                                    totalItems >= 0 && <span className='absolute lg:bottom-5 md:left-5 md:bottom-4 text-pink-400 font-extrabold text-sm'>
                                        {totalItems}
                                    </span>
                                }
                            </div>
                        }
                        {
                            token !== null && <div className='group realtive'>
                                <div className='flex flex-row items-center gap-1'>
                                    <img src={user.image} className='rounded-full w-8'></img>
                                    <IoIosArrowDropdownCircle />
                                </div>
                                <div className='max-w-maxContent  invisible absolute bg-richblack-5 p-2 rounded-md text-richblack-800 group-hover:visible transition-all duration-0'>
                                    <div className='absolute left-[46%] top-[-5%] -translate-x-[80%] 
                                    bg-richblack-5 w-2 h-2 rotate-45'></div>
                                    <Link to='/dashboard/my-profile'><div className='hover:bg-richblack-100 px-2 rounded-md'>Dashboard</div></Link>
                                    <button onClick={clickHandler}><div className='hover:bg-richblack-100 px-2 rounded-md w-full '>Log Out</div></button>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar