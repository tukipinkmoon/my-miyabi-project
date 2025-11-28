import { useState, useEffect } from 'react'
import { getRandomAdvisor } from '../utils/advisors'
import { generateAdviceMessage } from '../utils/adviceGenerator'

export default function Step3AI({ writtenText, onComplete, onBack }) {
  const [aiMessage, setAiMessage] = useState('')
  const [advisor, setAdvisor] = useState(null)
  const [isGenerating, setIsGenerating] = useState(true)

  useEffect(() => {
    // ランダムにアドバイザーを選ぶ
    const selectedAdvisor = getRandomAdvisor()
    setAdvisor(selectedAdvisor)

    // メッセージを生成
    generateAIMessage(selectedAdvisor)
  }, [])

  const generateAIMessage = (selectedAdvisor) => {
    setTimeout(() => {
      const message = generateAdviceMessage(writtenText, selectedAdvisor)
      setAiMessage(message)
      setIsGenerating(false)
    }, 2000)
  }

  const handleAccept = () => {
    onComplete()
  }

  if (isGenerating) {
    return (
      <div className="card max-w-3xl mx-auto text-center animate-fade-in">
        <div className="text-7xl mb-6 animate-float">💭</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          誰かを呼んでるよ...
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          あなたにぴったりの人が、アドバイスしに来てくれるよ。
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="card max-w-3xl mx-auto animate-fade-in">
      {/* アドバイザー紹介 */}
      <div className="text-center mb-8">
        <div className="text-8xl mb-4 animate-bounce">{advisor.emoji}</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {advisor.name}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          があなたにアドバイスするよ
        </p>
      </div>

      {/* メッセージ */}
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-8 rounded-3xl mb-8 border-2 border-pink-200 shadow-inner">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-lg">
            {aiMessage}
          </p>
        </div>
      </div>

      {/* ヒント */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl mb-8 border-2 border-blue-100">
        <p className="text-gray-700 text-sm leading-relaxed text-center">
          毎回、違う優しい声が、あなたに寄り添ってくれます。
        </p>
      </div>

      {/* ボタン */}
      <div className="flex justify-between">
        <button onClick={onBack} className="btn-secondary">
          戻る
        </button>
        <button onClick={handleAccept} className="btn-primary px-10">
          次へ進む
        </button>
      </div>
    </div>
  )
}
