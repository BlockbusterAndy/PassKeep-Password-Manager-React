import { Shield, Github, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar bg-base-100 shadow-xl border-b border-base-300 sticky top-0 z-50 backdrop-blur-sm">
      <div className="navbar-start">
        <div className="flex items-center gap-3 ml-4">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-primary">PassKeep</span>
            <span className="text-xs text-base-content/60 font-medium">Secure Password Manager</span>
          </div>
        </div>
      </div>
      
      <div className="navbar-end">
        <div className="flex items-center gap-4 mr-4">
          {/* Theme Toggle */}
          <div className="tooltip tooltip-bottom" data-tip={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <label className="swap swap-rotate btn btn-ghost btn-circle">
              <input 
                type="checkbox" 
                onChange={toggleTheme} 
                checked={theme === 'dark'}
              />
              <Sun className="swap-off w-6 h-6 text-warning" />
              <Moon className="swap-on w-6 h-6 text-info" />
            </label>
          </div>

          {/* GitHub Link */}
          <div className="tooltip tooltip-bottom" data-tip="View on GitHub">
            <a 
              href="https://github.com/BlockbusterAndy/PassKeep-Password-Manager-React" 
              target="_blank"
              className="btn btn-primary btn-sm shadow-lg hover:shadow-xl transition-all gap-2"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar