import { IoMdSearch } from "react-icons/io";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [passwordArray, setPasswordArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPasswords, setFilteredPasswords] = useState(passwordArray);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = passwordArray.filter(
      (password) =>
        password.site.toLowerCase().includes(e.target.value.toLowerCase()) ||
        password.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPasswords(filtered);
  };

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  useEffect(() => {
    setFilteredPasswords(passwordArray);
  }, [passwordArray]);

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
      [e.target.name]: e.target.value,
    });
  };

  const savePassword = () => {
    
    if (!form.site || !form.username || !form.password) {
      toast("Please fill all the fields", { theme: "dark" });
      return;
    }

    if (passwordArray.find((password) => password.site === form.site)) {
      toast("Password for this site already exists", { theme: "dark" });
      return;
    }

    const updatedPasswords = [...passwordArray, { ...form, id: uuidv4() }];
    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    setForm({
      site: "",
      username: "",
      password: "",
    });
    toast("Password Saved Successfully 👍", { theme: "dark" });
  };

  const copyTextHandle = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to Clipboard 📝", { theme: "dark" });
  };

  const handleDelete = (id) => {
    let confirm = window.confirm(
      "Are you sure you want to delete this password?"
    );
    if (confirm) {
      const updatedPasswords = passwordArray.filter(
        (password) => password.id !== id
      );
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    }
    toast("Password Deleted Successfully 🗑️", { theme: "dark" });
  };

  const handleEdit = (id) => {
    setForm(passwordArray.find((password) => password.id === id));
    const updatedPasswords = passwordArray.filter(
      (password) => password.id !== id
    );
    setPasswordArray(updatedPasswords);
  };

  return (
    <>
      <ToastContainer />
      
      <div className="container mx-auto font-roboto max-w-4xl bg-slate-100/25 backdrop-blur-md rounded-xl mt-8 mb-8 p-4 sm:p-8">
        <h1 className="text-4xl text-slate-200 text-center p-4 font-medium">
          PassKeep <br />{" "}
          <span className=" bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text font-bold">
            Password Manager{" "}
          </span>
        </h1>
        <div className="text-white flex flex-col p-4 w-full">
          <div className="flex flex-col gap-2 items-center">
            <h2 className=" text-md flex gap-2 items-center">
              Search Your Passwords <IoMdSearch />{" "}
            </h2>
            <input
              onChange={handleSearchChange}
              className="text-black font-medium p-1 w-full sm:w-[70%] rounded-full border-2 border-lime-500"
              type="text"
              placeholder={"Enter Search Term"}
            />
          </div>
          <div className="p-2 gap-4 flex flex-col justify-center items-center w-full my-4">
            <div className="w-full sm:w-[70%]">
              <label className="ml-1" htmlFor="website">
                Website Name
              </label>
              <input
                value={form.site}
                onChange={handleChange}
                name="site"
                placeholder="Enter Website URL"
                className="text-black font-medium p-1 w-full rounded-full border-2 border-lime-500"
                type="text"
              />
            </div>
            <div className="flex w-full sm:w-[70%] gap-4 flex-col sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label className="ml-1" htmlFor="username">
                  Username
                </label>{" "}
                <br />
                <input
                  value={form.username}
                  onChange={handleChange}
                  name="username"
                  placeholder="Enter Username"
                  className="text-black font-medium p-1 w-full rounded-full border-2 border-lime-500"
                  type="text"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="ml-1" htmlFor="password">
                  Password
                </label>{" "}
                <br />
                <div className="relative flex items-center">
                  <input
                    ref={passRef}
                    value={form.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="Enter Password"
                    className="text-black font-medium p-1 w-full rounded-full border-2 border-lime-500"
                    type="password"
                  />
                  <button
                    className="absolute right-0 flex justify-center items-center bg-lime-300 rounded-full h-full px-3"
                    onClick={showPassword}
                  >
                    <img ref={ref} src="/eye.svg" alt="eyeIcon" />
                  </button>
                </div>
              </div>
            </div>
            <button
              className="flex gap-1 items-center justify-center flex-shrink-0 text-gray-800 font-semibold bg-lime-400 border-0 px-3 py-1 focus:outline-none hover:bg-lime-600 hover:text-gray-200 rounded text-sm sm:mt-0"
              onClick={savePassword}
            >
              <HiOutlineViewGridAdd /> Save Password
            </button>
          </div>
        </div>

        <div className="container mx-auto p-4">
          <h2 className="text-center m-2 text-2xl font-bold text-slate-200">
            Your Passwords
          </h2>

          {filteredPasswords.length === 0 && (
            <h2 className="text-center m-2 text-2xl font-bold text-slate-200">
              No Passwords Saved
            </h2>
          )}

          {filteredPasswords.length > 0 && (
            <div className=" overflow-x-auto">
              <table className="table-auto w-full text-slate-100 rounded-md overflow-hidden">
                <thead className="bg-lime-600">
                  <tr>
                    <th className="text-md border border-slate-300 font-semibold py-2">
                      Website
                    </th>
                    <th className="text-md border border-slate-300 font-semibold py-2">
                      Username
                    </th>
                    <th className="text-md border border-slate-300 font-semibold py-2">
                      Password
                    </th>
                    <th className="text-md border border-slate-300 font-semibold py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-slate-50/25">
                  {filteredPasswords.map((password, index) => (
                    <tr key={index}>
                      <td className="py-2 border border-slate-300 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <a href={password.site} target="_site">
                            {password.site}
                          </a>
                          <div className="cursor-pointer">
                            <img
                              src="./copy.svg"
                              alt="copy"
                              className="hidden sm:block cursor-pointer hover:scale-[130%]"
                              onClick={() => copyTextHandle(password.site)}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-2 border border-slate-300 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <span>{password.username}</span>
                          <div className="cursor-pointer">
                            <img
                              src="./copy.svg"
                              alt="copy"
                              className="hidden sm:block cursor-pointer hover:scale-[130%]"
                              onClick={() => copyTextHandle(password.username)}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-2 border border-slate-300 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <span>{password.password}</span>
                          <div className="cursor-pointer">
                            <img
                              src="./copy.svg"
                              alt="copy"
                              className="hidden sm:block cursor-pointer hover:scale-[130%]"
                              onClick={() => copyTextHandle(password.password)}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-2 border border-slate-300 text-center">
                        <div className="text-slate-800 flex gap-2 items-center justify-center">
                          <span
                            className="text-lime-500 cursor-pointer"
                            title="Edit"
                            onClick={() => handleEdit(password.id)}
                          >
                            <MdEdit size={20} />
                          </span>
                          <span
                            className="text-red-400 cursor-pointer"
                            title="Delete"
                            onClick={() => handleDelete(password.id)}
                          >
                            <MdDeleteForever size={20} />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
