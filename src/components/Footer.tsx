import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const quickLinks = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'نبذة عني', href: '#about' },
    { name: 'مهاراتي', href: '#skills' },
    { name: 'أعمالي', href: '#projects' },
    { name: 'تواصل معي', href: '#contact' },

  ];


  const services = [
    'تطوير مواقع الويب',
    'تطوير تطبيقات الجوال',
    'تصميم واجهة المستخدم',
    'تحسين الأداء',
    'استشارات تقنية',
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <FaLinkedin/>, url: 'https://www.linkedin.com/in/ahmed-badawy-a69a7733a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { name: 'LinkedIn', icon: <FaGithub/>, url: 'https://github.com/ahmed01141277698/ahmed01141277698.git' },
    { name: 'Facebook', icon: <FaFacebook/>, url: 'https://www.facebook.com/share/1FJ1B3brfT/' },
    { name: 'TikTok', icon: <AiFillTikTok/>, url: 'https://www.tiktok.com/@ahmedbadawy845?_t=ZS-90AY853nYMi&_r=1' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative border-t transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-t from-slate-900 to-slate-800 border-slate-700/50' 
        : 'bg-gradient-to-t from-gray-100 to-white border-gray-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              className="text-3xl font-bold"
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'linear-gradient(45deg, #60A5FA, #A78BFA, #F472B6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              RETURN
            </motion.div>
            <p className="text-gray-300 leading-relaxed text-right">
              مطور ويب شغوف بتطوير حلول رقمية إبداعية تحول الأفكار إلى واقع رقمي يخدم ..الأعمال    والمجتمع
            </p>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">روابط سريعة</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 block py-1"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">خدماتي</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  className="text-gray-300 py-1"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-blue-400 mr-2">▶</span>
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">معلومات التواصل</h3>
            <div className="space-y-4">
              <motion.div
                className="flex items-center space-x-3 rtl:space-x-reverse text-gray-300"
                whileHover={{ x: 5 }}
              >
                <span className="text-blue-400">📧</span>
                <span>ab1340@fayoum.edu.eg</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 rtl:space-x-reverse text-gray-300"
                whileHover={{ x: 5 }}
              >
                <span className="text-blue-400">📱</span>
                <span>+20 11 412 77 698</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 rtl:space-x-reverse text-gray-300"
                whileHover={{ x: 5 }}
              >
                <span className="text-blue-400">📍</span>
                <span>الجيزة ، مدينة 6 اكتوبر ، مصر</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 rtl:space-x-reverse mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-green-300 text-sm">متاح للعمل</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-slate-700/50 mt-12 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              className="text-gray-400 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
            >
              © {currentYear} أحمد بدوي. جميع الحقوق محفوظة.
            </motion.p>

         
            
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-20 bg-gradient-to-b from-blue-400/50 to-transparent"
        initial={{ height: 0 }}
        whileInView={{ height: 80 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.5 }}
      />
      
      <motion.div
        className="absolute top-0 right-1/4 w-px h-20 bg-gradient-to-b from-purple-400/50 to-transparent"
        initial={{ height: 0 }}
        whileInView={{ height: 80 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.7 }}
      />
    </footer>
  );
}