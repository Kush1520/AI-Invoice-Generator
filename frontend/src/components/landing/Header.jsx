import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FileText, Menu, X } from 'lucide-react'
import ProfileDropdown from "../layout/ProfileDropDown";
import Button from "../ui/Button";
import { useAuth } from "../../context/authContext";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [ProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const {isAuthenticated, user, logout} = useAuth();
    
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled ? "bg-zinc-950/90 backdrop-blur-md shadow-sm border-b border-zinc-900" : "bg-transparent"
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">

                    {/* Logo */}
                    <div className="flex items-center space-x-2.5">
                        <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20">
                            <FileText className="w-4.5 h-4.5 text-white" />
                        </div>
                        <span className="font-bold text-zinc-50 tracking-tight text-lg">InvoiceAI</span>
                    </div>

                    {/* Nav links */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        <a href="#features" className="text-zinc-400 hover:text-zinc-550 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all hover:after:w-full py-1">
                            Features
                        </a>
                        <a href="#testimonials" className="text-zinc-400 hover:text-zinc-550 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all hover:after:w-full py-1">
                            Testimonials
                        </a>
                        <a href="#faq" className="text-zinc-400 hover:text-zinc-550 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all hover:after:w-full py-1">
                            FAQ
                        </a>
                    </nav>

                    {/* Desktop Right Side */}
                    <div className="hidden lg:flex items-center space-x-5">
                        {isAuthenticated ? (
                            <ProfileDropdown
                                isOpen={ProfileDropdownOpen}
                                onToggle={(e) => {
                                    e.stopPropagation();
                                    setProfileDropdownOpen(!ProfileDropdownOpen);
                                }}
                                avatar={user.avatar || ""}
                                companyName={user.companyName || user.name || ""}
                                email={user.email || ""}
                                onLogout={logout}
                            />
                        ) : (
                            <>
                                <Link to="/login" className="text-zinc-300 hover:text-zinc-50 font-medium transition-colors duration-200">
                                    Login
                                </Link>
                                <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold shadow-md shadow-blue-500/5 transition-all duration-300 hover:scale-105 active:scale-95">
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Controls */}
                    <div className="lg:hidden flex items-center space-x-3">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900 transition-colors duration-200"
                        >
                            {isMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-900 shadow-xl transition-all duration-300">
                    <div className="px-4 pt-2 pb-5 space-y-1">
                        <a href="#features" className="block px-4 py-3 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/50 rounded-xl font-medium transition-colors duration-200">
                            Features
                        </a>
                        <a href="#testimonials" className="block px-4 py-3 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/50 rounded-xl font-medium transition-colors duration-200">
                            Testimonials
                        </a>
                        <a href="#faq" className="block px-4 py-3 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/50 rounded-xl font-medium transition-colors duration-200">
                            FAQ
                        </a>
                        <div className="border-t border-zinc-900 my-2"></div>
                        
                        {isAuthenticated ? (
                            <div className="pt-2">
                                <Button onClick={() => navigate("/dashboard")} className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold">
                                    Go to Dashboard
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 pt-2">
                                <Link to="/login" className="block text-center py-3 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/50 rounded-xl font-medium transition-colors duration-200">
                                    Login
                                </Link>
                                <Link to="/signup" className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-md shadow-blue-500/10">
                                    Signup
                                </Link>
                            </div>
                        )} 
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header