import { useState } from 'react'
import './App.css'
import Step1Write from './components/Step1Write'
import Step2Box from './components/Step2Box'
import Step3AI from './components/Step3AI'
import Step4Space from './components/Step4Space'
import Step5New from './components/Step5New'

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [writtenText, setWrittenText] = useState('')
  const [brainSpace, setBrainSpace] = useState(100)

  const handleStep1Complete = (text) => {
    setWrittenText(text)
    setCurrentStep(1)
  }

  const handleStep2Complete = () => {
    // 箱に入れた後、脳の空き容量が少し増える
    setBrainSpace(prev => Math.min(prev + 20, 100))
    setCurrentStep(2)
  }

  const handleStep3Complete = () => {
    // AIの視点を得た後、さらに空き容量が増える
    setBrainSpace(prev => Math.min(prev + 30, 100))
    setCurrentStep(3)
  }

  const handleStep4Complete = () => {
    setCurrentStep(4)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setWrittenText('')
    setBrainSpace(100)
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-soft-blue-400 bg-clip-text text-transparent mb-4">
            おいとく
          </h1>
          <p className="text-xl text-gray-600">
            敢えて隣に置いておく。心に余白を作ろう。
          </p>
        </header>

        {/* プログレスインジケーター */}
        {currentStep > 0 && (
          <div className="mb-12 animate-slide-up">
            <div className="flex items-center justify-center space-x-2">
              {['書き出す', '隣に置く', '本当の気持ち', '余白を見る', 'これから'].map((label, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                      currentStep > index
                        ? 'bg-green-400 text-white shadow-lg'
                        : currentStep === index
                        ? 'bg-soft-blue-400 text-white shadow-lg animate-float'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep > index ? '✓' : index + 1}
                  </div>
                  {index < 4 && (
                    <div
                      className={`w-12 h-1 transition-all duration-500 ${
                        currentStep > index + 1 ? 'bg-green-400' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-8 mt-3">
              {['書き出す', '隣に置く', '本当の気持ち', '余白を見る', 'これから'].map((label) => (
                <span key={label} className="text-xs text-gray-500 w-16 text-center">
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* メインコンテンツ */}
        <main>
          {currentStep === 0 && (
            <Step1Write onComplete={handleStep1Complete} />
          )}

          {currentStep === 1 && (
            <Step2Box
              writtenText={writtenText}
              onComplete={handleStep2Complete}
              onBack={() => setCurrentStep(0)}
            />
          )}

          {currentStep === 2 && (
            <Step3AI
              writtenText={writtenText}
              onComplete={handleStep3Complete}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <Step4Space
              brainSpace={brainSpace}
              onComplete={handleStep4Complete}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <Step5New
              onReset={handleReset}
            />
          )}
        </main>

        {/* フッター */}
        <footer className="text-center mt-16 text-gray-400 text-sm">
          <p>おいとく - 毎日のちょっとした心の支え</p>
        </footer>
      </div>
    </div>
  )
}

export default App
