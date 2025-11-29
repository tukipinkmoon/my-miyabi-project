import { useState } from 'react'

export default function UrlInput({ onSubmit }) {
  const [urls, setUrls] = useState([])
  const [currentUrl, setCurrentUrl] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  const validateGitHubUrl = (url) => {
    const pattern = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+/
    return pattern.test(url)
  }

  const handleAddUrl = () => {
    setError('')

    if (!currentUrl.trim()) {
      setError('URLを入力してください')
      return
    }

    if (!validateGitHubUrl(currentUrl)) {
      setError('正しいGitHubリポジトリのURLを入力してください')
      return
    }

    // 重複チェック
    if (urls.includes(currentUrl.trim())) {
      setError('このURLは既に追加されています')
      return
    }

    setUrls([...urls, currentUrl.trim()])
    setCurrentUrl('')
  }

  const handleRemoveUrl = (index) => {
    setUrls(urls.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (urls.length === 0) {
      setError('少なくとも1つのURLを追加してください')
      return
    }

    onSubmit({ urls, token: token.trim() })
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setCurrentUrl(text)
      setError('')
    } catch (err) {
      console.error('Failed to read clipboard:', err)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAddUrl()
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
          記事にしたいAIアプリのGitHubリポジトリURLを追加してください
        </p>
        <p className="text-sm text-gray-500 mt-2">
          複数のリポジトリをまとめて1つの記事にできます
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
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="https://github.com/username/repository"
              className="input-field flex-1"
            />
            <button
              type="button"
              onClick={handlePaste}
              className="btn-secondary px-4"
            >
              貼り付け
            </button>
            <button
              type="button"
              onClick={handleAddUrl}
              className="btn-primary px-6"
            >
              追加
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        {/* URLリスト */}
        {urls.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3">追加されたリポジトリ ({urls.length})</h3>
            <div className="space-y-2">
              {urls.map((url, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-300"
                >
                  <span className="text-sm text-gray-700 truncate flex-1">{url}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveUrl(index)}
                    className="ml-2 text-red-600 hover:text-red-800 font-bold px-3 py-1 rounded"
                  >
                    削除
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            GitHub Personal Access Token（プライベートリポジトリ用・任意）
          </label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className="input-field w-full"
          />
          <p className="mt-1 text-xs text-gray-500">
            プライベートリポジトリの場合のみ必要です
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>💡 例:</strong><br />
            https://github.com/example/ai-app<br />
            https://github.com/user/awesome-tool
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200">
          <p className="text-sm font-bold text-gray-800 mb-2">🔐 Personal Access Tokenの取得方法</p>
          <ol className="text-xs text-gray-700 space-y-1 list-decimal list-inside">
            <li>GitHubの Settings → Developer settings → Personal access tokens → Tokens (classic)</li>
            <li>「Generate new token (classic)」をクリック</li>
            <li>「repo」にチェックを入れる</li>
            <li>トークンを生成してコピー</li>
          </ol>
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
