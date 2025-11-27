import { useState, useEffect } from 'react'
import axios from 'axios'

export default function RepoAnalyzer({ url, token, onAnalyzed, onBack }) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('リポジトリ情報を取得中...')
  const [error, setError] = useState(null)

  useEffect(() => {
    analyzeRepo()
  }, [])

  const analyzeRepo = async () => {
    try {
      // GitHubのURLからowner/repoを抽出
      const match = url.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/)
      if (!match) {
        throw new Error('URLの解析に失敗しました')
      }

      const [, owner, repo] = match
      const cleanRepo = repo.replace(/\.git$/, '')

      // プログレス更新
      setProgress(25)
      setStatus('リポジトリ情報を取得中...')

      // GitHub API: リポジトリ情報
      const headers = token ? {
        Authorization: `Bearer ${token}`
      } : {}

      const repoResponse = await axios.get(
        `https://api.github.com/repos/${owner}/${cleanRepo}`,
        { headers }
      )

      setProgress(50)
      setStatus('READMEを読み込み中...')

      // GitHub API: README取得
      let readmeContent = ''
      try {
        const readmeHeaders = {
          Accept: 'application/vnd.github.raw',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
        const readmeResponse = await axios.get(
          `https://api.github.com/repos/${owner}/${cleanRepo}/readme`,
          { headers: readmeHeaders }
        )
        readmeContent = readmeResponse.data
      } catch (e) {
        console.log('README not found')
      }

      setProgress(75)
      setStatus('解析完了...')

      // データ構造化
      const repoData = {
        name: repoResponse.data.name,
        fullName: repoResponse.data.full_name,
        description: repoResponse.data.description || '',
        stars: repoResponse.data.stargazers_count,
        language: repoResponse.data.language,
        topics: repoResponse.data.topics || [],
        url: repoResponse.data.html_url,
        readme: readmeContent,
        owner: {
          login: repoResponse.data.owner.login,
          avatar: repoResponse.data.owner.avatar_url
        }
      }

      setProgress(100)
      setStatus('完了！')

      setTimeout(() => {
        onAnalyzed(repoData)
      }, 500)

    } catch (err) {
      setError(err.response?.status === 404
        ? 'リポジトリが見つかりませんでした'
        : 'エラーが発生しました: ' + err.message)
      setLoading(false)
    }
  }

  if (error) {
    return (
      <div className="card max-w-3xl mx-auto text-center">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          エラーが発生しました
        </h2>
        <p className="text-lg text-red-600 mb-6">{error}</p>
        <button onClick={onBack} className="btn-primary">
          戻る
        </button>
      </div>
    )
  }

  return (
    <div className="card max-w-3xl mx-auto text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        リポジトリを解析中
      </h2>
      <p className="text-lg text-gray-600 mb-8">{status}</p>

      {/* プログレスバー */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-gradient-to-r from-red-500 to-pink-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-600">{progress}%</p>

      <div className="mt-8 bg-blue-50 p-4 rounded-xl">
        <p className="text-sm text-gray-700">
          GitHub APIを使ってリポジトリ情報を取得しています...
        </p>
      </div>
    </div>
  )
}
