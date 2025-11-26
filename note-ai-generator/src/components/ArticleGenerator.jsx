import { useState, useEffect } from 'react'
import { generateArticle } from '../utils/articleTemplate'

export default function ArticleGenerator({ repoData, onGenerated, onBack }) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    generate()
  }, [])

  const generate = async () => {
    setProgress(30)
    await new Promise(resolve => setTimeout(resolve, 1000))

    setProgress(60)
    await new Promise(resolve => setTimeout(resolve, 1000))

    setProgress(90)
    const article = generateArticle(repoData)

    setProgress(100)
    await new Promise(resolve => setTimeout(resolve, 500))

    onGenerated(article)
  }

  return (
    <div className="card max-w-3xl mx-auto text-center">
      <div className="text-6xl mb-4">✨</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        記事を生成中
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        あなたのスタイルで記事を書いています...
      </p>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-gradient-to-r from-red-500 to-pink-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-600">{progress}%</p>

      <div className="mt-8 space-y-3 text-left">
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-gray-700">✓ 個人的な導入部分を作成</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-gray-700">✓ 発見ストーリーを構成</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-gray-700">✓ 想定シナリオを追加</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-gray-700">✓ 感情的な締めくくりを作成</p>
        </div>
      </div>
    </div>
  )
}
