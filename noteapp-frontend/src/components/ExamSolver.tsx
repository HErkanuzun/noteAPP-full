import React, { useState } from 'react';
import { Check, X, HelpCircle, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface ExamSolverProps {
  questions: Question[];
  isDark: boolean;
}

function ExamSolver({ questions, isDark }: ExamSolverProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  const requestHint = async () => {
    setShowHint(true);
    // AI hint implementation would go here
  };

  return (
    <div className={`max-w-3xl mx-auto p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl`}>
      {!showResults ? (
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm opacity-75">
                Soru {currentQuestion + 1} / {questions.length}
              </span>
              <button
                onClick={requestHint}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-100/10"
              >
                <HelpCircle size={20} />
                İpucu İste
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-4">
              {questions[currentQuestion].text}
            </h3>

            {showHint && (
              <div className="mb-4 p-4 rounded-lg bg-blue-100/10 text-blue-600">
                <p>AI tarafından oluşturulan ipucu burada görünecek...</p>
              </div>
            )}

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(questions[currentQuestion].id, index)}
                  className={`w-full p-4 text-left rounded-lg transition-all ${
                    answers[questions[currentQuestion].id] === index
                      ? 'bg-blue-600 text-white'
                      : `${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(q => Math.max(0, q - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              Önceki
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={() => setShowResults(true)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Sınavı Bitir
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(q => Math.min(questions.length - 1, q + 1))}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Sonraki
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6">Sınav Sonuçları</h2>
          <div className="mb-8">
            <div className="text-4xl font-bold text-center mb-2">
              %{calculateScore().toFixed(0)}
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-1000"
                style={{ width: `${calculateScore()}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className={`p-4 rounded-lg ${
                  answers[question.id] === question.correctAnswer
                    ? 'bg-green-100/10 border border-green-600'
                    : 'bg-red-100/10 border border-red-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {answers[question.id] === question.correctAnswer ? (
                    <Check className="text-green-600" />
                  ) : (
                    <X className="text-red-600" />
                  )}
                  <span className="font-medium">Soru {index + 1}</span>
                </div>
                <p className="mb-2">{question.text}</p>
                <p className="text-sm">
                  Doğru Cevap: {question.options[question.correctAnswer]}
                </p>
                {answers[question.id] !== question.correctAnswer && (
                  <p className="text-sm text-red-600">
                    Sizin Cevabınız: {question.options[answers[question.id]]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setShowResults(false);
              setCurrentQuestion(0);
              setAnswers({});
            }}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Tekrar Çöz
          </button>
        </div>
      )}
    </div>
  );
}

export default ExamSolver;