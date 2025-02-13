import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Phone, Linkedin, Instagram, Ship, ChevronRight, Calendar, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import createDOMPurify from 'dompurify';

const DOMPurify = createDOMPurify(window);

interface BlogPost {
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl?: string;
}

const Blog: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Fetch posts from backend
    fetch('http://localhost:3001/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleContactClick = () => {
    navigate('/#contact');
  };

  const handleReadMore = (post: BlogPost) => {
    // Convert the title to a URL-friendly slug
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    navigate(`/blog/${slug}`, { state: { post } });
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

                {/* Contact Button */}
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
      </header>

      {/* Main Content */}
      <section className="py-32 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#A4C2C2] uppercase tracking-wider font-medium"
            >
              Blog
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-[#006039] mt-4 mb-6"
            >
              Laatste Updates
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 max-w-2xl mx-auto text-lg"
            >
              Expertise, tips en nieuws over bootonderhoud en verzorging
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative w-full pb-[60%]"> {/* Increased height ratio for better visibility */}
                  {post.imageUrl ? (
                    <img
                      src={`http://localhost:3001${post.imageUrl}`}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-[#006039]/5 flex items-center justify-center">
                      <Ship className="w-12 h-12 text-[#006039]/20" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[#006039]">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{post.date}</span>
                    </div>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#006039] mb-3 group-hover:text-[#004c2d] transition-colors">
                    {post.title}
                  </h3>
                  <div
                    className="prose prose-sm max-w-none text-gray-600 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post.content)
                    }}
                  />
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => handleReadMore(post)}
                    className="inline-flex items-center text-[#006039] font-medium group-hover:text-[#004c2d]"
                  >
                    Lees Meer
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
                <Link to="/privacy" className="text-green-200 hover:text-white text-sm transition">Privacy Policy</Link>
                <Link to="/terms" className="text-green-200 hover:text-white text-sm transition">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;