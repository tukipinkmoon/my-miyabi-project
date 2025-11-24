import React, { useState, useRef } from 'react'

export default function PhotoUpload({ onPhotoSelect, onBack }) {
  const [preview, setPreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e) => {
    const file = e.target.files[0]
    handleFileSelect(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleNext = () => {
    if (preview) {
      onPhotoSelect(preview)
    }
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-elderly-xl font-bold text-gray-800 mb-6 text-center">
        写真を選んでください
      </h2>

      <div
        className={`border-4 border-dashed rounded-3xl p-12 text-center transition-all ${
          isDragging
            ? 'border-pink-500 bg-pink-50'
            : preview
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 bg-gray-50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {preview ? (
          <div>
            <img
              src={preview}
              alt="選択された写真"
              className="max-w-full max-h-96 mx-auto rounded-2xl shadow-lg"
            />
            <button
              onClick={() => {
                setPreview(null)
                fileInputRef.current.value = ''
              }}
              className="btn-secondary mt-6"
            >
              別の写真を選ぶ
            </button>
          </div>
        ) : (
          <div>
            <div className="text-8xl mb-6">📷</div>
            <p className="text-elderly text-gray-600 mb-6">
              ここに写真をドロップするか、
              <br />
              下のボタンをタップしてください
            </p>
            <button
              onClick={() => fileInputRef.current.click()}
              className="btn-primary"
            >
              写真を選ぶ
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
            />
          </div>
        )}
      </div>

      <div className="mt-6 bg-yellow-50 p-6 rounded-2xl">
        <p className="text-elderly text-gray-700">
          💡 ヒント: 顔がはっきり写っている写真がおすすめです
        </p>
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={onBack} className="btn-secondary flex-1">
          もどる
        </button>
        <button
          onClick={handleNext}
          disabled={!preview}
          className={`btn-primary flex-1 ${
            !preview ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          つぎへ
        </button>
      </div>
    </div>
  )
}
