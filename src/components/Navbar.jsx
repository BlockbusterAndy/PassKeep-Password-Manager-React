import { BsShieldLockFill } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center">
        <div className="flex justify-between p-2 bg-gradient-to-tr from-violet-500 to-orange-300font-roboto rounded-b-lg w-[80vh]"> 
            <div className="flex p-2 gap-2 items-center bg-sky-300 rounded-md px-4">
                <span className="  font-semibold text-md">PassKeep</span>
                <BsShieldLockFill />
            </div>
            
            <div className="flex items-center justify-center gap-4">
                <FaRegUserCircle className=" text-white text-2xl"/>
                <button className="flex-shrink-0 text-gray-800 font-medium bg-slate-300 border-0 py-1 px-4 focus:outline-none hover:bg-slate-600 hover:text-gray-200 rounded text-sm mt-10 sm:mt-0">Sign In</button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar