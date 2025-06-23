import { Shield, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer footer-center p-8 bg-base-200 border-t border-base-300 mt-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">PassKeep</span>
            <span className="text-sm text-base-content/60">v2.0.0</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 text-base-content">
            <span>Made with</span>
            <Heart className="w-5 h-5 text-red-500 fill-current animate-pulse" />
            <span>by</span>
            <a 
              href="https://linktr.ee/blockbusterandy" 
              target="_blank" 
              className="link link-primary font-bold hover:link-hover"
              rel="noopener noreferrer"
            >
              @blockbusterandy
            </a>
          </div>
          
          <div className="flex gap-2">
            <div className="badge badge-outline badge-sm">React</div>
            <div className="badge badge-outline badge-sm">DaisyUI</div>
            <div className="badge badge-outline badge-sm">Tailwind</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
