import { useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi! I’m Pinky AI 💗 How can I help you today?',
    },
  ])

  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const getBotReply = (message) => {
    const text = message.toLowerCase()

    if (text.includes('hello') || text.includes('hi')) {
      return 'Hello! 💗 It’s nice to chat with you! How can I help?'
    }

    if (text.includes('plan my day') || text.includes('schedule')) {
      return 'Of course! 📅 Here’s a simple plan: prioritize your important tasks, take short breaks, and leave some time for yourself. 💕'
    }

    if (text.includes('idea')) {
      return 'Here’s an idea! 💡 Try making a simple to-do list and choose your top 3 priorities for today.'
    }

    if (text.includes('write') || text.includes('email')) {
      return 'Absolutely! ✍️ Tell me what you want to write, and I can help make it clear and professional.'
    }

    if (text.includes('thank')) {
      return 'You’re very welcome! 💕 I’m always happy to help.'
    }

    return 'That’s interesting! 💗 Tell me a little more, and I’ll do my best to help you.'
  }

  const sendMessage = () => {
    if (!input.trim() || isTyping) return

    const userMessage = input

    setMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: userMessage,
      },
    ])

    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: getBotReply(userMessage),
        },
      ])
    }, 1500)
  }

  const clearChat = () => {
    setMessages([
      {
        sender: 'bot',
        text: 'Chat cleared! 💗 How can I help you?',
      },
    ])

    setIsTyping(false)
  }

  return (
    <div className="app">
      <div className="chat-container">

        <header className="chat-header">
          <div className="bot-avatar">🤖</div>

          <div>
            <h1>Pinky AI</h1>
            <p>Your friendly AI assistant ✨</p>
          </div>

          <span className="online">●</span>

          <button
            className="clear-button"
            onClick={clearChat}
          >
            🧹
          </button>
        </header>

        <main className="chat-box">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-row ${message.sender}`}
            >
              {message.sender === 'bot' && (
                <div className="small-avatar">
                  🤖
                </div>
              )}

              <div className="message">
                {message.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message-row bot">
              <div className="small-avatar">
                🤖
              </div>

              <div className="message">
                💗 Pinky is typing...
              </div>
            </div>
          )}
        </main>

        <div className="suggestions">
          <button onClick={() => setInput('Help me plan my day')}>
            💕 Plan my day
          </button>

          <button onClick={() => setInput('Give me an idea')}>
            💡 Give me an idea
          </button>

          <button onClick={() => setInput('Help me write something')}>
            ✍️ Help me write
          </button>
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage()
              }
            }}
          />

          <button
            className="send-button"
            onClick={sendMessage}
          >
            ➤
          </button>
        </div>

        <footer>
          Powered by AI • Pinky Assistant 💗
        </footer>

      </div>
    </div>
  )
}

export default App
