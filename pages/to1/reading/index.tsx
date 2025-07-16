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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700">📘 Reading Tryout EPS-TOPIK</h1>
          <div className="text-lg text-red-600 font-semibold">
            ⏰ Waktu: {formatTime(timeLeft)}
          </div>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-10 gap-2">
            {dummyQuestions.map((q) => {
              const isAnswered = answers[q.id] !== undefined;
              const isActive = currentQuestion === q.id;
              const baseClass =
                "w-full aspect-square flex items-center justify-center rounded-lg text-sm font-semibold border";
              const answeredClass = isAnswered ? "bg-green-500 text-white" : "bg-gray-100 text-gray-800";
              const activeClass = isActive ? "ring-2 ring-blue-600 ring-offset-2" : "";
              return (
                <button
                  key={q.id}
                  className={`${baseClass} ${answeredClass} ${activeClass}`}
                  onClick={() => setCurrentQuestion(q.id)}
                >
                  {q.id}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6 p-6 border rounded-lg shadow-inner bg-blue-50">
          <h2 className="text-lg font-semibold mb-4">
            📝 Soal {currentQuestion}: {dummyQuestions[currentQuestion - 1].question}
          </h2>
          <ul className="space-y-3">
            {dummyQuestions[currentQuestion - 1].options.map((opt, i) => (
              <li key={i}>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`q-${currentQuestion}`}
                    value={opt}
                    checked={answers[currentQuestion] === opt}
                    onChange={() => handleSelect(opt)}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <span className="text-gray-800">{opt}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-2 rounded-lg shadow-md"
            onClick={handleSubmit}
          >
            🚀 Lanjut ke Listening
          </button>
        </div>
      </div>
    </div>
  );
}


🚀 Sudah saya buatkan versi yang lebih rapi dan menarik untuk tampilan halaman Reading EPS-TOPIK kamu:

✅ Layout bersih dengan latar putih dan shadow
✅ Header ada ikon 📘 dan timer ⏰ yang menonjol
✅ Soal aktif diberi efek ring
✅ Soal terjawab tampil hijau
✅ Kotak soal tampak modern dengan padding dan warna biru lembut
✅ Tombol “Lanjut ke Listening” diberi animasi hover biar makin mantap!

Kalau Mas Arif udah cocok, kita bisa lanjut:

👉 Bikin halaman /to1/listening
👉 Atau bikin halaman /to1/summary
👉 Atau langsung deploy!

Tinggal pilih, aku yang gas! ⚡

            
