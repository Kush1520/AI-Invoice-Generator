import Header from "../../components/landing/Header"
import Hero from "../../components/landing/Hero"
import Features from "../../components/landing/Features"
import Testimonials from "../../components/landing/Testimonials"
import Faqs from "../../components/landing/Faqs"
import Footer from "../../components/landing/Footer"
import { DottedSurface } from "../../components/ui/dotted-surface"

const LandingPage = () => {
  return (
    <div className='relative min-h-screen text-zinc-400 bg-zinc-950 transition-colors duration-300 overflow-hidden'>
      {/* ThreeJS Animated Backdrop */}
      <DottedSurface className="opacity-100" />
      
      {/* Floating Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        <div className="absolute top-[10%] left-[15%] w-[380px] h-[380px] rounded-full bg-blue-600/5 blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[25%] right-[8%] w-[480px] h-[480px] rounded-full bg-indigo-600/5 blur-[130px] animate-float-reverse" />
      </div>

      <Header/>
      <main className="relative z-10">
        <Hero/>
        <Features/>
        <Testimonials/>
        <Faqs/>
        <Footer/>
      </main>
    </div>
  )
}

export default LandingPage