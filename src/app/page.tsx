"use client";

import { useState, useEffect } from "react";

type Answer = "A" | "B" | "C" | "D" | "E" | null;

interface Question {
  id: number;
  questionText?: string;
  herAnswer: Answer;
  correctAnswer: Answer;
}

const TOTAL_QUESTIONS = 100;

// Question data with text and correct answers from the PDF
const QUESTION_DATA: Array<{ text?: string; answer: Answer }> = [
  {
    answer: "D",
  },
  {
    answer: "A",
  },
  {
    answer: "A",
  },
  {
    answer: "B",
  },
  {
    answer: "E",
  },
  {
    answer: "B",
  },
  {
    answer: "D",
  },
  {
    answer: "C",
  },
  {
    answer: "E",
  },
  {
    answer: "A",
  },
  {
    answer: "E",
  },
  {
    answer: "E",
  },
  {
    answer: "B",
  },
  {
    answer: "A",
  },
  {
    answer: "B",
  },
  {
    answer: "D",
  },
  {
    answer: "A",
  },
  {
    answer: "D",
  },
  {
    answer: "D",
  },
  {
    answer: "E",
  },
  {
    answer: "A",
  },
  {
    answer: "C",
  },
  {
    answer: "A",
  },
  {
    answer: "E",
  },
  {
    answer: "A",
  },
  {
    answer: "B",
  },
  {
    answer: "D",
  },
  {
    answer: "E",
  },
  {
    answer: "A",
  },
  {
    answer: "B",
  },
  {
    answer: "B",
  },
  {
    answer: "D",
  },
  {
    answer: "D",
  },
  {
    answer: "E",
  },
  {
    answer: "A",
  },
  {
    answer: "A",
  },
  {
    answer: "D",
  },
  {
    answer: "A",
  },
  {
    answer: "B",
  },
  {
    answer: "B",
  },
  {
    answer: "B",
  },
  {
    answer: "E",
  },
  {
    answer: "A",
  },
  {
    answer: "D",
  },
  {
    answer: "D",
  },
  {
    answer: "A",
  },
  {
    answer: "C",
  },
  {
    answer: "D",
  },
  {
    answer: "D",
  },
  {
    answer: "C",
  },
  {
    answer: "B",
  },
  {
    answer: "A",
  },
  {
    answer: "E",
  },
  {
    answer: "A",
  },
  {
    answer: "B",
  },
  {
    answer: "C",
  },
  {
    answer: "A",
  },
  {
    answer: "A",
  },
  {
    answer: "C",
  },
  {
    answer: "C",
  },
  {
    answer: "B",
  },
  {
    answer: "A",
  },
  {
    answer: "B",
  },
  {
    answer: "C",
  },
  {
    answer: "E",
  },
  {
    answer: "A",
  },
  {
    answer: "D",
  },
  {
    answer: "C",
  },
  {
    answer: "C",
  },
  {
    answer: "B",
  },
  {
    answer: "D",
  },
  {
    answer: "B",
  },
  {
    answer: "B",
  },
  {
    answer: "B",
  },
  {
    answer: "D",
  },
  {
    answer: "E",
  },
  {
    answer: "D",
  },
  {
    answer: "A",
  },
  {
    answer: "E",
  },
  {
    answer: "C",
  },
  {
    answer: "B",
  },
  {
    answer: "D",
  },
  {
    answer: "E",
  },
  {
    answer: "D",
  },
  {
    answer: "A",
  },
  {
    answer: "C",
  },
  {
    answer: "E",
  },
  {
    answer: "A",
  },
  {
    answer: "D",
  },
  {
    answer: "A",
  },
  {
    answer: "B",
  },
  {
    answer: "E",
  },
  {
    answer: "B",
  },
  {
    answer: "E",
  },
];

const CORRECT_ANSWERS: Answer[] = QUESTION_DATA.map((q) => q.answer);

const initializeQuestions = (): Question[] => {
  return Array.from({ length: TOTAL_QUESTIONS }, (_, i) => ({
    id: i + 1,
    questionText: QUESTION_DATA[i]?.text,
    herAnswer: null as Answer,
    correctAnswer: CORRECT_ANSWERS[i] as Answer,
  }));
};

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>(() => {
    // Initialize with 100 questions, pre-filled with correct answers
    // Try to load from localStorage first
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("exam-tracker-data");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Ensure all questions have correct answers set
          return parsed.map((q: Question, index: number) => ({
            ...q,
            questionText: QUESTION_DATA[index]?.text,
            correctAnswer: CORRECT_ANSWERS[index] as Answer,
          }));
        } catch (e) {
          console.error("Failed to load saved data:", e);
        }
      }
    }
    return initializeQuestions();
  });

  // Save to localStorage whenever questions change
  useEffect(() => {
    localStorage.setItem("exam-tracker-data", JSON.stringify(questions));
  }, [questions]);

  const updateQuestion = (
    id: number,
    field: "herAnswer" | "correctAnswer",
    value: Answer
  ) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const stats = {
    total: questions.length,
    answered: questions.filter((q) => q.herAnswer !== null).length,
    correct: questions.filter(
      (q) =>
        q.herAnswer !== null &&
        q.correctAnswer !== null &&
        q.herAnswer === q.correctAnswer
    ).length,
    incorrect: questions.filter(
      (q) =>
        q.herAnswer !== null &&
        q.correctAnswer !== null &&
        q.herAnswer !== q.correctAnswer
    ).length,
    pending: questions.filter(
      (q) => q.herAnswer !== null && q.correctAnswer === null
    ).length,
  };

  const percentage =
    stats.answered > 0 && stats.correct + stats.incorrect > 0
      ? ((stats.correct / (stats.correct + stats.incorrect)) * 100).toFixed(1)
      : "0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Exam Grade Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your practice exam progress - 100 Questions
          </p>
        </div>

        {/* Statistics Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Questions
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.total}
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Correct
              </div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.correct}
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Incorrect
              </div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {stats.incorrect}
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Pending Review
              </div>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {stats.pending}
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Score
              </div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {percentage}%
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Progress: {stats.answered} / {stats.total} answered
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(stats.answered / stats.total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Questions Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {questions.map((question) => {
              const isCorrect =
                question.herAnswer !== null &&
                question.correctAnswer !== null &&
                question.herAnswer === question.correctAnswer;
              const isIncorrect =
                question.herAnswer !== null &&
                question.correctAnswer !== null &&
                question.herAnswer !== question.correctAnswer;

              return (
                <div
                  key={question.id}
                  className={`border-2 rounded-lg p-4 transition-all ${
                    isCorrect
                      ? "border-green-500 bg-green-50 dark:bg-green-900/10"
                      : isIncorrect
                      ? "border-red-500 bg-red-50 dark:bg-red-900/10"
                      : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50"
                  }`}
                >
                  <div className="mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="font-semibold text-gray-900 dark:text-white mb-2">
                      Question {question.id}
                    </div>
                    {question.questionText && (
                      <div className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed italic">
                        {question.questionText}
                      </div>
                    )}
                  </div>

                  {/* Her Answer */}
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Her Answer
                    </label>
                    <div className="flex gap-1">
                      {(["A", "B", "C", "D", "E"] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() =>
                            updateQuestion(
                              question.id,
                              "herAnswer",
                              question.herAnswer === option ? null : option
                            )
                          }
                          className={`flex-1 py-2 px-2 text-sm font-medium rounded transition-colors ${
                            question.herAnswer === option
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Correct Answer */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Correct Answer
                    </label>
                    <div className="flex gap-1">
                      {(["A", "B", "C", "D", "E"] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() =>
                            updateQuestion(
                              question.id,
                              "correctAnswer",
                              question.correctAnswer === option ? null : option
                            )
                          }
                          className={`flex-1 py-2 px-2 text-sm font-medium rounded transition-colors ${
                            question.correctAnswer === option
                              ? "bg-green-600 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Status Indicator */}
                  {isCorrect && (
                    <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
                      ✓ Correct
                    </div>
                  )}
                  {isIncorrect && (
                    <div className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium">
                      ✗ Incorrect
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Clear Data Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to clear all data? This will reset all her answers but keep the correct answers."
                )
              ) {
                setQuestions(initializeQuestions());
                localStorage.removeItem("exam-tracker-data");
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
}
