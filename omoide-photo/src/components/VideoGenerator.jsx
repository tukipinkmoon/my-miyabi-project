import React, { useState, useEffect } from 'react'

export default function VideoGenerator({ photo, message, onComplete, onBack }) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('準備中')
  const [isGenerating, setIsGenerating] = useState(false)

  const steps = [
    { label: '準備中', duration: 1000 },
    { label: '音声を作成中', duration: 3000 },
    { label: '顔を動かしています', duration: 5000 },
    { label: '動画を仕上げ中', duration: 2000 },
    { label: '完成！', duration: 500 }
  ]

  const startGeneration = () => {
    setIsGenerating(true)
    let currentProgress = 0
    let stepIndex = 0

    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0)

    const interval = setInterval(() => {
      currentProgress += 100 / (totalDuration / 100)

      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(interval)
        setTimeout(() => {
          // TODO: 実際のAPI呼び出し
          // デモ版では写真URLをそのまま渡す
          onComplete(photo)
        }, 500)
      }

      setProgress(Math.min(currentProgress, 100))

      // ステップの更新
      const elapsed = (currentProgress / 100) * totalDuration
      let accumulatedTime = 0
      for (let i = 0; i < steps.length; i++) {
        accumulatedTime += steps[i].duration
        if (elapsed < accumulatedTime) {
          setCurrentStep(steps[i].label)
          stepIndex = i
          break
        }
      }
    }, 100)
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-elderly-xl font-bold text-gray-800 mb-6 text-center">
        動画を作成します
      </h2>

      <div className="mb-8">
        <img
          src={photo}
          alt="選択された写真"
          className="max-w-xs mx-auto rounded-2xl shadow-lg"
        />
      </div>

      <div className="bg-blue-50 p-6 rounded-2xl mb-6">
        <p className="text-elderly font-bold text-gray-800 mb-2">
          メッセージ:
        </p>
        <p className="text-elderly text-gray-700 leading-relaxed">
          「{message}」
        </p>
      </div>

      {!isGenerating ? (
        <div className="text-center">
          <p className="text-elderly text-gray-600 mb-8">
            このメッセージで動画を作成します。
            <br />
            少し時間がかかりますが、お待ちください。
          </p>
          <button
            onClick={startGeneration}
            className="btn-primary w-full max-w-md"
          >
            動画を作る
          </button>
          <button
            onClick={onBack}
            className="btn-secondary w-full max-w-md mt-4"
          >
            メッセージを変更する
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="mb-6">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-elderly-lg font-bold text-pink-600 mb-2">
              {currentStep}
            </p>
            <p className="text-elderly text-gray-600">
              あと少しで完成します...
            </p>
          </div>

          {/* プログレスバー */}
          <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
            <div
              className="bg-gradient-to-r from-pink-400 to-pink-600 h-6 rounded-full transition-all duration-300 flex items-center justify-center"
              style={{ width: `${progress}%` }}
            >
              <span className="text-white font-bold text-sm">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 p-6 rounded-2xl">
            <p className="text-elderly text-gray-700">
              💡 動画の作成には1〜2分かかります。
              <br />
              このまましばらくお待ちください。
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
