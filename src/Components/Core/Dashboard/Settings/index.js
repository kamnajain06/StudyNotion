import UpdatePassword from "../../../../Pages/UpdatePassword";
import ChangeDP from "./ChangeDP";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import UpdateProfile from "./UpdateProfile";

export default function Settings() {
    return (
        <div className="py-[6rem] flex flex-col gap-10 text-richblack-25 px-20">
            <h1 className="text-4xl ">Edit Profile</h1>   
            <div className="flex flex-row gap-10 font-bold bg-[#0289a1] p-10 rounded-lg shadow-lg text-richblue-800">
                <ChangeDP></ChangeDP>
            </div>
            <div className="flex flex-row gap-10 font-bold bg-[#0289a1] p-10 rounded-lg shadow-lg text-richblue-800">
                <UpdateProfile></UpdateProfile>
            </div>
            <div className="flex flex-row gap-10 font-bold bg-[#0289a1] p-10 rounded-lg shadow-lg text-richblue-800">
                <ChangePassword></ChangePassword>
            </div>
            <div className="flex flex-row gap-10 font-bold bg-pink-600 bg-opacity-70 border-2 border-pink-500 p-10 rounded-lg shadow-lg text-richblue-25">
                <DeleteAccount></DeleteAccount>
            </div>


        </div>
    )
}
