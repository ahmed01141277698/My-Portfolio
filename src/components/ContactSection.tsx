import { motion } from 'motion/react';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

  import emailjs from "emailjs-com";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await emailjs.send(
      "service_c7jjl0j", // من EmailJS
      "template_l32l0j2", // من EmailJS
      {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
      "e8_MjB-Un9xbKp4NB" // من EmailJS
    );

    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  } catch (error) {
    alert("❌ حصل خطأ أثناء الإرسال");
    console.error(error);
  } finally {
    setIsSubmitting(false);
    setTimeout(() => setSubmitted(false), 3000);
  }
};

    
    // Simulate form submission
  //   setTimeout(() => {
  //     setIsSubmitting(false);
  //     setSubmitted(true);
  //     setFormData({ name: '', email: '', subject: '', message: '' });
      
  //     setTimeout(() => setSubmitted(false), 3000);
  //   }, 2000);
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'البريد الإلكتروني',
      value: 'ab1340@fayoum.edu.eg',
      link: 'mailto:ab1340@fayoum.edu.eg'
    },
    {
      icon: '📱',
      title: 'الهاتف',
      value: '+20 11 412 77 698 + Whatsapp',
      link: "https://wa.me/201141277698" ,
    },
 

  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: <FaLinkedin/>, url: 'https://www.linkedin.com/in/ahmed-badawy-a69a7733a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',color: 'from-gray-600 to-gray-800'  },
    { name: 'GitHub', icon: <FaGithub/>, url: 'https://github.com/ahmed01141277698/ahmed01141277698.git' , color: 'from-blue-600 to-blue-800'},
    { name: 'Facebook', icon: <FaFacebook/>, url: 'https://www.facebook.com/share/1FJ1B3brfT/',color: 'from-blue-400 to-blue-600' },
    { name: 'TikTok', icon: <AiFillTikTok />, url: 'https://www.tiktok.com/@ahmedbadawy845?_t=ZS-90AY853nYMi&_r=1', color: 'from-blue-500 to-purple-600' },
    { name: 'Instagram', icon: <FaInstagram />, url: 'https://www.instagram.com/mazika7210?igsh=M2lhYmJuZGJmdnh4', color: 'from-blue-500 to-purple-600' },
              { name: 'Whatsapp', icon: <FaWhatsapp/>, url: 'https://wa.me/201141277698', color: 'from-blue-500 to-purple-600'},
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            تواصل معي
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-pink-400 to-red-400 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            هل لديك مشروع في ذهنك؟ أو تريد مناقشة فكرة؟ أو حتى مجرد القول مرحباً؟
            <br />
            سأكون سعيداً للغاية بالتواصل معك!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-2xl p-8 backdrop-blur-sm border border-slate-700/30"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">أرسل لي رسالة</h3>
              
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-600/20 border border-green-500/30 rounded-lg text-green-300"
                >
                  ✅ تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-white mb-2">الاسم</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="اسمك الكريم"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-white mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="example@email.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-white mb-2">الموضوع</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="موضوع الرسالة"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-white mb-2">الرسالة</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>جاري الإرسال...</span>
                    </div>
                  ) : (
                    'إرسال الرسالة'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  className="group flex items-center space-x-4 rtl:space-x-reverse p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-xl backdrop-blur-sm border border-slate-700/30 hover:border-blue-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-3xl group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{info.title}</h4>
                    <p className="text-gray-300 group-hover:text-blue-300 transition-colors">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-xl p-6 backdrop-blur-sm border border-slate-700/30"
            >
              <h4 className="text-xl font-bold text-white mb-6">تابعني على</h4>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className={`flex items-center justify-center space-x-2 rtl:space-x-reverse p-4 bg-gradient-to-r ${social.color} rounded-lg text-white font-semibold hover:scale-105 transition-transform`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xl">{social.icon}</span>
                    <span>{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl p-6 backdrop-blur-sm border border-green-500/30"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse text-right">
                <motion.div
                  className="w-4 h-4 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <h4 className="text-green-300 font-semibold text-right">متاح للعمل</h4>
              </div>
              <p className="text-green-200 mt-2 text-right">
                متاح حالياً لمشاريع جديدة ومثيرة للاهتمام. دعنا نتحدث!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-pink-400/20 to-red-600/20 rounded-full"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-2xl"
        animate={{
          rotate: [0, 180, 360],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  );
}