
import React from 'react';
import { Icon } from './Icon';

interface HeaderProps {
  language: 'vi' | 'en';
  setLanguage: (lang: 'vi' | 'en') => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-4 sm:px-8 w-full sticky top-0 z-10">
      <div className="flex items-center space-x-3">
        <Icon name="computer" className="w-8 h-8 text-blue-600" />
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          {language === 'vi' ? 'Trung tâm Luyện tập Kỹ năng Máy tính' : 'Computer Skills Practice Center'}
        </h1>
      </div>
      <button
        onClick={toggleLanguage}
        className="flex items-center justify-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
      >
        <Icon name="language" className="w-5 h-5" />
        <span>{language === 'vi' ? 'English' : 'Tiếng Việt'}</span>
      </button>
    </header>
  );
};

export default Header;
