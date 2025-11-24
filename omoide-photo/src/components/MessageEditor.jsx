import React, { useState, useEffect } from 'react'

export default function MessageEditor({ photo, onMessageSelect, onBack }) {
  const [messages, setMessages] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [customMessage, setCustomMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: AI APIを使ってメッセージを生成
    // 現在はダミーデータ
    setTimeout(() => {
      setMessages([
        {
          id: 1,
          text: 'いつも見守っているよ',
          type: '短く優しい'
        },
        {
          id: 2,
          text: '毎日元気に過ごしてね。あなたの笑顔が一番の宝物だよ',
          type: '励まし'
        },
        {
          id: 3,
          text: 'あの頃の思い出は今でも心の中に。これからも一緒だからね',
          type: '思い出'
        }
      ])
      setIsLoading(false)
    }, 2000)
  }, [photo])

  const handleSelect = (index, message) => {
    setSelectedIndex(index)
    setCustomMessage(message)
  }

  const handleNext = () => {
    if (customMessage.trim()) {
      onMessageSelect(customMessage)
    }
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-elderly-xl font-bold text-gray-800 mb-6 text-center">
        メッセージを選んでください
      </h2>

      <div className="mb-8">
        <img
          src={photo}
          alt="選択された写真"
          className="max-w-xs mx-auto rounded-2xl shadow-lg"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-elderly text-gray-600">
            AIがメッセージを考えています...
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-elderly text-gray-700 font-bold mb-4">
            おすすめのメッセージ:
          </p>

          {messages.map((message, index) => (
            <button
              key={message.id}
              onClick={() => handleSelect(index, message.text)}
              className={`w-full p-6 rounded-2xl text-left transition-all ${
                selectedIndex === index
                  ? 'bg-pink-100 border-4 border-pink-500 shadow-lg'
                  : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm font-bold text-pink-600">
                  {message.type}
                </span>
                {selectedIndex === index && (
                  <span className="text-2xl">✓</span>
                )}
              </div>
              <p className="text-elderly text-gray-800">
                {message.text}
              </p>
            </button>
          ))}

          <div className="mt-8">
            <label className="block text-elderly font-bold text-gray-700 mb-3">
              自分で書く:
            </label>
            <textarea
              value={customMessage}
              onChange={(e) => {
                setCustomMessage(e.target.value)
                setSelectedIndex(null)
              }}
              placeholder="例: おかえり、いつも元気でね"
              className="w-full p-4 text-elderly border-2 border-gray-300 rounded-2xl focus:border-pink-500 focus:outline-none resize-none"
              rows="4"
            />
            <p className="text-sm text-gray-500 mt-2">
              現在 {customMessage.length} 文字
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-4 mt-8">
        <button onClick={onBack} className="btn-secondary flex-1">
          もどる
        </button>
        <button
          onClick={handleNext}
          disabled={!customMessage.trim()}
          className={`btn-primary flex-1 ${
            !customMessage.trim() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          つぎへ
        </button>
      </div>
    </div>
  )
}
