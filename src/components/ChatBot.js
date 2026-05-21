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

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await response.json();

      setReply(data.reply);

    } catch (error) {

      setReply("Error sending message");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className={`chatbot ${isOpen ? "open" : "closed"}`}>

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