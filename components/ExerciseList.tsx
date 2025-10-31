
import React from 'react';
import type { Exercise } from '../types';
import { Icon } from './Icon';

interface ExerciseListProps {
  exercises: Exercise[];
  language: 'vi' | 'en';
  currentExerciseId: string | null;
  onSelectExercise: (id: string) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, language, currentExerciseId, onSelectExercise }) => {
  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 overflow-y-auto h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">{language === 'vi' ? 'Danh sách bài tập' : 'Exercise List'}</h2>
      </div>
      <nav>
        <ul>
          {exercises.map((exercise, index) => (
            <li key={exercise.id}>
              <button
                onClick={() => onSelectExercise(exercise.id)}
                className={`w-full text-left p-4 flex items-center space-x-4 transition-colors duration-200 ${
                  currentExerciseId === exercise.id
                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className={`flex-shrink-0 w-8 text-center text-sm font-medium ${currentExerciseId === exercise.id ? 'text-blue-600' : 'text-gray-500'}`}>
                    {index + 1}
                </span>
                <Icon name={exercise.icon} className={`w-5 h-5 flex-shrink-0 ${currentExerciseId === exercise.id ? 'text-blue-600' : 'text-gray-500'}`} />
                <span className="flex-grow">{exercise.title[language]}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default ExerciseList;
