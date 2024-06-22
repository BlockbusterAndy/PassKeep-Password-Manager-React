import { BsShieldLockFill } from "react-icons/bs";

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center">
        <div className="flex justify-between p-2 bg-gradient-to-tr from-violet-500 to-orange-300font-roboto rounded-b-lg w-[80vh]"> 

            <div className="flex p-2 gap-2 items-center text-white">
                <span className="  font-semibold text-md">PassKeep</span>
                <BsShieldLockFill />
            </div>
            
            <div className="flex items-center justify-center gap-4 text-white">
              <a href="https://github.com/BlockbusterAndy/PassKeep-Password-Manager-React" target="_blank">
                <button className="text-gray-800 flex items-center gap-1 bg-lime-400 py-2 px-4 rounded-full font-medium">
                  <img src="./github.svg" alt="Github Logo" width={25} /> GitHub 
                </button>
              </a>
            </div>

        </div>
    </nav>
  )
}

export default Navbar