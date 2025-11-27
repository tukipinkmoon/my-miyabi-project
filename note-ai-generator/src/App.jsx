import { useState } from 'react'
import './App.css'
import UrlInput from './components/UrlInput'
import RepoAnalyzer from './components/RepoAnalyzer'
import ArticleGenerator from './components/ArticleGenerator'
import ArticlePreview from './components/ArticlePreview'

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [repoUrl, setRepoUrl] = useState('')
  const [githubToken, setGithubToken] = useState('')
  const [repoData, setRepoData] = useState(null)
  const [article, setArticle] = useState('')

  const handleUrlSubmit = ({ url, token }) => {
    setRepoUrl(url)
    setGithubToken(token)
    setCurrentStep(1)
  }

  const handleRepoAnalyzed = (data) => {
    setRepoData(data)
    setCurrentStep(2)
  }

  const handleArticleGenerated = (generatedArticle) => {
    setArticle(generatedArticle)
    setCurrentStep(3)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setRepoUrl('')
    setRepoData(null)
    setArticle('')
  }

  const handleRegenerate = () => {
    // 詳細記事を生成
    import('./utils/articleTemplate').then(({ generateDetailedArticle }) => {
      const detailedArticle = generateDetailedArticle(repoData)
      setArticle(detailedArticle)
    })
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
            note AI記事ジェネレーター
          </h1>
          <p className="text-lg text-gray-600">
            GitHubリポジトリから、note記事の下書きを自動生成
          </p>
        </header>

        {/* プログレスバー */}
        {currentStep > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2">
              {['URL入力', 'リポジトリ解析', '記事生成', '完成'].map((label, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep > index
                        ? 'bg-green-500 text-white'
                        : currentStep === index
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {currentStep > index ? '✓' : index + 1}
                  </div>
                  {index < 3 && (
                    <div
                      className={`w-16 h-1 ${
                        currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-16 mt-2">
              {['URL入力', 'リポジトリ解析', '記事生成', '完成'].map((label) => (
                <span key={label} className="text-sm text-gray-600">
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* メインコンテンツ */}
        <main>
          {currentStep === 0 && (
            <UrlInput onSubmit={handleUrlSubmit} />
          )}

          {currentStep === 1 && (
            <RepoAnalyzer
              url={repoUrl}
              token={githubToken}
              onAnalyzed={handleRepoAnalyzed}
              onBack={() => setCurrentStep(0)}
            />
          )}

          {currentStep === 2 && (
            <ArticleGenerator
              repoData={repoData}
              onGenerated={handleArticleGenerated}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <ArticlePreview
              article={article}
              repoData={repoData}
              onReset={handleReset}
              onRegenerate={handleRegenerate}
            />
          )}
        </main>

        {/* フッター */}
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>note AI記事ジェネレーター - 誠実で魅力的な記事を</p>
        </footer>
      </div>
    </div>
  )
}

export default App
