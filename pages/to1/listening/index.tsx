// File: pages/to1/listening/index.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const TOTAL_QUESTIONS = 20;
const TIME_PER_QUESTION = 75; // 75 seconds per question

const dummyListening = Array.from({ length: TOTAL_QUESTIONS }, (_, i) => ({
  id: i + 21,
  question: `Audio untuk soal nomor ${i + 21} diputar di sini. Apa jawabannya?`,
  options: ["A. Pilihan A", "B. Pilihan B", "C. Pilihan C", "D. Pilihan D"],
}));

export default function ListeningPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          autoNext();
          return TIME_PER_QUESTION;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const autoNext = () => {
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(TIME_PER_QUESTION);
    } else {
      handleSubmit();
    }
  };

  const handleSelect = (choice: string) => {
    setAnswers({ ...answers, [dummyListening[currentIndex].id]: choice });
  };

  const handleSubmit = () => {
    console.log("Jawaban Listening:", answers);
    localStorage.setItem("listeningAnswers", JSON.stringify(answers));

    const reading = JSON.parse(localStorage.getItem("readingAnswers") || "{}");
    const allAnswers = { ...reading, ...answers };
    console.log("SEMUA JAWABAN:", allAnswers);
    alert("Tryout selesai! Lihat hasil Anda di konsol.");
    router.push("/to1/summary");
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const current = dummyListening[currentIndex];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Listening Tryout EPS-TOPIK</h1>
        <div className="text-red-500 font-bold">Sisa Waktu: {formatTime(timeLeft)}</div>
      </div>

      <div className="mb-4 border p-4 rounded shadow">
        <p className="font-medium">{current.question}</p>
        <ul className="mt-2 space-y-2">
          {current.options.map((opt, i) => (
            <li key={i}>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name={`q-${current.id}`}
                  value={opt}
                  checked={answers[current.id] === opt}
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
        className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        onClick={autoNext}
        disabled={currentIndex >= TOTAL_QUESTIONS - 1}
      >
        {currentIndex === TOTAL_QUESTIONS - 1 ? "Selesai" : "Soal Selanjutnya"}
      </button>
    </div>
  );
}

