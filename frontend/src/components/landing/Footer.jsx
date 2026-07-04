import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const links = {
    Product: [
      { name: 'How it works', path: '/how-it-works' },
      { name: 'Features', path: '/features' },
      { name: 'Templates', path: '/templates' },
      { name: 'Integrations', path: '/integrations', badge: 'New' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Changelog', path: '/changelog' },
    ],
    Resources: [
      { name: 'Documentation', path: '/docs' },
      { name: 'API reference', path: '/api' },
      { name: 'Blog', path: '/blog' },
      { name: 'Invoice guide', path: '/guide' },
      { name: 'Tax tips', path: '/tax' },
      { name: 'Freelancer hub', path: '/freelancers' },
    ],
    Company: [
      { name: 'About', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Security', path: '/security' },
      { name: 'Help center', path: '/help' },
      { name: 'Contact us', path: '/contact' },
    ],
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-900 pt-12 pb-8 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center shadow-md shadow-blue-500/10">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">InvoiceAI</span>
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20 px-2.5 py-0.5 rounded-full mb-4 border border-blue-100/50 dark:border-blue-950">
            ✦ Powered by AI
          </span>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[220px] mb-5">
            Generate professional invoices in seconds. Let AI handle the formatting so you can focus on your work.
          </p>

          {/* Socials */}
          <div className="flex gap-2">
            {[
              { name: 'X', link: '#' },
              { name: 'LinkedIn', link: '#' },
              { name: 'GitHub', link: '#' },
            ].map((s) => (
              <a
                key={s.name}
                href={s.link}
                className="px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-100 transition duration-200"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <div className="text-xs font-bold text-zinc-900 dark:text-zinc-150 uppercase tracking-widest mb-4">
              {title}
            </div>

            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    {item.name}

                    {item.badge && (
                      <span className="text-[10px] bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-semibold border border-blue-100/50 dark:border-blue-900/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-900 flex flex-wrap items-center justify-between gap-4">
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          © {new Date().getFullYear()} InvoiceAI, Inc. All rights reserved.
        </span>

        <span className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-1 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          All systems operational
        </span>

        <div className="flex gap-4">
          <Link to="/privacy" className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300">
            Privacy policy
          </Link>
          <Link to="/terms" className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300">
            Terms of service
          </Link>
          <Link to="/cookies" className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300">
            Cookie settings
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;