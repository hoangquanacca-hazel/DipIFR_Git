import React, { useState, useEffect } from 'react';
import { MODULES } from '../constants';
// --- SỬA QUAN TRỌNG: Import trực tiếp biến dữ liệu (Không dùng hàm get... nữa) ---
import { SAMPLE_FLASHCARDS_DB, SAMPLE_QUIZ_DB } from '../services/dataService';
// ---------------------------------------------------------------------------------
import { ChevronRight, ChevronLeft, RotateCw, CheckCircle, XCircle, ArrowLeft, Filter, BookOpen, Loader2, Award } from 'lucide-react';
import { Module, Flashcard, QuizQuestion, User } from '../types';

interface StudyProps {
  user: User;
  onUpdateProgress: (moduleId: string, progress: number) => void;
}

const BLOOM_COLORS: Record<string, string> = {
  'Remember': 'bg-gray-100 text-gray-600',
  'Understand': 'bg-blue-50 text-blue-600',
  'Apply': 'bg-green-50 text-green-600',
  'Analyze': 'bg-orange-50 text-orange-600',
  'Evaluate': 'bg-purple-50 text-purple-600',
  'Create': 'bg-red-50 text-red-600',
};

export const Study: React.FC<StudyProps> = ({ user, onUpdateProgress }) => {
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [mode, setMode] = useState<'overview' | 'flashcards' | 'quiz'>('overview');

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);

  const getUserModule = (m: Module) => ({
    ...m,
    progress: user.progress[m.id] || 0
  });

  // Fetch data when module activates
  useEffect(() => {
    if (activeModule) {
      const loadData = async () => {
        setLoading(true);
        try {
          console.log("🚀 Study.tsx: Đang lấy dữ liệu trực tiếp cho", activeModule.id);
          
          // --- LOGIC MỚI: Tự lọc dữ liệu từ biến nhập khẩu ---
          // Kiểm tra an toàn xem biến có tồn tại không
          const dbCards = (typeof SAMPLE_FLASHCARDS_DB !== 'undefined') ? SAMPLE_FLASHCARDS_DB : [];
          const dbQuiz = (typeof SAMPLE_QUIZ_DB !== 'undefined') ? SAMPLE_QUIZ_DB : [];

          const cards = dbCards.filter(item => item.moduleId === activeModule.id);
          const quiz = dbQuiz.filter(item => item.moduleId === activeModule.id);
          
          setFlashcards(cards);
          setQuizQuestions(quiz);
          // --------------------------------------------------
        } catch (error) {
          console.error("Failed to load module data:", error);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [activeModule]);

  // --- PHẦN GIAO DIỆN (GIỮ NGUYÊN) ---
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleOptionSelect = (optionId: string) => {
    if (showExplanation) return;
    setSelectedOption(optionId);
  };

  const handleCheckAnswer = () => {
    setShowExplanation(true);
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctOptionId) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      const finalScore = Math.round(((score + (selectedOption === quizQuestions[currentQuestionIndex].correctOptionId ? 1 : 0)) / quizQuestions.length) * 100);
      onUpdateProgress(activeModule!.id, finalScore);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (activeModule) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => { setActiveModule(null); setMode('overview'); }}
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Syllabus
        </button>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase mb-2 block">
              {activeModule.topic.replace('-', ' ')}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{activeModule.title}</h2>
            <p className="text-gray-600">{activeModule.description}</p>
            
            <div className="mt-4 bg-gray-100 rounded-full h-2 w-full max-w-md">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getUserModule(activeModule).progress}%` }}
              />
            </div>
            <div className="flex justify-end max-w-md mt-1">
              <span className="text-xs text-gray-500">{getUserModule(activeModule).progress}% Complete</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setMode('flashcards')}
              className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-2
                ${mode === 'flashcards' 
                  ? 'border-blue-600 bg-blue-50 text-blue-700' 
                  : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'}`}
            >
              <RotateCw className={`w-6 h-6 ${mode === 'flashcards' ? 'animate-spin-slow' : ''}`} />
              <span className="font-semibold">Flashcards</span>
            </button>
            <button
              onClick={() => setMode('quiz')}
              className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-2
                ${mode === 'quiz' 
                  ? 'border-green-600 bg-green-50 text-green-700' 
                  : 'border-gray-100 hover:border-green-200 hover:bg-gray-50'}`}
            >
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">Quiz</span>
            </button>
          </div>
        </div>

        {loading ? (
           <div className="flex justify-center p-12">
             <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
           </div>
        ) : (
          <>
            {mode === 'flashcards' && (
              <div className="max-w-2xl mx-auto perspective-1000">
                {flashcards.length > 0 ? (
                  <>
                    <div 
                      className={`relative h-80 w-full transition-all duration-500 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                      onClick={() => setIsFlipped(!isFlipped)}
                    >
                      <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col items-center justify-center text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium mb-4 ${BLOOM_COLORS[flashcards[currentCardIndex].taxonomy]}`}>
                          {flashcards[currentCardIndex].taxonomy}
                        </span>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {flashcards[currentCardIndex].front}
                        </h3>
                        <p className="mt-4 text-sm text-gray-400">Click to flip</p>
                      </div>

                      <div className="absolute inset-0 backface-hidden rotate-y-180 bg-blue-600 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center text-center text-white">
                        <p className="text-lg leading-relaxed">
                          {flashcards[currentCardIndex].back}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <button 
                        onClick={handlePrevCard}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <span className="text-sm font-medium text-gray-500">
                        Card {currentCardIndex + 1} of {flashcards.length}
                      </span>
                      <button 
                        onClick={handleNextCard}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  </>
                ) : (
                   <div className="text-center p-8 text-gray-500">
                     No flashcards available for this module yet.
                   </div>
                )}
              </div>
            )}

            {mode === 'quiz' && (
              <div className="max-w-2xl mx-auto">
                {quizQuestions.length > 0 ? (
                  !quizCompleted ? (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">
                          Question {currentQuestionIndex + 1}/{quizQuestions.length}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${BLOOM_COLORS[quizQuestions[currentQuestionIndex].taxonomy]}`}>
                          {quizQuestions[currentQuestionIndex].taxonomy}
                        </span>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">
                          {quizQuestions[currentQuestionIndex].question}
                        </h3>

                        <div className="space-y-3">
                          {quizQuestions[currentQuestionIndex].options?.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleOptionSelect(option)}
                              disabled={showExplanation}
                              className={`w-full p-4 rounded-lg border-2 text-left transition-all relative
                                ${selectedOption === option 
                                  ? showExplanation
                                    ? option === quizQuestions[currentQuestionIndex].correctOptionId
                                      ? 'border-green-500 bg-green-50'
                                      : 'border-red-500 bg-red-50'
                                    : 'border-blue-500 bg-blue-50'
                                  : 'border-gray-100 hover:border-blue-200'
                                }
                                ${showExplanation && option === quizQuestions[currentQuestionIndex].correctOptionId ? 'border-green-500 bg-green-50 ring-2 ring-green-200' : ''}
                              `}
                            >
                              <span className="block pr-8">{option}</span>
                              {showExplanation && option === quizQuestions[currentQuestionIndex].correctOptionId && (
                                <CheckCircle className="w-5 h-5 text-green-600 absolute right-4 top-1/2 -translate-y-1/2" />
                              )}
                              {showExplanation && selectedOption === option && option !== quizQuestions[currentQuestionIndex].correctOptionId && (
                                <XCircle className="w-5 h-5 text-red-600 absolute right-4 top-1/2 -translate-y-1/2" />
                              )}
                            </button>
                          ))}
                        </div>

                        {showExplanation && (
                          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 animate-in fade-in slide-in-from-top-2">
                            <p className="text-blue-800">
                              <span className="font-bold">Explanation: </span>
                              The correct answer is {quizQuestions[currentQuestionIndex].correctOptionId}.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                        {!showExplanation ? (
                          <button
                            onClick={handleCheckAnswer}
                            disabled={!selectedOption}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            Check Answer
                          </button>
                        ) : (
                          <button
                            onClick={handleNextQuestion}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center"
                          >
                            {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
                      <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Award className="w-10 h-10 text-yellow-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h3>
                      <p className="text-gray-600 mb-8">
                        You scored <span className="text-blue-600 font-bold text-xl">{score}/{quizQuestions.length}</span>
                      </p>
                      <button
                        onClick={resetQuiz}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  )
                ) : (
                  <div className="text-center p-8 text-gray-500">
                    No quiz questions available.
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  };


  
