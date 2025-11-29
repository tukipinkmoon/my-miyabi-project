import { useState } from 'react'

export default function RepoInput({ onGenerate, loading }) {
  const [repoUrl, setRepoUrl] = useState('')
  const [githubToken, setGithubToken] = useState('')
  const [showToken, setShowToken] = useState(false)

  const handleSubmit = (e, articleStyle) => {
    e.preventDefault()

    if (!repoUrl.trim()) {
      alert('GitHubリポジトリのURLを入力してください')
      return
    }

    // GitHub Tokenは任意（Publicリポジトリなら不要）
    onGenerate(repoUrl, githubToken.trim(), articleStyle)
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* リポジトリURL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            GitHubリポジトリURL
          </label>
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/username/repository"
            className="input-field"
            disabled={loading}
          />
          <p className="mt-2 text-sm text-gray-500">
            例: https://github.com/facebook/react
          </p>
        </div>

        {/* GitHub Personal Access Token */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            GitHub Personal Access Token（任意）
          </label>
          <div className="relative">
            <input
              type={showToken ? 'text' : 'password'}
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="input-field pr-24"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowToken(!showToken)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {showToken ? '隠す' : '表示'}
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Publicリポジトリの場合は不要です
          </p>
          <div className="mt-2 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="text-xs text-gray-700">
              <strong>📝 取得方法：</strong><br />
              Settings → Developer settings → Personal access tokens → Tokens (classic)<br />
              <strong>権限：</strong>repo にチェックを入れて作成
            </p>
          </div>
        </div>

        {/* 記事スタイル選択 */}
        <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
          <p className="text-sm font-bold text-gray-800 mb-3">📝 記事のスタイルを選択</p>
          <div className="space-y-3">
            <button
              type="button"
              disabled={loading}
              onClick={(e) => handleSubmit(e, 'formal')}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🌟 誰にでも通用する正式な記事
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={(e) => handleSubmit(e, 'personal')}
              className="w-full px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              💝 私が書くnoteの記事
            </button>
          </div>
          <div className="mt-3 text-xs text-gray-600 space-y-1">
            <p><strong>🌟 正式な記事：</strong>第三者視点で客観的に紹介。製品レビュー風。</p>
            <p><strong>💝 私の記事：</strong>個人的な発見ストーリー。「私が見つけた」感じで。</p>
          </div>
        </div>
      </form>
    </div>
  )
}
