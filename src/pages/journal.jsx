import React, { useState, useEffect, useRef } from 'react';
import Chroma from 'chroma-js';
import { useAuth } from '../AuthContext';
import { useLocation } from 'react-router-dom';

const Journal = () => {
  const location = useLocation();
  const { entryId, content } = location.state || {};
  const { email } = useAuth();
  const [text, setText] = useState(content || '');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [message, setMessage] = useState('');
  const [color, setColor] = useState("#000000");
  const [font, setFont] = useState("Roboto");
  const menuRef = useRef(null);
  const chromaRef = useRef(null);

  useEffect(() => {
    if (content) {
      setText(content);
    }
  }, [content]);

  const getDate = () => {
    const today = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return today.toLocaleDateString('en-US', options);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const insertEmoji = (emoji) => {
    setText(text + emoji);
    setSelectedMenu('');
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleFontChange = (newFont) => {
    setFont(newFont);
    setSelectedMenu('');
  };

  const insertSticker = (stickerPath) => {
    setText(text + ` [Sticker: ${stickerPath}]`);
    setSelectedMenu("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email) {
      setMessage('You need to be logged in to submit the journal entry!');
      return;
    }
  
    const newEntry = {
      email,
      title: `Entry ${Date.now()}`,
      date: getDate(),
      content: text,
    };
  
    try {
      const response = await fetch('/api/journal-entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage('Your journal was saved successfully!');
      } else {
        setMessage(data.error || 'There was an issue saving your journal entry. Please try again.');
      }
    } catch (error) {
      console.error('Error saving journal entry:', error);
      alert('An unexpected error occurred.');
    }
  };

  const lightenedColor = Chroma(color).brighten(1.5).hex();

  useEffect(() => {
    const fetchEntries = async () => {
      if (email) {
        try {
          const response = await fetch(`/api/get-journal-entries?email=${email}`);
          const data = await response.json();
          if (response.ok) {
            setEntries(data);
            if (data.length > 0) {
              setText(data[0].content);
            }
          } else {
            console.error('Error fetching journal entries:', data.error);
          }
        } catch (error) {
          console.error('Error fetching journal entries:', error);
        }
      }
    };

    fetchEntries();
  }, [email]);

  const handleOverlayClick = () => {
    setMessage('');
  };
  
  return (
    <div className="journal-page">
      <header>
        <h2>My Journal</h2>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div ref={menuRef}>
            <a
              href="#"
              className="menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Menu
            </a>
            {isMenuOpen && (
              <div className="dropdown-menu">
                <button type="button" onClick={() => setSelectedMenu('colors')}>
                  Colors
                </button>
                <button type="button" onClick={() => setSelectedMenu('fonts')}>
                  Fonts
                </button>
                <button type="button" onClick={() => setSelectedMenu('emojis')}>
                  Emojis
                </button>
                <button type="button" onClick={() => setSelectedMenu('stickers')}>
                  Stickers
                </button>
              </div>
            )}
          </div>

          {selectedMenu === 'colors' && (
            <div className="dropdown-menu-options" ref={chromaRef}>
              <input
                type="color"
                value={color}
                onChange={handleColorChange}
                style={{ width: '50px', height: '30px' }}
              />
            </div>
          )}

          {selectedMenu === 'fonts' && (
            <div className="dropdown-menu-options">
              <button type="button" onClick={() => handleFontChange('Roboto')}>
                Roboto
              </button>
              <button type="button" onClick={() => handleFontChange('Arial')}>
                Arial
              </button>
              <button type="button" onClick={() => handleFontChange('Courier New')}>
                Courier New
              </button>
            </div>
          )}

          {selectedMenu === 'emojis' && (
            <div className="dropdown-menu-options">
              <div className="emoji-buttons">
                {[ '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉',
                  '😊', '😎', '😍', '😘', '😜', '🤩', '😝', '😳', '😞',
                  '😟', '😢', '😭', '😤', '😡', '🤬', '😱', '😨', '😰',
                  '🤯', '🥵', '🥶', '🐋'
                ].map((emoji) => (
                  <button
                    type="button"
                    key={emoji}
                    onClick={() => insertEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedMenu === "stickers" && (
            <div className="dropdown-menu-options stickers-menu">
              {Array.from({ length: 23 }, (_, i) => `stickers/sticker${i + 1}.png`).map((stickerPath) => (
                <button
                  type="button"
                  key={stickerPath}
                  onClick={() => insertSticker(stickerPath)}
                >
                  <img
                    src={`/${stickerPath}`}
                    alt="sticker"
                    style={{ width: "30px", height: "30px" }}
                  />
                </button>
              ))}
            </div>
          )}

          <div>
            <textarea
              id="journal_text"
              rows="15"
              cols="100"
              placeholder="Write out your thoughts and feelings here..."
              value={text}
              onChange={handleTextChange}
              style={{ color: color, fontFamily: font }}
            />
          </div>

          <div>
            <button type="submit" id="journal-submit">
              Add to my journal
            </button>
            {message && (
              <div className="message-overlay" onClick={handleOverlayClick}>
                <div className="modal-content">
                  <h2>{message}</h2>
                </div>
              </div>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default Journal;
