import { BrandMark, GitHub, Twitter, LinkedIn } from "@/components/icons";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content flex flex-col md:flex-row items-center md:justify-between p-4">
      <div className="flex flex-row items-center gap-4 text-center sm:text-left">
        <BrandMark className="fill-primary" />
        <p className="text-sm md:text-base">Made with curiosity and code</p>
      </div>

      <div className="flex items-center">
        <p className="text-sm md:text-base label-text">Join my network</p>
        <div className="divider divider-primary divider-horizontal"></div>
        <div className="flex gap-4">
          <a
            href="https://github.com/prince-io"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHub className="fill-current" />
          </a>

          <a
            href="https://x.com/prince_io_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <Twitter className="fill-current" />
          </a>

          <a
            href="https://www.linkedin.com/in/princesaini-io/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedIn className="fill-current" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
