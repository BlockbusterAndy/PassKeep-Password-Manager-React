import { IoMdSearch } from "react-icons/io";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { useRef, useState, useEffect } from "react";

const Manager = () => {
    const [passwordArray, setPasswordArray] = useState([]);
    
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const passRef = useRef();
    const ref = useRef(); 
    const showPassword = () => {
        if (ref.current.src.includes("/eyeSlash.svg")) {
            ref.current.src = "/eye.svg";
            passRef.current.type = "password";
        } else {
            ref.current.src = "/eyeSlash.svg";
            passRef.current.type = "text";
        }
    };

    const [form, setForm] = useState({
        site: "",
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    
    const savePassword = () => {
        const updatedPasswords = [...passwordArray, form];
        setPasswordArray(updatedPasswords);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        setForm({
            site: "",
            username: "",
            password: "",
        });
        console.log(updatedPasswords);
    };

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className="container mx-auto font-roboto max-w-4xl bg-slate-100/25 backdrop-blur-md rounded-xl mt-8">
                <h1 className="text-4xl text-slate-200 text-center p-4 font-medium">PassKeep <br /> <span className=" bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text font-bold">Password Manager </span></h1>
                <div className="text-white flex flex-col p-4 w-full">
                    <div className="flex gap-2 justify-center items-center">
                        <input className="text-black font-medium p-1 w-[65%] rounded-full border-2 border-lime-500 " type="text" />
                        <button className="flex-shrink-0 text-gray-800 font-medium bg-slate-300 border-0 px-3 py-1 focus:outline-none hover:bg-slate-600 hover:text-gray-200 rounded-full text-sm mt-10 sm:mt-0"><IoMdSearch /></button>
                    </div>
                    <div className="p-2 gap-4 flex flex-col justify-center items-center w-full my-4">
                        <div className=" w-[70%]">
                            <label className=" ml-1" htmlFor="website">Website Name</label>
                            <input value={form.site} onChange={handleChange} name="site" placeholder="Enter Website url" className="text-black font-medium p-1 w-full rounded-full border-2 border-lime-500" type="text" />
                        </div>
                        <div className="flex  w-[70%] gap-4">
                            <div className=" w-1/2">
                                <label className=" ml-1" htmlFor="username">Username</label> <br />
                                <input value={form.username} onChange={handleChange} name="username" className="text-black font-medium p-1 w-full rounded-full border-2 border-lime-500" type="text" />
                            </div>
                            <div className=" w-1/2">
                                <label className=" ml-1" htmlFor="password">Password</label> <br />
                                <div className="relative flex items-center">
                                    <input ref={passRef} value={form.password} onChange={handleChange} name="password" className="text-black font-medium p-1 w-full rounded-full border-2 border-lime-500" type="password" /> 
                                    <button className="absolute right-0 flex justify-center items-center bg-lime-300 rounded-full h-full px-3"
                                    onClick={showPassword}
                                    >
                                    <img ref={ref} src="/eye.svg" alt="eyeIcon" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button className="flex gap-1 items-center justify-center flex-shrink-0 text-gray-800 font-semibold bg-lime-400 border-0 px-3 py-1 focus:outline-none hover:bg-lime-600 hover:text-gray-200 rounded text-sm sm:mt-0"
                        onClick={savePassword}
                        > <HiOutlineViewGridAdd /> Add Password</button>
                    </div>
                </div>

                <div className="container mx-auto p-4">
                    <h2 className="text-center m-2 text-2xl font-bold text-slate-200">Your Passwords</h2>

                    {passwordArray.length === 0 && <h2 className="text-center m-2 text-2xl font-bold text-slate-200">No Passwords Saved</h2>}

                    {passwordArray.length > 0 &&
                        <table className="table-auto w-full text-slate-100 rounded-md overflow-hidden">
                            <thead className=" bg-lime-600">
                                <tr>
                                    <th className="text-md border border-slate-300 font-semibold py-2">Website</th>
                                    <th className="text-md border border-slate-300 font-semibold py-2">Username</th>
                                    <th className="text-md border border-slate-300 font-semibold py-2">Password</th>
                                </tr>
                            </thead>
                            <tbody className=" bg-slate-50/25">
                                {passwordArray.map((password, index) => (
                                    <tr key={index}>
                                        <td className=" py-2 border border-slate-300 text-center">{password.site}</td>
                                        <td className=" py-2 border border-slate-300 text-center">{password.username}</td>
                                        <td className=" py-2 border border-slate-300 text-center">{password.password}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    );
};

export default Manager;
