import React, { useState } from 'react';
import { Send, Search } from 'lucide-react';
import Profile from './Profile'; 
import donateimage3 from '../assets/donateimage3.png'
const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

  const conversations = [
    { id: 1, name: 'John Doe', lastMessage: 'Last message from the conversation...', time: '2 hours ago' },
    { id: 2, name: 'Jane Smith', lastMessage: 'Is this item available?', time: '1 hour ago' },
    { id: 3, name: 'Mike Johnson', lastMessage: 'Hey, how are you?', time: '30 minutes ago' },
  ];

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && selectedConversation) {
      const newMessage = {
        sender: 'You',
        content: message,
        timestamp: new Date().toLocaleTimeString(),
        conversationId: selectedConversation.id,
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');
    }
  };

  const getMessagesForSelectedConversation = () => {
    if (!selectedConversation) return [];
    return messages.filter((msg) => msg.conversationId === selectedConversation.id);
  };

  return (
    < >
      <div className="d-flex justify-content-center align-items-center  position-relative chat-page vh-100 "
       style={{backgroundColor:'#7AC6D2'}}>
        <div className="container-fluid row  border shadow-lg rounded bg-white">
          {/* Sidebar */}
          <div
            className="col-md-4 d-flex flex-column border-end"

          >
            <div className="p-3 d-flex justify-content-start">
              <button
                className="btn p-0 border-0"
                onClick={() => setShowProfile(true)}
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                }}
              >
                <img
                  src="https://via.placeholder.com/45"
                  alt="Profile"
                  className="w-100 h-100 object-fit-cover rounded-circle"
                />
              </button>
            </div>

            <div className="px-3 pb-3 border-bottom">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <Search size={16} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ borderColor: '#128c7e' }} // Darker green accent
                />
              </div>
            </div>

            <div className="overflow-auto flex-grow-1">
              {filteredConversations.length === 0 ? (
                <div className="p-3 text-muted">No conversations found</div>
              ) : (
                filteredConversations.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedConversation(chat)}
                    className={`p-3 border-bottom cursor-pointer ${selectedConversation?.id === chat.id ? 'bg-light' : ''
                      }`}
                    style={{ cursor: 'pointer' }}
                  >
                    <h6 className="mb-1">{chat.name}</h6>
                    <small className="text-muted d-block">{chat.lastMessage}</small>
                    <small className="text-muted">{chat.time}</small>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="chat-messages col-md-8 d-flex flex-column position-relative flex-grow-1  overflow-auto">
            {/* Background image layer */}
            <div
              style={{
                backgroundImage: `url(${donateimage3})`,
                backgroundRepeat: 'repeat',
                backgroundSize: 'contain',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.2,
                zIndex: 0,
              }}
            >
              <div
                className="w-100 h-100"
                style={{ backgroundColor: 'rgba(65, 162, 201, 0.4)' }}
              ></div>
            </div>

            {/* Chat content layer */}
            <div
              className="d-flex flex-column flex-grow-1 h-100"
              style={{ position: 'relative', zIndex: 1 }}
            >
              {selectedConversation ? (
                <>
                  <div className="p-3 border-bottom bg-white bg-opacity-75">
                    <h5 className="mb-0">{selectedConversation.name}</h5>
                    <small className="text-success">Online</small>
                  </div>

                  <div className="flex-grow-1 overflow-auto p-3">
                    {getMessagesForSelectedConversation().map((msg, index) => (
                      <div
                        key={index}
                        className={`d-flex mb-2 ${msg.sender === 'You' ? 'justify-content-end' : 'justify-content-start'
                          }`}
                      >
                        <div
                          className={`p-2 rounded ${msg.sender === 'You' ? 'bg-primary text-white' : 'bg-light'
                            }`}
                          style={{ maxWidth: '75%' }}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 border-top bg-white">
                    <form className="d-flex gap-2" onSubmit={handleSendMessage}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="btn btn-primary d-flex align-items-center justify-content-center"
                      >
                        <Send size={18} />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="d-flex justify-content-center align-items-center flex-grow-1">
                  <p className="text-muted">Select a conversation to start chatting.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      

      {/* Profile Drawer */}
      {showProfile && (
  <div
    className="position-absolute top-0 end-0 bg-white border-start shadow"
    style={{
      height: '100%',
      width: '50%',
      zIndex: 10,
    }}
    onClick={toggleProfile} // Optional: to close when clicking outside inner box
  >
    <div
      onClick={(e) => e.stopPropagation()} // Prevents propagation
      className="h-100"
    >
      <div className="d-flex justify-content-end p-2">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={toggleProfile}
        >
          ✕
        </button>
      </div>
      <Profile onClick={toggleProfile} />
    </div>
  </div>
)}

   </div>
 
    </>
  );
};

export default Chat;
