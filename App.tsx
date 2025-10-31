
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchExercises } from './services/geminiService';
import type { Exercise } from './types';
import Header from './components/Header';
import ExerciseList from './components/ExerciseList';
import ExerciseDetail from './components/ExerciseDetail';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseId, setCurrentExerciseId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadExercises = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedExercises = await fetchExercises();
      setExercises(fetchedExercises);
      if (fetchedExercises.length > 0) {
        setCurrentExerciseId(fetchedExercises[0].id);
      }
    } catch (err) {
      setError('Failed to load exercises. Please check your connection and API key.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const currentExercise = useMemo(() => {
    return exercises.find(ex => ex.id === currentExerciseId) || null;
  }, [exercises, currentExerciseId]);

  const currentExerciseIndex = useMemo(() => {
    return exercises.findIndex(ex => ex.id === currentExerciseId);
  }, [exercises, currentExerciseId]);

  const handleNextExercise = useCallback(() => {
    if (currentExerciseIndex !== -1 && currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseId(exercises[currentExerciseIndex + 1].id);
    }
  }, [currentExerciseIndex, exercises]);

  const handlePrevExercise = useCallback(() => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseId(exercises[currentExerciseIndex - 1].id);
    }
  }, [currentExerciseIndex, exercises]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={loadExercises}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header language={language} setLanguage={setLanguage} />
      <main className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
        <ExerciseList
          exercises={exercises}
          language={language}
          currentExerciseId={currentExerciseId}
          onSelectExercise={setCurrentExerciseId}
        />
        <ExerciseDetail
          exercise={currentExercise}
          language={language}
          onNext={handleNextExercise}
          onPrev={handlePrevExercise}
          isFirst={currentExerciseIndex === 0}
          isLast={currentExerciseIndex === exercises.length - 1}
        />
      </main>
    </div>
  );
};

export default App;
