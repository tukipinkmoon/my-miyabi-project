import { useState } from 'react'

export default function Step1Write({ onComplete }) {
  const [text, setText] = useState('')
  const [isWriting, setIsWriting] = useState(false)

  const handleStart = () => {
    setIsWriting(true)
  }

  const handleComplete = () => {
    if (text.trim().length < 5) {
      alert('もう少しだけ、あなたの気持ちを書いてみてね。')
      return
    }
    onComplete(text)
  }

  if (!isWriting) {
    return (
      <div className="card max-w-2xl mx-auto text-center animate-fade-in">
        <div className="text-7xl mb-6 animate-float">💭</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          今、心にあること
        </h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          敢えて置いておきたいこと、ありますか？
          <br />
          誰にも見せません。あなただけの場所です。
          <br />
          そのまま、書き出してみましょう。
        </p>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl mb-8 border-2 border-pink-100">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">✨ 書き出すと、いいことがあるよ</h3>
          <ul className="space-y-3 text-gray-700 text-left">
            <li className="flex items-start">
              <span className="text-pink-400 mr-2 font-bold">•</span>
              <span>頭の中がスッキリする</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-400 mr-2 font-bold">•</span>
              <span>自分の気持ちを少し離れた所から見られる</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-400 mr-2 font-bold">•</span>
              <span>心が軽くなる</span>
            </li>
          </ul>
        </div>

        <button onClick={handleStart} className="btn-primary text-lg px-10 py-4">
          書き始める
        </button>
      </div>
    )
  }

  return (
    <div className="card max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">✍️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          そのまま、書いてみてね
        </h2>
        <p className="text-gray-600">
          誰も読まないから、安心して。
        </p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="例えば...

• あの人のこと
• あのときのこと
• 気になっていること
• モヤモヤしていること

どんなことでも大丈夫。"
        className="input-area min-h-[300px] text-lg mb-6"
        autoFocus
      />

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="text-gray-500">{text.length} 文字</span>
            {text.trim().length < 5 && (
              <span className="ml-2 text-pink-500">
                （あと {5 - text.trim().length} 文字書いてね）
              </span>
            )}
          </div>
          <button
            onClick={handleComplete}
            className={`btn-primary px-8 ${text.trim().length < 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={text.trim().length < 5}
          >
            次へ進む
          </button>
        </div>
        {text.trim().length < 5 && (
          <p className="text-xs text-pink-500 text-right">
            💡 5文字以上書くと、次に進めるよ
          </p>
        )}
      </div>

      <div className="mt-6 bg-gradient-to-r from-yellow-50 to-pink-50 p-4 rounded-xl border-2 border-yellow-100">
        <p className="text-sm text-gray-700">
          💡 そのまま書くだけで、頭の中が整理されていくよ。
          綺麗な文章じゃなくて大丈夫。
        </p>
      </div>
    </div>
  )
}
