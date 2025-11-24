import React, { useState, useEffect } from 'react'

export default function VideoPreview({ videoUrl, photo, message, onReset }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  // ページ読み込み時に自動再生
  useEffect(() => {
    // 少し遅らせて自動再生
    const timer = setTimeout(() => {
      handlePlay()
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handlePlay = () => {
    setIsPlaying(true)
    setShowMessage(false)

    // 1秒後にメッセージ表示
    setTimeout(() => {
      setShowMessage(true)
    }, 1000)

    // 5秒後に自動停止
    setTimeout(() => {
      setIsPlaying(false)
    }, 5000)
  }

  const handleDownload = () => {
    alert('動画を保存しました！\n\n（デモ版のため、実際の保存機能は次のバージョンで実装されます）')
  }

  const handleShare = () => {
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

      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl overflow-hidden shadow-2xl mb-8 p-8">
        {/* デモアニメーション */}
        <div className="relative">
          <div className={`transition-all duration-500 ${isPlaying ? 'animate-subtle-bounce' : ''}`}>
            {photo ? (
              <img
                src={photo}
                alt="思い出の写真"
                className={`max-w-full max-h-96 mx-auto rounded-2xl shadow-lg transition-all duration-300 ${
                  isPlaying ? 'scale-105 shadow-2xl' : ''
                }`}
              />
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                <span className="text-4xl">📸</span>
              </div>
            )}
          </div>

          {/* メッセージ吹き出し */}
          {showMessage && (
            <div className="mt-6 animate-fade-in">
              <div className="bg-white rounded-3xl shadow-xl p-6 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                <p className="text-elderly-lg text-gray-800 font-medium">
                  💬 {message || 'いつも見守っているよ'}
                </p>
              </div>
            </div>
          )}

          {/* 再生ボタン */}
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="mt-6 bg-pink-500 text-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:bg-pink-600 hover:scale-110 transition-all mx-auto"
            >
              <span className="text-4xl">▶️</span>
            </button>
          )}

          {/* 再生中表示 */}
          {isPlaying && (
            <div className="mt-4 text-pink-600 font-bold text-elderly animate-pulse">
              再生中...
            </div>
          )}
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-2xl">
          <p className="text-sm text-gray-600">
            💡 これはデモ版です。実際のバージョンでは、写真の顔が動いて、音声でメッセージを話します。
          </p>
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
