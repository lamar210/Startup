import React, { useState } from 'react';
import Chroma from 'chroma-js';

const Journal = () => {
  const [text, setText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [color, setColor] = useState("#000000");
  const [font, setFont] = useState("Roboto");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const insertEmoji = (emoji) => {
    setText(text + emoji);
    setSelectedMenu('');
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
    setSelectedMenu('');
  };

  const handleFontChange = (newFont) => {
    setFont(newFont);
    setSelectedMenu('');
  };

  const lightenedColor = Chroma(color).brighten(1.5).hex();
  return (
    <div className="journal-page">
      <header>
        <h2>My Journal</h2>
      </header>
      <main>
        <form>
          <div>
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
            <div className="dropdown-menu-options">
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
                {[
                  '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉',
                  '😊', '😎', '😍', '😘', '😜', '🤩', '😝', '😳', '😞',
                  '😟', '😢', '😭', '😤', '😡', '🤬', '😱', '😨', '😰',
                  '🤯', '🥵', '🥶',
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
          </div>
        </form>
      </main>
    </div>
  );
};

export default Journal;
