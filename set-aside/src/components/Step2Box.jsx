import { useState } from 'react'

export default function Step2Box({ writtenText, onComplete, onBack }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isBoxClosed, setIsBoxClosed] = useState(false)

  // ランダムに絵文字を選ぶ
  const boxEmojis = ['📦', '🎁', '🗃️', '🧺', '💝', '🌸', '🎀', '🪺']
  const [boxEmoji] = useState(() => boxEmojis[Math.floor(Math.random() * boxEmojis.length)])

  const handlePutInBox = () => {
    setIsAnimating(true)

    // アニメーション: 文章が箱に入る
    setTimeout(() => {
      setIsBoxClosed(true)
    }, 1500)

    // 完了
    setTimeout(() => {
      setIsAnimating(false)
    }, 2500)
  }

  const handleNext = () => {
    onComplete()
  }

  return (
    <div className="card max-w-3xl mx-auto text-center animate-fade-in">
      <div className="mb-8">
        {!isBoxClosed ? (
          <div className="text-7xl mb-4 animate-float">{boxEmoji}</div>
        ) : (
          <div className="text-7xl mb-4 animate-bounce">✨</div>
        )}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {!isBoxClosed ? `この${boxEmoji === '📦' ? 'ダンボール' : boxEmoji === '🎁' ? 'プレゼント箱' : boxEmoji === '🗃️' ? 'ファイルボックス' : boxEmoji === '🧺' ? 'バスケット' : boxEmoji === '🎀' ? 'リボン箱' : boxEmoji === '🪺' ? '鳥の巣' : '箱'}に入れておこう` : '置いておいたよ'}
        </h2>
        <p className="text-lg text-gray-600">
          {!isBoxClosed
            ? '敢えて、今はここに置いておくね。捨てるわけじゃないよ。'
            : '大丈夫。いつでも戻ってこられるから。'}
        </p>
      </div>

      {/* 書いた内容のプレビュー */}
      {!isBoxClosed && (
        <div className={`bg-soft-blue-50 p-6 rounded-2xl mb-8 border-2 border-soft-blue-200 transition-all duration-1000 ${
          isAnimating ? 'opacity-0 transform scale-90' : 'opacity-100'
        }`}>
          <p className="text-gray-700 whitespace-pre-wrap text-left">
            {writtenText.length > 200 ? writtenText.substring(0, 200) + '...' : writtenText}
          </p>
        </div>
      )}

      {/* 置いておくビジュアル */}
      <div className="relative h-64 mb-8">
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
          isBoxClosed ? 'scale-110' : 'scale-100'
        }`}>
          <div className={`w-48 h-48 border-4 rounded-full flex items-center justify-center text-8xl transition-all duration-500 ${
            isBoxClosed
              ? 'bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 border-pink-300 shadow-2xl'
              : 'bg-gradient-to-br from-gray-50 to-pink-50 border-pink-200 shadow-lg'
          }`}>
            {isBoxClosed ? '💝' : boxEmoji}
          </div>
        </div>
      </div>

      {!isBoxClosed ? (
        <div>
          <div className="bg-gradient-to-r from-yellow-50 to-pink-50 p-6 rounded-2xl mb-8 border-2 border-yellow-100">
            <h3 className="font-bold text-gray-800 mb-3">💡 置いておくって、どういうこと？</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              「隣に置く」というイメージを持つだけで、
              気持ちと少し距離ができるよ。
              忘れるんじゃなくて、今は置いておくだけ。
              そうすることで、心に余白が生まれるんだ。
            </p>
          </div>

          <div className="flex justify-between">
            <button onClick={onBack} className="btn-secondary">
              戻る
            </button>
            <button
              onClick={handlePutInBox}
              className="btn-primary px-10"
              disabled={isAnimating}
            >
              {isAnimating ? '置いています...' : '隣に置く'}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl mb-8 border-2 border-green-200">
            <p className="text-gray-700 text-lg font-semibold mb-3">
              ✓ 隣に置いておいたよ
            </p>
            <p className="text-gray-600 text-sm">
              いつでも戻ってこられるから安心してね。
              今は、少し距離を置いてみよう。
            </p>
          </div>

          <button onClick={handleNext} className="btn-primary px-10">
            次へ進む
          </button>
        </div>
      )}
    </div>
  )
}
