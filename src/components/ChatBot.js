import { useState, useEffect, useRef } from "react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
    });

    }, [messages]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const updatedMessages = [
        ...messages,
        {
        role: "user",
        content: message,
        },
    ];

    setMessages(updatedMessages);

    setLoading(true);

    try {

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await response.json();

      const assistantMessage = {
        role: "assistant",
        content: data.reply,
        };

        setMessages([
        ...updatedMessages,
        assistantMessage,
        ]);

        setMessage("");

    } catch (error) {

      setReply("Error sending message");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className={`chatbot ${isOpen ? "open" : "closed"}`}>

        {isOpen && (
            <button
                className="clear-chat"
                onClick={() => setMessages([])}
            >
                New Chat
            </button>
        )}
        
      {/* Header */}
      <div
        className="chatbot-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2>Chat With Us</h2>

        <span>
          {isOpen ? "−" : "+"}
        </span>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="chatbot-body">

          <div className="chat-history">

            {messages.map((msg, index) => (

                <div
                key={index}
                className={`chat-message ${msg.role}`}
                >
                {msg.content}
                </div>

            ))}

            {loading && (
                <div className="chat-message assistant">
                    Thinking...
                </div>
            )}
            
            <div ref={messagesEndRef} />

          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything..."
          />

          <button onClick={sendMessage}>
            Send
          </button>

        </div>
      )}

    </div>
  );
}



/*
import { useState } from "react";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!message) return;

    setLoading(true);

    try {

      const res = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message,
        }),
      });

      const data = await res.json();

      setReply(data.reply);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  return (
    
        <div className="chatbot">

        <h2>Chat With Us</h2>

        <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything..."
        />

        <button onClick={sendMessage}>
            Send
        </button>

        {loading && <p>Thinking...</p>}

        {reply && (
            <div className="reply">
            {reply}
            </div>
        )}

        </div>
    
  );
}
*/