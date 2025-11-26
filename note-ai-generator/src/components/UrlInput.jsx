import { useState } from 'react'

export default function UrlInput({ onSubmit }) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const validateGitHubUrl = (url) => {
    const pattern = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+/
    return pattern.test(url)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!url.trim()) {
      setError('URLを入力してください')
      return
    }

    if (!validateGitHubUrl(url)) {
      setError('正しいGitHubリポジトリのURLを入力してください')
      return
    }

    onSubmit(url.trim())
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
      setError('')
    } catch (err) {
      console.error('Failed to read clipboard:', err)
    }
  }

  return (
    <div className="card max-w-3xl mx-auto fade-in">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">📝</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          GitHubリポジトリのURLを入力
        </h2>
        <p className="text-lg text-gray-600">
          記事にしたいAIアプリのGitHubリポジトリURLを貼り付けてください
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            GitHubリポジトリURL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="input-field flex-1"
            />
            <button
              type="button"
              onClick={handlePaste}
              className="btn-secondary"
            >
              貼り付け
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>💡 例:</strong><br />
            https://github.com/example/ai-app<br />
            https://github.com/user/awesome-tool
          </p>
        </div>

        <button
          type="submit"
          className="btn-primary w-full text-lg"
        >
          リポジトリを解析
        </button>
      </form>

      <div className="mt-8 bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
        <h3 className="font-bold text-gray-800 mb-3">✨ このツールでできること</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✓ GitHubリポジトリを自動解析</li>
          <li>✓ README・設計書を読み取り</li>
          <li>✓ あなたのスタイルで記事の下書きを生成</li>
          <li>✓ 誠実で魅力的な紹介記事を作成</li>
        </ul>
      </div>
    </div>
  )
}
