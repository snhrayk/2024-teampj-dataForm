"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // パスワードチェック（仮の例）
    if (password === process.env.NEXT_PUBLIC_PASSWORD) {
      // ログイン成功時に/dataFormページに遷移
      router.push("/dataForm");
    } else {
      alert("パスワードが間違っています");
    }
  };

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-semibold">ログイン画面</h1>
      <form className="flex flex-col gap-8" onSubmit={handleLogin}>
        <div className="flex items-center gap-2">
          <label htmlFor="password" className="text-base font-medium">
            パスワード
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-base p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-2 rounded-lg text-white font-bold bg-[#755D52] hover:bg-[#EB476D]"
        >
          ログイン
        </button>
      </form>
    </main>
  );
}
