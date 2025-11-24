import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import PhotoUpload from './components/PhotoUpload'
import MessageEditor from './components/MessageEditor'
import VideoGenerator from './components/VideoGenerator'
import VideoPreview from './components/VideoPreview'

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [detectedFaces, setDetectedFaces] = useState([])
  const [generatedMessages, setGeneratedMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState('')
  const [videoUrl, setVideoUrl] = useState(null)

  const steps = [
    { id: 0, name: 'ホーム', label: '開始' },
    { id: 1, name: '写真選択', label: '写真' },
    { id: 2, name: 'メッセージ', label: 'メッセージ' },
    { id: 3, name: '動画作成', label: '作成' },
    { id: 4, name: '完成', label: '完成' },
  ]

  const handlePhotoSelect = (photo) => {
    setSelectedPhoto(photo)
    // TODO: 顔検出処理
    setCurrentStep(2)
  }

  const handleMessageGenerate = (messages) => {
    setGeneratedMessages(messages)
  }

  const handleMessageSelect = (message) => {
    setSelectedMessage(message)
    setCurrentStep(3)
  }

  const handleVideoComplete = (url) => {
    setVideoUrl(url)
    setCurrentStep(4)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setSelectedPhoto(null)
    setDetectedFaces([])
    setGeneratedMessages([])
    setSelectedMessage('')
    setVideoUrl(null)
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-500 mb-4">
            おもいで写真
          </h1>
          <p className="text-elderly text-gray-600">
            思い出の写真が、動いて話しかけてくれる
          </p>
        </header>

        {/* ステップインジケーター */}
        {currentStep > 0 && (
          <div className="step-indicator mb-8">
            {steps.slice(1).map((step, index) => (
              <div key={step.id} className="step">
                <div
                  className={`step-circle ${
                    currentStep === step.id
                      ? 'active'
                      : currentStep > step.id
                      ? 'completed'
                      : 'pending'
                  }`}
                >
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                {index < steps.length - 2 && (
                  <div
                    className={`step-line ${
                      currentStep > step.id ? 'completed' : ''
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* メインコンテンツ */}
        <main>
          {currentStep === 0 && <Home onStart={() => setCurrentStep(1)} />}

          {currentStep === 1 && (
            <PhotoUpload
              onPhotoSelect={handlePhotoSelect}
              onBack={() => setCurrentStep(0)}
            />
          )}

          {currentStep === 2 && (
            <MessageEditor
              photo={selectedPhoto}
              onMessageSelect={handleMessageSelect}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <VideoGenerator
              photo={selectedPhoto}
              message={selectedMessage}
              onComplete={handleVideoComplete}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <VideoPreview
              videoUrl={videoUrl}
              onReset={handleReset}
            />
          )}
        </main>

        {/* フッター */}
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>おもいで写真 - 大切な思い出を、いつまでも</p>
        </footer>
      </div>
    </div>
  )
}

export default App
