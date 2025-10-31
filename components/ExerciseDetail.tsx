
import React from 'react';
import type { Exercise } from '../types';
import { Icon } from './Icon';

interface ExerciseDetailProps {
  exercise: Exercise | null;
  language: 'vi' | 'en';
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({ exercise, language, onNext, onPrev, isFirst, isLast }) => {
  if (!exercise) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="text-center">
          <Icon name="computer" className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600">
            {language === 'vi' ? 'Chọn một bài tập để bắt đầu' : 'Select an exercise to begin'}
          </h2>
          <p className="text-gray-500 mt-2">
            {language === 'vi' ? 'Thực hành các kỹ năng máy tính cơ bản theo từng bước.' : 'Practice basic computer skills step-by-step.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-start space-x-4 border-b border-gray-200 pb-4 mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
             <Icon name={exercise.icon} className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-600">{language === 'vi' ? 'Bài tập' : 'Exercise'}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{exercise.title[language]}</h2>
          </div>
        </div>

        <div className="space-y-4">
          {exercise.steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4 p-3 rounded-md hover:bg-gray-50">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-200 text-gray-700 font-bold rounded-full flex items-center justify-center">
                {index + 1}
              </div>
              <p className="text-gray-700 leading-relaxed pt-1">{step[language]}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Icon name="arrow-left" className="w-4 h-4" />
            <span>{language === 'vi' ? 'Trước' : 'Previous'}</span>
          </button>
          <button
            onClick={onNext}
            disabled={isLast}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>{language === 'vi' ? 'Tiếp theo' : 'Next'}</span>
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExerciseDetail;
