import { Quote } from "lucide-react"
import { TESTIMONIALS } from "../../utils/data"

const Testimonials = () => {
  return (
    <section className="py-20 lg:py-28 bg-transparent" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold sm:text-4xl text-zinc-50 mb-4 capitalize">
                    What Our Customers Say
                </h2>
                <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                    We are trusted by thousands of small businesses globally.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {TESTIMONIALS.map((testimonial, index)=>(
                    <div key={index} className="bg-zinc-900/40 backdrop-blur-md rounded-2xl p-8 border border-zinc-800/80 shadow-sm hover:shadow-lg hover:border-zinc-700 transition-all duration-300 relative">
                        <div className="absolute -top-4 left-8 w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/25">
                            <Quote className="w-4 h-4"/>
                        </div>
                        <p className="text-zinc-300 mb-6 leading-relaxed italic text-lg">
                            "{testimonial.quote}"
                        </p>
                        <div className="flex items-center space-x-4">
                            <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover border-2 border-zinc-800" />
                            <div className="flex-1">
                                <p className="font-semibold text-zinc-100">{testimonial.author}</p>
                                <p className="text-zinc-400 text-sm">{testimonial.title}</p>
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