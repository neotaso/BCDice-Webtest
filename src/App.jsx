import { useState, useRef, useEffect } from 'react'
import './App.css'
import { API_BASE_URL, SYSTEM_ID } from './config'

function App() {
  const [history, setHistory] = useState([])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  const hasFetched = useRef(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchHelpMessage = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/v2/game_system/${SYSTEM_ID}`)
        if (response.ok) {
          const data = await response.json()
          if (data.help_message) {
            setHistory(prev => [...prev, { text: data.help_message, sender: 'system' }])
          }
        }
      } catch (error) {
        console.error("Failed to fetch help message:", error)
      }
    }
    fetchHelpMessage()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [history])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const command = inputValue
    setInputValue('')

    // Add user message immediately
    setHistory(prev => [...prev, { text: command, sender: 'user' }])

    try {
      const params = new URLSearchParams()
      params.append('command', command)

      const response = await fetch(`${API_BASE_URL}/v2/game_system/${SYSTEM_ID}/roll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      })

      if (response.ok) {
        const data = await response.json()
        if (data.text) {
          setHistory(prev => [...prev, {
            text: data.text,
            sender: 'api',
            success: data.success,
            failure: data.failure,
            secret: data.secret
          }])
        } else {
          setHistory(prev => [...prev, { text: "", sender: 'system' }])
        }
      } else {
        setHistory(prev => [...prev, { text: "コマンドに誤りがあります。", sender: 'system' }])
      }
    } catch (error) {
      console.error("API Error:", error)
      setHistory(prev => [...prev, { text: "Error: Failed to connect to API", sender: 'system' }])
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className="app-container">
      <div className="chat-history">
        {history.map((msg, index) => (
          <div key={index} className="message-item" style={{
            color: msg.success ? 'green' : msg.failure ? 'red' : 'inherit',
            textAlign: 'left'
          }}>
            {msg.secret && <span>(シークレット) </span>}
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={handleSend}>
          送信
        </button>
      </div>
    </div>
  )
}

export default App
