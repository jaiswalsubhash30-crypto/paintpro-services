import { PaintBucket } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-foreground text-white pt-14 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary">
                <PaintBucket className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg">PaintPro</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-[200px]">
              Professional painting services that transform your space with
              lasting beauty.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.instagram.link"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.facebook.link"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.x.link"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white/40 mb-1">
              Company
            </div>
            {["About Us", "Our Team", "Careers", "Blog", "Press"].map(
              (item) => (
                <a
                  key={item}
                  href="/about"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ),
            )}
          </div>

          {/* Services */}
          <div className="flex flex-col gap-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white/40 mb-1">
              Services
            </div>
            {[
              "Interior Painting",
              "Exterior Painting",
              "Commercial",
              "Cabinet Painting",
              "Free Quote",
            ].map((item) => (
              <a
                key={item}
                href="#services"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white/40 mb-1">
              Legal
            </div>
            {[
              "Privacy Policy",
              "Terms of Service",
              "Cookie Policy",
              "Refund Policy",
            ].map((item) => (
              <a
                key={item}
                href="/legal"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 text-sm text-white/40">
          <span>© {year} PaintPro. All rights reserved.</span>
          <a
            href={utm}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/70 transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
