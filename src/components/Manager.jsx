import { IoMdSearch } from "react-icons/io";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { FaRegEye } from "react-icons/fa";

const Manager = () => {
  return (
    <>
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

        <div className="container mx-auto font-roboto max-w-4xl bg-slate-100/25 backdrop-blur-md h-[70vh] rounded-xl mt-8">
            <h1 className="text-4xl text-slate-200 text-center p-4 font-medium">PassKeep <br /> <span className=" bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text font-bold">Password Manager </span></h1>
            <div className="text-white flex flex-col p-4 w-full">
                <div className="flex gap-2 justify-center items-center">
                    <input className="text-black font-medium p-1 w-[65%] rounded-full border-2 border-lime-500 " type="text" />
                    <button className="flex-shrink-0 text-gray-800 font-medium bg-slate-300 border-0 px-3 py-1 focus:outline-none hover:bg-slate-600 hover:text-gray-200 rounded-full text-sm mt-10 sm:mt-0"><IoMdSearch /></button>
                </div>
                <div className="p-2 gap-4 flex flex-col justify-center items-center w-full my-4">
                    <div className=" w-[70%]">
                        <label className=" ml-1" htmlFor="website">Website Name</label>
                        <input className="text-black font-medium p-1 w-full rounded-full border-2 border-lime-500" type="text" />
                    </div>
                    <div className="flex  w-[70%] gap-4">
                        <div className=" w-1/2">
                            <label className=" ml-1" htmlFor="username">Username</label> <br />
                            <input className="text-black font-medium p-1 w-full rounded-full border-2 border-lime-500" type="text" />
                        </div>
                        <div className=" w-1/2">
                            <label className=" ml-1" htmlFor="password">Password</label> <br />
                            <div className="relative flex items-center">
                                <input className=" text-black font-medium p-1 w-full rounded-full border-2 border-lime-500" type="text" /> 
                                <button className="text-xl text-black absolute right-0 flex justify-center items-center bg-lime-300 rounded-full h-full px-3"><FaRegEye /></button>
                            </div>
                        </div>
                    </div>
                    <button className="flex gap-1 items-center justify-centerflex-shrink-0 text-gray-800 font-semibold bg-lime-400 border-0 px-3 py-1 focus:outline-none hover:bg-lime-600 hover:text-gray-200 rounded text-sm sm:mt-0"
                    
                    > <HiOutlineViewGridAdd /> Add Password</button>
                </div>
            </div>
        </div>

    </>
  );
};

export default Manager;
