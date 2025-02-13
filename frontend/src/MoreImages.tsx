import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X, Phone, ChevronLeft, ChevronRight, Linkedin, Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MoreImages = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const navigate = useNavigate();

    const galleryImages = [
        {
            before: "/images/before_blue.jpg",
            after: "/images/after_blue.jpg",
            title: "Luxury Yacht Restoration",
            description: "Complete transformatie van een klassieke yacht"
        },
        {
            before: "/images/before_dark_grey.jpg",
            after: "/images/after_dark_gray.jpg",
            title: "Sportboot Detailing",
            description: "Professionele reiniging en bescherming"
        },
        {
            before: "/images/before_gray.jpg",
            after: "/images/after_gray.jpg",
            title: "Premium Coating",
            description: "Langdurige bescherming met ceramic coating"
        },
        {
            before: "/images/before_white.jpg",
            after: "/images/after_white.jpg",
            title: "Hull Restoration",
            description: "Volledige romp renovatie en polijsten"
        },
        {
            before: "/images/gallery5-before.jpg",
            after: "/images/gallery5-after.jpg",
            title: "Interior Detailing",
            description: "Luxe interieur reiniging en verzorging"
        },
        {
            before: "/images/gallery6-before.jpg",
            after: "/images/gallery6-after.jpg",
            title: "Teak Deck Service",
            description: "Specialistische behandeling van teak dekken"
        }
    ];

    const videos = [
        {
            id: "video1",
            title: "Boot Polijsten",
            description: "Professioneel polijstproces van begin tot eind",
            url: "https://www.youtube.com/embed/v23WbszdoI8?si=eSP28diq8EarVxQr",
            modalUrl: "https://www.youtube.com/embed/v23WbszdoI8?si=eSP28diq8EarVxQr&autoplay=1"
        },
        {
            id: "video2",
            title: "Ceramic Coating",
            description: "Applicatie van premium ceramic coating",
            url: "https://www.youtube.com/embed/your-video-id-2",
            modalUrl: "https://www.youtube.com/embed/your-video-id-2?autoplay=1"
        },
        {
            id: "video3",
            title: "Interieur Detailing",
            description: "Gedetailleerd reinigingsproces van het interieur",
            url: "https://www.youtube.com/embed/your-video-id-3",
            modalUrl: "https://www.youtube.com/embed/your-video-id-3?autoplay=1"
        }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleImageClick = (index: number) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === galleryImages.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? galleryImages.length - 1 : prev - 1
        );
    };

    const handleContactClick = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/#contact');
        }
    };

    const handleVideoClick = (videoUrl: string) => {
        setSelectedVideo(videoUrl);
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
                                        { name: 'Blog', path: '/blog' },     // Add this line
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
                                { name: 'Blog', path: '/blog' },     // Add this line
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

            {/* Hero Section */}
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
                                    Onze Projecten
                                </motion.span>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-4xl md:text-5xl font-bold text-[#006039] mt-4 mb-6"
                                >
                                    Transformatie Galerij
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-gray-600 max-w-2xl mx-auto text-lg"
                                >
                                    Bekijk onze meest indrukwekkende transformaties en restauraties
                                </motion.p>
                            </div>

                            {/* Gallery Grid */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {galleryImages.map((image, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.2 }}
                                        className="group cursor-pointer"
                                        onClick={() => handleImageClick(index)}
                                        layoutId={`gallery-image-${index}`}
                                    >
                                        <div className="relative overflow-hidden rounded-2xl shadow-lg">
                                            {/* Change the aspect ratio here */}
                                            <div className="aspect-w-16 aspect-h-12"> {/* Changed from aspect-h-9 to aspect-h-12 */}
                                                <img
                                                    src={image.before}
                                                    alt={image.title}
                                                    className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                                    <h3 className="text-lg font-semibold mb-2">{image.title}</h3> {/* Changed from text-xl to text-lg */}
                                                    <p className="text-sm text-gray-200">{image.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Add this before the footer */}
            <section className="py-24 bg-gradient-to-b from-white to-green-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-[#A4C2C2] uppercase tracking-wider font-medium"
                        >
                            Video Galerij
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-5xl font-bold text-[#006039] mt-4 mb-6"
                        >
                            Bekijk Ons in Actie
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-600 max-w-2xl mx-auto text-lg"
                        >
                            Ontdek onze werkprocessen en resultaten in detail
                        </motion.p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videos.map((video, index) => (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
                                layoutId={`video-container-${video.id}`}
                                onClick={() => handleVideoClick(video.modalUrl)}
                            >
                                <div className="aspect-w-16 aspect-h-14 relative"> {/* Changed from aspect-h-12 to aspect-h-14 */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                        <motion.div
                                            className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <svg className="w-8 h-8 text-[#006039] translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                    <iframe
                                        className="w-full h-full pointer-events-none"
                                        src={video.url}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-[#006039] mb-2">
                                        {video.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {video.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Process steps section remains the same */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8 mt-16"
                    >
                        {[
                            {
                                step: "1",
                                title: "Inspectie",
                                description: "Grondige analyse van de staat van uw boot"
                            },
                            {
                                step: "2",
                                title: "Behandeling",
                                description: "Professionele reiniging en behandeling"
                            },
                            {
                                step: "3",
                                title: "Resultaat",
                                description: "Perfecte afwerking en bescherming"
                            }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="w-12 h-12 bg-[#006039] rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-semibold text-[#006039] mb-2">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Image Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-4 right-4 text-white p-2 hover:text-[#A4C2C2] transition-colors z-50"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation();
                                setIsModalOpen(false);
                            }}
                        >
                            <X size={24} />
                        </motion.button>
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 hover:text-[#A4C2C2] transition-colors"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                        >
                            <ChevronLeft size={40} />
                        </motion.button>
                        <motion.div
                            layoutId={`gallery-image-${currentImageIndex}`}
                            transition={{
                                duration: 0.5,
                                type: "spring",
                                stiffness: 200,
                                damping: 25
                            }}
                            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                            className="relative rounded-xl overflow-hidden"
                        >
                            <motion.img
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                src={galleryImages[currentImageIndex].before}
                                alt={galleryImages[currentImageIndex].title}
                                className="max-h-[80vh] max-w-[80vw] object-contain"
                            />
                        </motion.div>
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 hover:text-[#A4C2C2] transition-colors"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                        >
                            <ChevronRight size={40} />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-4 right-4 text-white p-2 hover:text-[#A4C2C2] transition-colors z-50"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation();
                                setSelectedVideo(null);
                            }}
                        >
                            <X size={24} />
                        </motion.button>
                        <motion.div
                            layoutId={`video-container-${selectedVideo.split('?')[0]}`}
                            transition={{
                                duration: 0.5,
                                type: "spring",
                                stiffness: 200,
                                damping: 25
                            }}
                            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                            className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden"
                        >
                            <motion.iframe
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full"
                                src={selectedVideo}
                                title="Video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></motion.iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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

export default MoreImages;