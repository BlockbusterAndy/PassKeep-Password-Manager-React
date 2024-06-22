import { BsShieldLockFill } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row justify-between items-center py-4 px-8 bg-slate-200 w-full">
      <div className="flex p-2 gap-2 items-center bg-transparent rounded-md px-4">
        <span className="font-semibold text-2xl">PassKeep</span>
        <span><BsShieldLockFill /></span>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8 text-center sm:text-left text-lg mt-4 sm:mt-0">
        <p>
          Made with ❤️ by 
          <a href="https://linktr.ee/blockbusterandy" target="_blank" className="font-semibold">@blockbusterandy</a>
        </p>
       
      </div>
    </footer>
  );
};

export default Footer;
