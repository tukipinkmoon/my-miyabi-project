import { useState } from 'react'

export default function Step5New({ onReset }) {
  const [newThings, setNewThings] = useState([])
  const [currentInput, setCurrentInput] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const handleAdd = () => {
    if (currentInput.trim()) {
      setNewThings([...newThings, currentInput.trim()])
      setCurrentInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      handleAdd()
    }
  }

  const handleComplete = () => {
    setIsComplete(true)
  }

  const handleRemove = (index) => {
    setNewThings(newThings.filter((_, i) => i !== index))
  }

  const suggestions = [
    '新しい趣味を始める',
    '誰かに会いに行く',
    '行ったことのない場所へ',
    '新しい本を読む',
    '運動を始める',
    '新しいスキルを学ぶ',
    '誰かに感謝を伝える',
    '部屋の模様替え',
  ]

  if (isComplete) {
    return (
      <div className="card max-w-3xl mx-auto text-center animate-fade-in">
        <div className="text-8xl mb-6 animate-bounce">✨</div>
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          ここまで、来れたね
        </h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          敢えて隣に置いておくことで、
          <br />
          心に余白ができたよ。
        </p>

        {newThings.length > 0 && (
          <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-8 rounded-3xl mb-8 border-2 border-pink-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              🌸 これから、やってみたいこと
            </h3>
            <ul className="space-y-3">
              {newThings.map((thing, index) => (
                <li key={index} className="flex items-center justify-center">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <span className="text-gray-800 text-lg">{thing}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 p-8 rounded-3xl mb-8 border-2 border-yellow-200">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">💡 忘れないでね</h3>
          <div className="text-gray-700 text-left space-y-3">
            <p>
              🌸 無理しなくていいよ。自分のペースで。
            </p>
            <p>
              🌱 小さな一歩で十分。焦らなくて大丈夫。
            </p>
            <p>
              💝 辛くなったら、いつでもここに戻ってきてね。
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button onClick={onReset} className="btn-primary px-10">
            最初から始める
          </button>
        </div>

        <div className="mt-8 text-gray-500 text-sm">
          <p>あなたのこれからが、素敵なものになりますように。</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="text-7xl mb-4 animate-float">🌸</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          これから、やってみたいこと
        </h2>
        <p className="text-lg text-gray-600">
          心に余白ができたから、新しいことを考えてみよう。
        </p>
      </div>

      {/* 入力フォーム */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-gray-700 mb-3">
          やってみたいこと、いくつでも書いてみてね
        </label>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="例：新しい趣味を始める"
            className="flex-1 p-4 rounded-2xl border-2 border-gray-200 focus:border-soft-blue-400 focus:ring-2 focus:ring-soft-blue-200 transition-all"
          />
          <button
            onClick={handleAdd}
            className="btn-primary"
            disabled={!currentInput.trim()}
          >
            追加
          </button>
        </div>

        {/* リスト */}
        {newThings.length > 0 && (
          <div className="space-y-2 mb-6">
            {newThings.map((thing, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-green-50 p-4 rounded-2xl border-2 border-green-200 animate-fade-in"
              >
                <div className="flex items-center">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <span className="text-gray-800">{thing}</span>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 提案 */}
      <div className="bg-gradient-to-r from-yellow-50 to-pink-50 p-6 rounded-2xl mb-8 border-2 border-yellow-100">
        <h3 className="font-bold text-gray-800 mb-3">💡 こんなのはどう？</h3>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                if (!newThings.includes(suggestion)) {
                  setNewThings([...newThings, suggestion])
                }
              }}
              className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-soft-blue-100 hover:text-soft-blue-700 transition-all border border-gray-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-6 rounded-2xl mb-8 border-2 border-blue-100">
        <h3 className="font-bold text-gray-800 mb-3">💡 新しいことを考えると</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          新しいことに目を向けると、
          自然と過去のことが気にならなくなっていくよ。
          これからのことを考えることで、心の余白がもっと広がっていくんだ。
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleComplete}
          className="btn-primary px-12 py-4 text-lg"
        >
          完了
        </button>
      </div>
    </div>
  )
}
