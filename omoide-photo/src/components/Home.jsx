import React from 'react'

export default function Home({ onStart }) {
  return (
    <div className="card max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="text-8xl mb-6">📸</div>
        <h2 className="text-elderly-xl font-bold text-gray-800 mb-4">
          ようこそ！
        </h2>
        <p className="text-elderly text-gray-600 leading-relaxed mb-6">
          思い出の写真を選ぶだけで、
          <br />
          その中の人が動いて、話しかけてくれます。
        </p>
        <p className="text-elderly text-gray-600 leading-relaxed">
          白黒写真でも大丈夫。
          <br />
          お父さん、お母さん、お孫さん...
          <br />
          大切な人の声を聞くことができます。
        </p>
      </div>

      <button
        onClick={onStart}
        className="btn-primary w-full max-w-md"
      >
        はじめる
      </button>

      <div className="mt-8 text-left bg-blue-50 p-6 rounded-2xl">
        <h3 className="text-elderly-lg font-bold text-blue-800 mb-4">
          使い方
        </h3>
        <ol className="text-elderly text-gray-700 space-y-3">
          <li className="flex items-start">
            <span className="text-blue-500 font-bold mr-3">①</span>
            <span>アルバムから写真を選ぶ</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 font-bold mr-3">②</span>
            <span>メッセージを選ぶ（または自分で書く）</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 font-bold mr-3">③</span>
            <span>動画ができあがるのを待つ</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 font-bold mr-3">④</span>
            <span>写真が動き出して、話しかけてくれる！</span>
          </li>
        </ol>
      </div>
    </div>
  )
}
