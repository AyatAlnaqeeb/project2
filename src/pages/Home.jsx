import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Search, UserPlus } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StatsCarousel from '../components/StatsCarousel';
import donateimage2 from '../assets/donateimage2.webp'; // استخدام WebP بدلاً من الصور الكبيرة
import translations from '../translations'; // استيراد ملف الترجمة الموحد

const Home = () => {
  const lang = localStorage.getItem('language') || 'en';
  const t = translations[lang]; // الترجمة بناءً على اللغة المختارة

  return (
    <>
      {/* Hero Section */}
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">
        {/* Background */}
        <div
          className="position-absolute top-0 start-0"
          style={{
            width: '100vw',
            height: '100%',
            backgroundImage: `url(${donateimage2})`, // تعيين الصورة بتنسيق WebP
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            opacity: 0.2,
          }}
        >
          <div
            className="w-100 h-100"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
          ></div>
        </div>

        {/* Content */}
        <div className="container position-relative z-1">
          <h1 className="display-4 fw-bold text-dark mb-4">
            {lang === 'en' ? 'Share Kindness, ' : 'شارك اللطف، '}
            <span className="text-warning">
              {lang === 'en' ? 'Make Impact' : 'وصنع الأثر'}
            </span>
          </h1>
          <p className="lead text-dark mb-4 mx-auto" style={{ maxWidth: '600px' }}>
            {lang === 'en'
              ? 'Join our community of givers and make a difference in someone\'s life through the power of sharing.'
              : 'انضم إلى مجتمع العطاء واصنع فرقًا في حياة شخص من خلال قوة المشاركة.'}
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/add-donation" className="btn btn-light d-flex align-items-center gap-2">
              <Gift size={20} /> {lang === 'en' ? 'Donate Now' : 'تبرع الآن'}
            </Link>
            <Link to="/donations" className="btn btn-outline-light d-flex align-items-center gap-2">
              <Search size={20} /> {lang === 'en' ? 'Browse Donations' : 'تصفح التبرعات'}
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="position-relative min-vh-100 w-100 d-flex align-items-center justify-content-center bg-white">
        <StatsCarousel />
      </div>

      {/* CTA Section */}
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">
        <div
          className="position-absolute start-0 end-0"
          style={{
            width: '100%',
            height: '90%',
            backgroundImage: `url(${donateimage2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            opacity: 0.2,
          }}
        >
          <div
            className="w-100 h-100"
            style={{ backgroundColor: 'rgba(218, 20, 20, 0.4)' }}
          ></div>
        </div>

        <div className="container position-relative z-1">
          <h2 className="display-4 fw-bold text-dark mb-4">
            {lang === 'en' ? 'Ready to Make a ' : 'هل أنت مستعد لترك '}
            <span className="text-warning">
              {lang === 'en' ? 'Difference?' : 'أثر؟'}
            </span>
          </h2>
          <p className="lead text-dark mb-4 mx-auto" style={{ maxWidth: '600px' }}>
            {lang === 'en'
              ? 'Join our community today and start sharing kindness with those in need.'
              : 'انضم إلى مجتمعنا اليوم وابدأ بمشاركة اللطف مع المحتاجين.'}
          </p>
          <div className="d-flex justify-content-center">
            <Link to="/auth" className="btn btn-light d-inline-flex align-items-center gap-2">
              <UserPlus size={20} /> {lang === 'en' ? 'Join Now' : 'انضم الآن'}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
