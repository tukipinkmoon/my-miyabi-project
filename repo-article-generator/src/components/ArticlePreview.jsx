import { useState } from 'react'

export default function ArticlePreview({ article }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(article)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      alert('コピーに失敗しました')
    }
  }

  return (
    <div className="mt-8">
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">生成された記事</h2>
          <button
            onClick={handleCopy}
            className="btn-secondary flex items-center gap-2"
          >
            {copied ? (
              <>
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                コピーしました
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                コピー
              </>
            )}
          </button>
        </div>

        {/* 記事本文 */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
            {article}
          </pre>
        </div>

        {/* ヒント */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 この記事はそのままnoteやブログに投稿できます。コピーボタンでクリップボードにコピーしてご利用ください。
          </p>
        </div>
      </div>
    </div>
  )
}
