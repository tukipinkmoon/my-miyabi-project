import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function ArticlePreview({ article, repoData, onReset, onRegenerate }) {
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(article)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([article], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${repoData.name}-article.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDetailedGenerate = async () => {
    setGenerating(true)
    // 少し待機してUIを更新
    await new Promise(resolve => setTimeout(resolve, 500))
    onRegenerate()
    setGenerating(false)
  }

  return (
    <div className="max-w-5xl mx-auto fade-in">
      <div className="card mb-6">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            記事が完成しました！
          </h2>
          <p className="text-gray-600">
            プレビューを確認して、コピーまたはダウンロードしてください
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleDetailedGenerate}
            className="btn-primary bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
            disabled={generating}
          >
            {generating ? '⏳ 生成中...' : '✨ もっと詳しく書く'}
          </button>
          <button onClick={handleCopy} className="btn-primary">
            {copied ? '✓ コピーしました！' : '📋 記事をコピー'}
          </button>
          <button onClick={handleDownload} className="btn-secondary">
            💾 ダウンロード (.md)
          </button>
          <button onClick={onReset} className="btn-secondary">
            🔄 新しい記事を作る
          </button>
        </div>
      </div>

      {/* プレビュー */}
      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">プレビュー</h3>
          <span className="text-sm text-gray-500">
            {article.length}文字
          </span>
        </div>

        <div className="article-preview prose max-w-none">
          <ReactMarkdown>{article}</ReactMarkdown>
        </div>
      </div>

      {/* Markdown表示 */}
      <div className="card mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Markdownソース
        </h3>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          <code>{article}</code>
        </pre>
      </div>

      <div className="mt-6 bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
        <h3 className="font-bold text-gray-800 mb-3">✨ もっと詳しく書く</h3>
        <p className="text-sm text-gray-700 mb-3">
          上の「もっと詳しく書く」ボタンを押すと、READMEをさらに深く分析して、5000文字以上の充実した記事を生成します。
        </p>
        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
          <li>各機能の詳しい説明と具体例</li>
          <li>実際の使用シーン（朝・仕事中・移動中など）</li>
          <li>メリットの詳細</li>
          <li>おすすめの人の詳細</li>
          <li>必要なものの情報</li>
        </ul>
      </div>

      <div className="mt-6 bg-green-50 p-6 rounded-xl border-2 border-green-200">
        <h3 className="font-bold text-gray-800 mb-3">💡 使い方</h3>
        <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
          <li>「記事をコピー」ボタンでクリップボードにコピー</li>
          <li>noteの投稿画面を開く</li>
          <li>貼り付けて、必要に応じて編集</li>
          <li>公開！</li>
        </ol>
      </div>
    </div>
  )
}
