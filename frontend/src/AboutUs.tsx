import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X, Phone, Linkedin, Instagram, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleContactClick = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/#contact');
        }
    };

    return (
        <div className="min-h-screen bg-[#ffffff]">
            {/* Header */}
            <header className="fixed top-4 w-full z-50">
                <div className="container mx-auto px-6 sm:px-8">
                    <div className="bg-gradient-to-r from-[#005031] via-[#006039] to-[#1a745c] backdrop-blur-lg rounded-full shadow-[0_8px_32px_rgba(0,96,57,0.2)] border border-white/10">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="py-4 sm:py-5 px-6 sm:px-8 flex items-center justify-between text-white"
                        >
                            {/* Logo Section */}
                            <Link to="/" className="flex items-center group">
                                <div className="flex items-center">
                                    <div className="relative">
                                        <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#A4C2C2] via-white to-[#A4C2C2] bg-clip-text text-transparent">
                                            Pro
                                        </span>
                                        <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white/90 to-white text-transparent bg-clip-text">
                                            shine
                                        </span>
                                        <Sparkles className="absolute -top-1 -right-4 h-3 w-3 sm:h-4 sm:w-4 text-[#A4C2C2] group-hover:text-white transition-all duration-300" />
                                    </div>
                                </div>
                                <span className="text-base sm:text-lg font-medium ml-2 text-[#A4C2C2] group-hover:text-white transition-all duration-300">
                                    YACHTCARE
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center space-x-8">
                                <nav className="flex items-center space-x-8">
                                    {[
                                        { name: 'Home', path: '/' },
                                        { name: 'Diensten', path: '/services' },
                                        { name: 'Galerij', path: '/more-images' },
                                        { name: 'Blog', path: '/blog' },
                                        { name: 'Over Ons', path: '/about-us' }
                                    ].map((item, index) => (
                                        <Link
                                            key={index}
                                            to={item.path}
                                            className="relative text-sm uppercase tracking-wider font-medium text-white/90 hover:text-white transition-all duration-300 group"
                                        >
                                            <span className="relative z-10">{item.name}</span>
                                            <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-[#A4C2C2] via-white to-[#A4C2C2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                        </Link>
                                    ))}
                                </nav>

                                <div className="flex items-center space-x-6 pl-6 border-l border-white/10">
                                    <motion.span
                                        whileHover={{ scale: 1.02 }}
                                        className="hidden lg:flex items-center text-[#A4C2C2] hover:text-white transition-all duration-300 cursor-pointer"
                                    >
                                        <Phone className="h-4 w-4 mr-2" />
                                        <span className="text-sm font-medium">+31 642519677</span>
                                    </motion.span>

                                    <motion.button
                                        whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleContactClick}
                                        className="bg-gradient-to-r from-white via-[#f8f8f8] to-white text-[#006039] px-6 py-2.5 rounded-full font-medium text-sm uppercase tracking-wider transition-all duration-300 border border-white/50 shadow-[0_4px_16px_rgba(255,255,255,0.1)]"
                                    >
                                        Offerte Aanvragen
                                    </motion.button>
                                </div>
                            </div>

                            {/* Mobile Menu Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{
                        opacity: isMenuOpen ? 1 : 0,
                        backdropFilter: isMenuOpen ? "blur(16px)" : "blur(0px)",
                    }}
                    transition={{ duration: 0.3 }}
                    className={`fixed inset-0 bg-[#006039]/90 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'} z-40`}
                >
                    <div className="container mx-auto px-6 py-20">
                        <div className="flex flex-col items-center space-y-8">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Diensten', path: '/services' },
                                { name: 'Galerij', path: '/more-images' },
                                { name: 'Blog', path: '/blog' },
                                { name: 'Over Ons', path: '/about-us' }
                            ].map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.path}
                                    className="text-2xl font-medium text-white/90 hover:text-white transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <motion.button
                                onClick={() => {
                                    handleContactClick();
                                    setIsMenuOpen(false);
                                }}
                                className="bg-white text-[#006039] px-8 py-3 rounded-full font-medium hover:bg-[#A4C2C2] transition-colors"
                            >
                                Contact
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </header>

            {/* Main Content */}
            <section className="pt-32 pb-20">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-white"></div>
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="container mx-auto px-4"
                        >
                            <div className="text-center mb-16">
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-[#A4C2C2] uppercase tracking-wider font-medium"
                                >
                                    Ons Verhaal
                                </motion.span>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-4xl md:text-5xl font-bold text-[#006039] mt-4 mb-6"
                                >
                                    Premium Yacht Care Specialisten
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-gray-600 max-w-2xl mx-auto text-lg"
                                >
                                    Met meer dan 10 jaar ervaring in het leveren van uitzonderlijke service aan de meest veeleisende jachteigenaren
                                </motion.p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="grid md:grid-cols-2 gap-16 items-center"
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-8"
                                >
                                    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                                        <h3 className="text-2xl font-semibold text-[#006039] mb-4">Onze Historie</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Opgericht vanuit een passie voor perfectie, is Proshine Yachtcare uitgegroeid tot een
                                            toonaangevende specialist in premium bootonderhoud. Onze reis begon met één missie:
                                            het leveren van ongeëvenaarde kwaliteit in yacht care services.
                                        </p>
                                    </div>

                                    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                                        <h3 className="text-2xl font-semibold text-[#006039] mb-4">Onze Missie</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Wij streven ernaar om elke boot die aan onze zorg wordt toevertrouwd te transformeren
                                            naar zijn optimale staat. Door continue innovatie en toewijding aan kwaliteit zorgen
                                            wij voor resultaten die de verwachtingen overtreffen.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="relative"
                                >
                                    <motion.img
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                        src="/images/About_us.jpg"
                                        alt="Ons Team"
                                        className="rounded-2xl shadow-2xl w-full h-[600px] object-cover relative z-10"
                                    />
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-24 grid md:grid-cols-4 gap-8"
                            >
                                {[
                                    { title: "Kwaliteit", description: "Compromisloze aandacht voor detail in elk project" },
                                    { title: "Betrouwbaarheid", description: "Consistent excellent werk, keer op keer" },
                                    { title: "Professionaliteit", description: "Expert team met jarenlange ervaring" },
                                    { title: "Innovatie", description: "Gebruik van de nieuwste technologieën en technieken" }
                                ].map((value, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                                            <div className="text-[#006039] text-xl font-bold">{index + 1}</div>
                                        </div>
                                        <h3 className="text-xl font-semibold text-[#006039] mb-2">{value.title}</h3>
                                        <p className="text-gray-600">{value.description}</p>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-24 text-center"
                            >
                                <button
                                    onClick={handleContactClick}
                                    className="inline-flex items-center px-8 py-4 bg-[#006039] text-white rounded-full hover:bg-[#004c2d] transition-colors duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <span className="font-medium">Neem Contact Op</span>
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#006039] pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <span className="text-2xl font-bold text-[#A4C2C2]">Pro</span>
                                <span className="text-2xl font-bold text-white">shine</span>
                                <Sparkles className="h-4 w-4 text-[#A4C2C2] ml-1" />
                            </div>
                            <p className="text-green-200 text-sm leading-relaxed">
                                Premium yacht care services voor eigenaren die alleen het beste willen voor hun boot.
                            </p>
                            <div className="flex space-x-4 pt-4">
                                <motion.a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                >
                                    <Linkedin className="w-5 h-5 text-white" />
                                </motion.a>
                                <motion.a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                >
                                    <Instagram className="w-5 h-5 text-white" />
                                </motion.a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><Link to="/" className="text-green-200 hover:text-white transition">Home</Link></li>
                                <li><Link to="/services" className="text-green-200 hover:text-white transition">Diensten</Link></li>
                                <li><Link to="/more-images" className="text-green-200 hover:text-white transition">Galerij</Link></li>
                                <li><Link to="/blog" className="text-green-200 hover:text-white transition">Blog</Link></li>
                                <li><Link to="/about-us" className="text-green-200 hover:text-white transition">Over Ons</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Services</h4>
                            <ul className="space-y-2">
                                <li className="text-green-200">Complete Boot Detailing</li>
                                <li className="text-green-200">Bescherming & Onderhoud</li>
                                <li className="text-green-200">Periodiek Onderhoud</li>
                                <li className="text-green-200">Custom Services</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Contact</h4>
                            <ul className="space-y-2">
                                <li className="text-green-200">+31 6 42519677</li>
                                <li className="text-green-200">info@proshine.com</li>
                                <li className="text-green-200">Amsterdam, Noord-Holland</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-green-800 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="text-green-200 text-sm mb-4 md:mb-0">
                                © {new Date().getFullYear()} Proshine Yachtcare. All rights reserved.
                            </div>
                            <div className="flex space-x-6">
                                <Link to="/privacy" className="text-green-200 hover:text-white text-sm transition">
                                    Privacy Policy
                                </Link>
                                <Link to="/terms" className="text-green-200 hover:text-white text-sm transition">
                                    Terms of Service
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutUs;