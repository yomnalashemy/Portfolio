import { ArrowUpRight } from "lucide-react";

import { socialMedia } from "@/data";

const Footer = () => {
  return (
    <footer className="w-full pt-24 pb-10 border-t border-console-line" id="contact">
      <div className="flex flex-col items-start">
        <p className="eyebrow">04 / Contact</p>
        <h2 className="heading mt-3 max-w-xl">Got something worth building?</h2>
        <p className="mt-5 max-w-lg text-console-muted">
          Reach out and let&rsquo;s talk about it — I reply.
        </p>
        <a
          href="mailto:yomnaalshemy11@gmail.com"
          className="mt-8 inline-flex items-center gap-2 rounded-md border border-console-amber-dim bg-console-amber/10 px-5 py-3 font-mono text-sm text-console-amber hover:bg-console-amber/20 transition-colors"
        >
          yomnaalshemy11@gmail.com
          <ArrowUpRight className="size-4" />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col gap-6 justify-between items-center">
        <p className="font-mono text-xs text-console-faint">
          © {new Date().getFullYear()} Yomna Alshemy
        </p>

        <div className="flex items-center gap-3">
          {socialMedia.map((info) =>
            info.link ? (
              <a
                key={info.id}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex justify-center items-center rounded-md border border-console-line hover:border-console-amber transition-colors"
              >
                <img src={info.img} alt="icon" width={16} height={16} className="opacity-70" />
              </a>
            ) : (
              <div
                key={info.id}
                className="w-9 h-9 flex justify-center items-center rounded-md border border-console-line opacity-40"
              >
                <img src={info.img} alt="icon" width={16} height={16} className="opacity-70" />
              </div>
            ),
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
