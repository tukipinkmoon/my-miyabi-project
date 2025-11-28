import { useState, useEffect } from 'react'

export default function Step4Space({ brainSpace, onComplete, onBack }) {
  const [displaySpace, setDisplaySpace] = useState(0)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    // 数字のアニメーション
    let current = 0
    const target = brainSpace
    const increment = target / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
        setTimeout(() => setShowMessage(true), 500)
      }
      setDisplaySpace(Math.round(current))
    }, 30)

    return () => clearInterval(timer)
  }, [brainSpace])

  const getSpaceColor = () => {
    if (displaySpace >= 70) return 'from-green-400 to-green-500'
    if (displaySpace >= 40) return 'from-yellow-400 to-yellow-500'
    return 'from-red-400 to-red-500'
  }

  const getSpaceMessage = () => {
    if (displaySpace >= 70) {
      return {
        emoji: '✨',
        title: '心が軽くなったね',
        message: '心にたくさんの余白ができたよ。\n\n新しいことを、ゆっくり受け入れていこう。'
      }
    }
    if (displaySpace >= 40) {
      return {
        emoji: '🌸',
        title: '少しずつ、軽くなっているよ',
        message: '心に余裕が出てきたね。\n\n焦らなくていい。ゆっくり、前を向いていこう。'
      }
    }
    return {
      emoji: '🌱',
      title: 'ゆっくりでいいよ',
      message: 'まだ少し重いかもしれないね。\n\nでも大丈夫。焦らなくていいよ。\n\nあなたのペースで、ゆっくり進んでいこう。'
    }
  }

  const message = getSpaceMessage()

  return (
    <div className="card max-w-3xl mx-auto text-center animate-fade-in">
      <div className="mb-8">
        <div className="text-7xl mb-4 animate-float">💝</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          できた余白を見てみよう
        </h2>
        <p className="text-lg text-gray-600">
          少しずつ、心に余白ができてきたよ
        </p>
      </div>

      {/* 脳の容量メーター */}
      <div className="mb-12">
        <div className="relative">
          {/* 背景の脳のイラスト */}
          <div className="text-9xl mb-6 opacity-20">🧠</div>

          {/* 容量表示 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-7xl font-bold bg-gradient-to-r ${getSpaceColor()} bg-clip-text text-transparent`}>
                {displaySpace}%
              </div>
              <div className="text-gray-500 text-sm mt-2">空き容量</div>
            </div>
          </div>
        </div>

        {/* プログレスバー */}
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4 overflow-hidden">
          <div
            className={`h-6 rounded-full bg-gradient-to-r ${getSpaceColor()} transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
            style={{ width: `${displaySpace}%` }}
          >
            {displaySpace > 20 && (
              <span className="text-white text-xs font-bold">
                {displaySpace}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* メッセージ */}
      {showMessage && (
        <div className="bg-gradient-to-br from-soft-blue-50 to-green-50 p-8 rounded-3xl mb-8 border-2 border-soft-blue-200 animate-fade-in">
          <div className="text-6xl mb-4">{message.emoji}</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            {message.title}
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            {message.message}
          </p>
        </div>
      )}

      <div className="bg-gradient-to-r from-yellow-50 via-pink-50 to-blue-50 p-6 rounded-2xl mb-8 border-2 border-yellow-100">
        <h3 className="font-bold text-gray-800 mb-3">💡 余白ができると、いいことがあるよ</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          心に余白ができると、新しいことを考えたり、
          楽しいことを受け入れる余裕が生まれるんだ。
          「敢えて置いておく」ことで、この余白を作ることができるよ。
        </p>
      </div>

      {showMessage && (
        <div className="flex justify-between">
          <button onClick={onBack} className="btn-secondary">
            戻る
          </button>
          <button onClick={onComplete} className="btn-primary px-10">
            前を向く
          </button>
        </div>
      )}
    </div>
  )
}
