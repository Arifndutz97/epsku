// pages/to1/listening.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const TOTAL_QUESTIONS = 25;
const AUTO_NEXT_DELAY = 84; // tiap soal tampil selama 84 detik
const COUNTDOWN_PER_QUESTION = 94; // countdown per soal

export default function ListeningPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(COUNTDOWN_PER_QUESTION);

  // Timer countdown 94 detik
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [currentQuestion]);

  // Auto next tiap 84 detik
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentQuestion < TOTAL_QUESTIONS) {
        setCurrentQuestion((prev) => prev + 1);
        setTimer(COUNTDOWN_PER_QUESTION);
      } else {
        // Selesai semua soal
        router.push("/to1/result");
      }
    }, AUTO_NEXT_DELAY * 1000);

    return () => clearTimeout(timeout);
  }, [currentQuestion, router]);

  const handleAnswer = (choice: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: choice }));
  };

  const renderTimer = () => {
    const min = String(Math.floor(timer / 60)).padStart(2, "0");
    const sec = String(timer % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="flex flex-col h-screen font-sans">
      <div className="bg-red-600 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">듣기 (Listening)</div>
        <div className="text-md">Soal {currentQuestion} / {TOTAL_QUESTIONS}</div>
        <div className="text-md">Timer: {renderTimer()}</div>
      </div>

      <div className="p-6 space-y-4 flex-1">
        <p className="text-lg font-medium">Soal {currentQuestion} (Audio):</p>
        <audio controls autoPlay>
          <source src={`/audio/to1/q${currentQuestion}.mp3`} type="audio/mpeg" />
          Browser Anda tidak mendukung audio.
        </audio>

        <div className="space-y-2 mt-4">
          {["A", "B", "C", "D"].map((opt) => (
            <label
              key={opt}
              className="block border rounded p-2 hover:bg-blue-50 cursor-pointer"
            >
              <input
                type="radio"
                name={`q${currentQuestion}`}
                className="mr-2"
                checked={answers[currentQuestion] === opt}
                onChange={() => handleAnswer(opt)}
              />
              {opt}. Jawaban {opt}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
