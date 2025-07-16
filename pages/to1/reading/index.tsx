import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ReadingPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/listening");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [router]);

  const handleAnswer = (questionNumber, choice) => {
    setAnswers({ ...answers, [questionNumber]: choice });
  };

  const renderTimer = () => {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const totalQuestions = 20;

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 p-4 border-r">
        <h2 className="text-lg font-semibold mb-2">Soal</h2>
        <table className="w-full table-fixed border-collapse">
          <tbody>
            {[0, 1, 2, 3, 4].map((row) => (
              <tr key={row}>
                {[1, 2, 3, 4].map((col) => {
                  const number = row * 4 + col;
                  if (number > totalQuestions) return <td key={col}></td>;
                  return (
                    <td key={col} className="p-1">
                      <button
                        className={`w-full p-2 text-sm rounded font-semibold ${
                          currentQuestion === number
                            ? "bg-blue-500 text-white"
                            : answers[number]
                            ? "bg-green-500 text-white"
                            : "bg-white border text-gray-700"
                        }`}
                        onClick={() => setCurrentQuestion(number)}
                      >
                        {number}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <div className="text-xl font-bold">읽기 (Reading)</div>
          <div className="text-md">Waktu Tersisa: {renderTimer()}</div>
        </div>

        {/* Question content */}
        <div className="p-6 space-y-4">
          <div className="text-md font-medium">Soal {currentQuestion}:</div>
          <p className="text-lg">
            텔레비전을 고장 없이 오래 쓰려면 어떻게 해야 합니까?
          </p>

          <div className="space-y-2">
            {["A", "B", "C", "D"].map((opt) => (
              <label
                key={opt}
                className="block border rounded p-2 hover:bg-blue-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  className="mr-2"
                  checked={answers[currentQuestion] === opt}
                  onChange={() => handleAnswer(currentQuestion, opt)}
                />
                {opt}. Jawaban {opt}
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 border-t flex justify-between">
          <button
            className="bg-gray-200 px-4 py-2 rounded"
            disabled={currentQuestion === 1}
            onClick={() => setCurrentQuestion((q) => q - 1)}
          >
            ◀ Sebelumnya
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={currentQuestion === totalQuestions}
            onClick={() => setCurrentQuestion((q) => q + 1)}
          >
            Berikutnya ▶
          </button>
        </div>
      </div>
    </div>
  );
                    }
                  
