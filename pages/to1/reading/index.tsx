// File: pages/to1/reading/index.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const TOTAL_QUESTIONS = 20;
const TIME_LIMIT = 25 * 60; // 25 minutes in seconds

const dummyQuestions = Array.from({ length: TOTAL_QUESTIONS }, (_, i) => ({
  id: i + 1,
  question: `Ini adalah soal nomor ${i + 1}. Apa jawaban yang benar?`,
  options: ["A. Pilihan A", "B. Pilihan B", "C. Pilihan C", "D. Pilihan D"],
}));

export default function ReadingPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Waktu habis! Berpindah ke Listening...");
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelect = (choice: string) => {
    setAnswers({ ...answers, [currentQuestion]: choice });
  };

  const handleSubmit = () => {
    console.log("Jawaban Reading dikirim:", answers);
    // Simpan jawaban ke localStorage sementara sebelum lanjut ke Listening
    localStorage.setItem("readingAnswers", JSON.stringify(answers));
    router.push("/to1/listening");
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Reading Tryout EPS-TOPIK</h1>
        <div className="text-red-500 font-bold">Sisa Waktu: {formatTime(timeLeft)}</div>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-10 gap-2">
          {dummyQuestions.map((q) => (
            <button
              key={q.id}
              className={`p-2 border rounded ${
                currentQuestion === q.id ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => setCurrentQuestion(q.id)}
            >
              {q.id}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 border p-4 rounded shadow">
        <p className="font-medium">{dummyQuestions[currentQuestion - 1].question}</p>
        <ul className="mt-2 space-y-2">
          {dummyQuestions[currentQuestion - 1].options.map((opt, i) => (
            <li key={i}>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name={`q-${currentQuestion}`}
                  value={opt}
                  checked={answers[currentQuestion] === opt}
                  onChange={() => handleSelect(opt)}
                  className="mr-2"
                />
                {opt}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded shadow"
        onClick={handleSubmit}
      >
        Lanjut ke Listening
      </button>
    </div>
  );
}
