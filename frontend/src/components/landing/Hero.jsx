import React from 'react'
import { Link } from 'react-router-dom'
import HERO_IMG from '../../assets/HERO_IMG.png'
import { useAuth } from '../../context/authContext';

const Hero = () => {
    const {isAuthenticated} = useAuth();

    return (
        <section className='relative bg-transparent overflow-hidden min-h-screen flex items-center pt-16'>
            <div className='relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-32 w-full'>

                {/* Text block */}
                <div className='text-center max-w-3xl mx-auto mb-16'>
                    <h1 className='text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-zinc-50 dark:via-zinc-150 dark:to-zinc-400 bg-clip-text text-transparent'>
                        Intelligent Invoicing<br/>Redefined by AI
                    </h1>
                    <p className='text-lg sm:text-xl text-slate-600 dark:text-zinc-350 mb-12 leading-relaxed max-w-2xl mx-auto'>
                        Convert simple text descriptions into professional invoices, automate follow-ups for overdue accounts, and optimize business cashflow effortlessly.
                    </p>

                    {/* Buttons */}
                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4.5'>
                        {isAuthenticated ? (
                            <Link
                                to='/dashboard'
                                className='w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg shadow-blue-600/10 hover:scale-[1.02] active:scale-[0.98]'
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <Link
                                to='/signup'
                                className='w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg shadow-blue-600/10 hover:scale-[1.02] active:scale-[0.98]'
                            >
                                Get Started for Free
                            </Link>
                        )}

                        <a href='#features'
                            className='w-full sm:w-auto border border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md text-slate-800 dark:text-zinc-200 hover:text-slate-950 dark:hover:text-zinc-50 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:bg-white/80 dark:hover:bg-zinc-900/80 hover:scale-[1.02] active:scale-[0.98] border-solid'
                        >
                            Explore Features
                        </a>
                    </div>
                </div>

                {/* Hero image */}
                <div className='mt-8 max-w-4xl mx-auto px-2 sm:px-0 relative group'>
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur opacity-15 dark:opacity-25 group-hover:opacity-25 transition duration-1000 group-hover:duration-200"></div>
                    <img
                        src={HERO_IMG}
                        alt='Invoice-App Screenshot'
                        className='relative w-full rounded-2xl shadow-xl border border-slate-200/80 dark:border-zinc-800/80'
                    />
                </div>

            </div>
        </section>
    )
}

export default Hero