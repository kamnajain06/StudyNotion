import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { RxDropdownMenu } from 'react-icons/rx';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCaretDown } from "react-icons/fa6";
import { AiOutlinePlus } from 'react-icons/ai';
import SubSectionModal from './SubSectionModal';
import { setCourse } from '../../../../../slices/courseSlice';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsApi';

const NestedView = ({ handleChangeEditSectionName }) => {

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubsection] = useState(null);
    const [viewSubsection, setViewSubsection] = useState(null);
    const [editSubsection, setEditSubsection] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSubsection = async (subsectionId, sectionId) => {
        const result = await deleteSubSection({
            subsectionId,
            sectionId,
        }, token)
        if (result) {
            const updatedCourseContent = await course.courseContent.map((section) =>
                section._id === sectionId ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            console.log("Updated Course", updatedCourse);
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }
    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
        }, token);
        if (result) {
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

    useEffect(()=> {
    },[])

    return (
        <div className='text-richblack-5'>
            <div className='w-full h-full bg-richblack-700 rounded-md mt-[2rem] p-4 flex flex-col gap-3'>
                {
                    course.courseContent.map((section) => {
                        return <details key={section._id} open className='w-full '>
                            <summary className='flex w-full justify-between border-b-2'>
                                <div className='flex flex-row items-center gap-2 '>
                                    <RxDropdownMenu></RxDropdownMenu>
                                    <p className='text-white '>{section.sectionName}</p>
                                </div>
                                <div className='flex flex-row gap-2 items-center pb-1 '>
                                    <button
                                        onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                                    >
                                        <MdEdit></MdEdit>
                                    </button>
                                    <button className='text-white'
                                        onClick={() => setConfirmationModal({
                                            text1: "Delete this Section",
                                            text2: "All the lectures in this Section will be deleted.",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null)
                                        })}
                                    >
                                        <RiDeleteBin6Line />
                                    </button>
                                    <span className=''>|</span>
                                    <button>
                                        <FaCaretDown />
                                    </button>
                                </div>
                            </summary>
                            <div >
                                {
                                    section?.subSection?.map((subsection) => (
                                        <div className=' w-11/12 justify-center mx-auto mt-2'>
                                            <div key={subsection._id}
                                                className='flex justify-between '
                                                >
                                                <div className='flex flex-row items-center gap-2 '
                                                onClick={() => !viewSubsection ? setViewSubsection(subsection) : null }
                                                >
                                                    <RxDropdownMenu></RxDropdownMenu>
                                                    {/* {console.log("Subsection", subsection)} */}
                                                    <p className='text-white '>{subsection.title}</p>
                                                </div>
                                                <div className='flex flex-row gap-2 items-center pb-1'>
                                                    <button
                                                        onClick={() => setEditSubsection({ ...subsection, sectionId: section._id })}
                                                    >
                                                        <MdEdit></MdEdit>
                                                    </button>
                                                    <button className='text-white'
                                                        onClick={() => setConfirmationModal({
                                                            text1: "Delete this Subsection",
                                                            text2: "All the lectures in this subsection will be deleted",
                                                            btn1Text: "Delete",
                                                            btn2Text: "Cancel",
                                                            btn1Handler: () => handleDeleteSubsection(subsection._id, section._id),
                                                            btn2Handler: () => setConfirmationModal(null)
                                                        })}
                                                    >
                                                        <RiDeleteBin6Line />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    )}
                                <button
                                    className='flex flex-row gap-2 items-center bg-yellow-200 text-richblack-800 font-bold px-2 py-0.5 my-[1rem]'
                                    onClick={() => setAddSubsection(section._id)}
                                >
                                    <AiOutlinePlus className='font-bold'></AiOutlinePlus>
                                    <p className=''>Add Lecture</p>
                                </button>
                            </div>
                        </details>

                    })
                }
            </div>
            {addSubSection ? (<SubSectionModal
                modalData={addSubSection}
                setModalData={setAddSubsection}
                add={true}
            ></SubSectionModal>) :
                viewSubsection ? (<SubSectionModal
                    modalData={viewSubsection}
                    setModalData={setViewSubsection}
                    view={true}
                ></SubSectionModal>) :
                    editSubsection ? (<SubSectionModal
                        modalData={editSubsection}
                        setModalData={setEditSubsection}
                        edit={true}
                    />) : (
                        <div></div>
                    )
            }
            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>
            }
        </div>
    )
}

export default NestedView