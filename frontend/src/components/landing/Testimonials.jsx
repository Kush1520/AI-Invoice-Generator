import { Quote, Star } from "lucide-react"
import { TESTIMONIALS } from "../../utils/data"

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32 bg-transparent overflow-hidden">
      
      {/* Background glow decoration */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block bg-blue-50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight leading-tight mb-4">
            Trusted by Business Owners
          </h2>
          <p className="text-lg text-slate-500 dark:text-zinc-400 max-w-xl mx-auto">
            Discover how professionals use InvoiceAI to save hours on billing every week.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <div
              key={index}
              className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 dark:border-zinc-800/80 shadow-sm relative group hover:border-slate-350 dark:hover:border-zinc-700 transition-all duration-300"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Quote Icon styling */}
              <div className="absolute top-8 right-8 text-blue-500/10 dark:text-blue-500/5 pointer-events-none group-hover:text-blue-500/20 dark:group-hover:text-blue-500/10 transition-colors duration-300">
                <Quote className="w-12 h-12 rotate-180" />
              </div>

              {/* Star Rating */}
              <div className="flex gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-slate-700 dark:text-zinc-300 text-sm leading-relaxed mb-8 relative z-10 font-medium">
                "{t.review}"
              </p>

              {/* User Bio */}
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-zinc-800"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-zinc-50">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    {t.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials