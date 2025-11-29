import { useState } from 'react'
import './App.css'
import RepoInput from './components/RepoInput'
import ArticlePreview from './components/ArticlePreview'
import { generateArticle } from './utils/articleGenerator'

function App() {
  const [article, setArticle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async (repoUrl, apiKey, articleStyle = 'formal') => {
    console.log('記事スタイル:', articleStyle)
    setLoading(true)
    setError('')
    setArticle('')

    try {
      const generatedArticle = await generateArticle(repoUrl, apiKey, articleStyle)
      setArticle(generatedArticle)
    } catch (err) {
      setError(err.message || '記事の生成に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GitHub記事ジェネレーター
          </h1>
          <p className="text-lg text-gray-600">
            GitHubリポジトリのURLを入力するだけで、note用の魅力的な紹介記事を自動生成
          </p>
          <p className="text-sm text-gray-500 mt-2">
            MDファイルを自動で読み込み、誰でも読みやすい記事を作成します
          </p>
          <div className="mt-4 inline-block bg-green-50 px-4 py-2 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 font-semibold">
              ✅ 課金なし | GitHub PAT のみ使用（Publicリポジトリは不要）
            </p>
          </div>
        </header>

        {/* 入力フォーム */}
        <RepoInput onGenerate={handleGenerate} loading={loading} />

        {/* エラー表示 */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* ローディング */}
        {loading && (
          <div className="mt-8 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">記事を生成中...</p>
          </div>
        )}

        {/* 記事プレビュー */}
        {article && !loading && (
          <ArticlePreview article={article} />
        )}
      </div>
    </div>
  )
}

export default App
