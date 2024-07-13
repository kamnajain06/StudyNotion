import React from 'react'
import LogoFull from "../../assets/Logo/Logo-Full-Light.png"
import { Link } from 'react-router-dom';
import { FooterLink2 } from '../../data/footer-links';

const Footer = () => {

    const company = ["About", "Careers", "Affiliates"];
    const Resources = ["Articles", "Blog", "Chart Sheet", "Code challenges", "Docs", "Projects", "Videos", "Workspaces"]
    const plans = ["Paid Membership ", "For Students", "Business Solutions"];
    const community = ["Forums", "Chapters", "Events"]

    return (
        <div className='bg-richblack-800 lg:h-full md:h-full sm:h-16 flex flex-col '>
            <div className='flex flex-row md:block hidden'>
                <div className='mx-auto flex flex-row h-[50rem] w-10/12 mt-[120px]  border-b border-richblack-700 '>
                    <div className='flex flex-row gap-4 items-center w-1/2 h-full'>
                        <div className='flex flex-col w-1/3 h-full text-richblack-100 gap-2'>
                            <img src={LogoFull}></img>
                            <div className='font-bold text-richblack-100 mt-[15px]'>Company</div>
                            <div>
                                {
                                    company.map((element, index) => {
                                        return (<div key={index} className='hover:text-richblack-600 hover:font-bold text-sm my-2 text-richblack-400'>
                                            <Link >{element}</Link>
                                        </div>)
                                    })
                                }
                            </div>
                        </div>
                        <div className='flex flex-col  w-1/3 h-full'>
                            <div className='font-bold text-richblack-100 mb-[15px]'>Resources </div>
                            {
                                Resources.map((element, index) => {
                                    return (<div key={index} className='hover:text-richblack-600 hover:font-bold text-sm my-1 text-richblack-400'>
                                        <Link>{element}</Link>
                                    </div>)
                                })
                            }
                            <div className='font-bold text-richblack-100 mb-[15px] mt-[20px]'>Support</div>
                            <div className='text-sm my-1 text-richblack-400 hover:text-richblack-600 hover:font-bold'><Link>Help Center</Link></div>
                        </div>
                        <div className='flex flex-col border-r mb-[20px] border-richblack-700 w-1/3 h-full'>
                            <div className='font-bold text-richblack-100 mb-[15px]'>Plans</div>
                            {
                                plans.map((element, index) => {
                                    return (<div key={index} className='text-sm my-1 text-richblack-400 hover:text-richblack-600 hover:font-bold'>
                                        <Link>{element}</Link>
                                    </div>)
                                })
                            }
                            <div className='font-bold text-richblack-100 mb-[15px] mt-[20px]'>Community</div>
                            {
                                community.map((element, index) => {
                                    return (<div key={index} className='text-sm my-1 text-richblack-400 hover:text-richblack-600 hover:font-bold'>
                                        <Link>{element}</Link>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                    <div className='flex flex-col w-1/2 h-full'>
                        <div className='flex flex-row gap-[80px] ml-[40px] w-full h-full '>
                            {
                                FooterLink2.map((element, index) => {
                                    return (
                                        <div key={index} className='flex flex-col'>
                                            <div className='font-bold text-richblack-100 mb-[15px] flex flex-row '>{element.title}</div>
                                            <div className='flex flex-col gap-1 '>
                                                {
                                                    element.links.map((ele, index) => {
                                                        return (
                                                            <div key={index} className='hover:text-richblack-600 hover:font-bold text-sm my-1 text-richblack-400 my-1'>
                                                                <Link to={ele.link}>{ele.title}</Link>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-11/12 h-full mx-auto '>
                <div className='w-11/12 flex flex-row h-full items-center justify-between mx-auto'>
                    <div className='flex flex-row py-2 items-center w-full text-center h-full text-sm my-2 text-richblack-400 md:flex-row '>
                        <div className='w-full border-r border-richblack-600 hover:text-richblack-600 hover:font-bold md:w-full '><Link>Privacy Policy</Link></div>
                        <div className='w-full border-r border-richblack-600 hover:text-richblack-600 hover:font-bold md:w-full '><Link>Cookie Policy</Link></div>
                        <div className='w-full hover:text-richblack-600 hover:font-bold md:w-full'><Link>Terms</Link></div>
                    </div>
                    <div className='flex w-full  h-full justify-end items-center'>
                        <div className='text-sm my-2 text-richblack-400'>Made with ❤️ by Kamna Jain © 2024 StudyNotion</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer