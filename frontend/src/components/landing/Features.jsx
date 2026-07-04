import { ArrowRight } from "lucide-react"
import { FEATURES } from "../../utils/data"

const Features = () => {
  return (
    <section id="features" className="relative py-24 lg:py-32 bg-transparent overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block bg-blue-950/30 border border-blue-900/50 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-50 tracking-tight leading-tight mb-4">
            Powerful Features to Run<br className="hidden sm:block" /> Your Business
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            Everything you need to manage your invoicing and get paid — faster than ever.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-zinc-700 hover:-translate-y-1.5 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon bubble */}
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-800/50 group-hover:bg-blue-500 transition-colors duration-300">
                <feature.icon className="h-5 w-5 text-blue-400 group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Index number */}
              <span className="absolute top-7 right-7 text-4xl font-black text-zinc-800/30 group-hover:text-blue-900/10 transition-colors duration-300 select-none leading-none">
                0{index + 1}
              </span>

              <h3 className="text-base font-bold text-zinc-100 mb-2 leading-snug">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                {feature.description}
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Learn More
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features