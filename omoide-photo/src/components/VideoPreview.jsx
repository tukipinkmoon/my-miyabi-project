import React from 'react'

export default function VideoPreview({ videoUrl, onReset }) {
  const handleDownload = () => {
    // TODO: 実際のダウンロード処理
    alert('動画を保存しました！')
  }

  const handleShare = () => {
    // TODO: 実際の共有処理
    if (navigator.share) {
      navigator.share({
        title: 'おもいで写真',
        text: '思い出の写真が動き出しました！',
        url: window.location.href
      }).catch(console.error)
    } else {
      alert('この機能はスマートフォンで使えます')
    }
  }

  return (
    <div className="card max-w-2xl mx-auto text-center">
      <div className="mb-6">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-elderly-xl font-bold text-gray-800 mb-4">
          完成しました！
        </h2>
        <p className="text-elderly text-gray-600">
          思い出の写真が動き出しました
        </p>
      </div>

      <div className="bg-black rounded-3xl overflow-hidden shadow-2xl mb-8">
        {/* TODO: 実際の動画プレーヤー */}
        <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-8xl mb-4">▶️</div>
            <p className="text-elderly">
              ここに動画が表示されます
            </p>
            <p className="text-sm mt-2 text-gray-400">
              (プロトタイプ版では表示されません)
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleDownload}
          className="btn-primary w-full max-w-md"
        >
          動画を保存する
        </button>

        <button
          onClick={handleShare}
          className="btn-secondary w-full max-w-md"
        >
          家族に共有する
        </button>

        <button
          onClick={onReset}
          className="btn-secondary w-full max-w-md"
        >
          もう一度作る
        </button>
      </div>

      <div className="mt-8 bg-green-50 p-6 rounded-2xl text-left">
        <p className="text-elderly font-bold text-green-800 mb-3">
          できること:
        </p>
        <ul className="text-elderly text-gray-700 space-y-2">
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>何度でも見返せます</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>スマホに保存できます</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>家族や友達に送れます</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>別の写真でも作れます</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
