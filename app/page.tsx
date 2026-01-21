'use client';

import { useState } from 'react';

interface Stream {
  id: string;
  name: string;
  channel: string;
  game: string;
}

const defaultStreams: Stream[] = [
  {
    id: 'loud_coringa',
    name: 'LOUD Coringa',
    channel: 'loud_coringa',
    game: 'Just Chatting',
  },
  {
    id: 'loud_brabox',
    name: 'LOUD Brabox',
    channel: 'loud_brabox',
    game: 'Just Chatting',
  },
  {
    id: 'gabepeixe',
    name: 'Gabe Peixe',
    channel: 'gabepeixe',
    game: 'Just Chatting',
  },
];

export default function Home() {
  const [selectedStream, setSelectedStream] = useState(defaultStreams[0].id);
  const [chatHidden, setChatHidden] = useState(false);
  const [viewMode, setViewMode] = useState<'focus' | 'grid' | 'auto'>('auto');
  const [popupPinned, setPopupPinned] = useState(false);
  const [popupVisible, setPopupVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const selectedStreamData = defaultStreams.find((s) => s.id === selectedStream);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
      {/* HEADER */}
      <header style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #2a2a2a',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img 
            src="/logo-loud.png" 
            alt="LOUD" 
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              objectFit: 'cover',
            }}
          />
          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>LOUD MULTISTREAM</h1>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#00ff00' }}>Streaming Hub</p>
          </div>
        </div>

        {/* MENU BUTTON */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#00ff00',
              cursor: 'pointer',
              fontSize: '1.5rem',
              padding: '0.5rem',
            }}
          >
            ⚙️
          </button>

          {/* DROPDOWN MENU */}
          {menuOpen && (
            <div
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
              style={{
                position: 'absolute',
                top: '60px',
                right: 0,
                background: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '12px',
                minWidth: '200px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                zIndex: 200,
              }}
            >
              <button
                onClick={() => { setChatHidden(!chatHidden); setMenuOpen(false); }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: chatHidden ? 'rgba(0, 255, 0, 0.2)' : 'none',
                  color: chatHidden ? '#00ff00' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                }}
              >
                💬 Chat
              </button>
              <button
                onClick={() => { setViewMode('focus'); setMenuOpen(false); }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: viewMode === 'focus' ? 'rgba(0, 255, 0, 0.2)' : 'none',
                  color: viewMode === 'focus' ? '#00ff00' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                }}
              >
                🎯 Foco
              </button>
              <button
                onClick={() => { setViewMode('grid'); setMenuOpen(false); }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: viewMode === 'grid' ? 'rgba(0, 255, 0, 0.2)' : 'none',
                  color: viewMode === 'grid' ? '#00ff00' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                }}
              >
                📊 Grade
              </button>
              <button
                onClick={() => { setViewMode('auto'); setMenuOpen(false); }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: viewMode === 'auto' ? 'rgba(0, 255, 0, 0.2)' : 'none',
                  color: viewMode === 'auto' ? '#00ff00' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                }}
              >
                ⚙️ Auto
              </button>
              <button
                onClick={() => { setPopupPinned(!popupPinned); setMenuOpen(false); }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: popupPinned ? 'rgba(0, 255, 0, 0.2)' : 'none',
                  color: popupPinned ? '#00ff00' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                }}
              >
                📌 Fixar
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div style={{
        display: 'flex',
        height: 'calc(100vh - 80px)',
        gap: '1rem',
        padding: '1rem',
      }}>
        {/* STREAMS SECTION */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* STREAM GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: viewMode === 'focus' ? '1fr' : viewMode === 'grid' ? 'repeat(3, 1fr)' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            flex: 1,
          }}>
            {defaultStreams.map((stream) => (
              <div
                key={stream.id}
                onClick={() => setSelectedStream(stream.id)}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: '#1a1a1a',
                  border: selectedStream === stream.id ? '2px solid #00ff00' : '2px solid #2a2a2a',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '300px',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: '#ff0000',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  zIndex: 10,
                }}>
                  LIVE
                </div>

                <iframe
                  src={`https://twitch.tv/embed/${stream.channel}`}
                  height="100%"
                  width="100%"
                  allowFullScreen
                  title={`${stream.name} Stream`}
                  style={{ border: 'none' }}
                ></iframe>

                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)',
                  padding: '20px 12px 12px',
                  color: 'white',
                }}>
                  <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>
                    {stream.name}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#a0a0a0' }}>
                    {stream.game}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHAT SIDEBAR */}
        {!chatHidden && (
          <div style={{
            width: '350px',
            background: '#1a1a1a',
            borderRadius: '16px',
            border: '1px solid #2a2a2a',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #00ff00 0%, #00cc00 100%)',
              color: '#000',
              padding: '1rem',
              fontWeight: 700,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              CHAT - {selectedStreamData?.name}
              <button
                onClick={() => setChatHidden(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#000',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <iframe
                src={`https://twitch.tv/embed/${selectedStreamData?.channel}/chat`}
                height="100%"
                width="100%"
                title={`${selectedStreamData?.name} Chat`}
                style={{ border: 'none' }}
              ></iframe>
            </div>
          </div>
        )}
      </div>

      {/* FLOATING POPUP */}
      {popupVisible && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '16px',
            padding: '1.5rem',
            maxWidth: '300px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            zIndex: 50,
            opacity: popupPinned ? 0.3 : 1,
            transition: 'opacity 0.3s ease',
          }}
          onMouseEnter={(e) => {
            if (popupPinned) {
              (e.currentTarget as HTMLElement).style.opacity = '1';
            }
          }}
          onMouseLeave={(e) => {
            if (popupPinned) {
              (e.currentTarget as HTMLElement).style.opacity = '0.3';
            }
          }}
        >
          <button
            onClick={() => setPopupVisible(false)}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'none',
              border: 'none',
              color: '#a0a0a0',
              cursor: 'pointer',
              fontSize: '1.25rem',
            }}
          >
            ✕
          </button>
          <div style={{ color: '#00ff00', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.125rem' }}>
            LOUD MULTISTREAM
          </div>
          <div style={{ color: '#a0a0a0', fontSize: '0.875rem', lineHeight: 1.5 }}>
            Bem-vindo ao LOUD Multistream! Acompanhe os streamers da LOUD em tempo real. Use o menu de controles para alternar entre diferentes modos de exibição ou ocultar o chat.
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
        padding: '2rem',
        textAlign: 'center',
        borderTop: '1px solid #2a2a2a',
        position: 'relative',
      }}>
        <div style={{
          color: '#a0a0a0',
          fontSize: '0.95rem',
          cursor: 'pointer',
          position: 'relative',
          display: 'inline-block',
        }}>
          Dev by: Corintia420
          <div style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '12px',
            padding: '12px',
            display: 'flex',
            gap: '12px',
            marginBottom: '10px',
            opacity: 0,
            pointerEvents: 'none',
            transition: 'all 0.3s ease',
          }}
          className="social-popup"
          >
            <a
              href="https://instagram.com/corintia420"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                background: 'rgba(0, 255, 0, 0.1)',
                border: '1px solid #00ff00',
                color: '#00ff00',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#00ff00';
                (e.currentTarget as HTMLElement).style.color = '#000';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(0, 255, 0, 0.1)';
                (e.currentTarget as HTMLElement).style.color = '#00ff00';
              }}
            >
              📷
            </a>
            <a
              href="https://twitch.tv/corintia420"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                background: 'rgba(0, 255, 0, 0.1)',
                border: '1px solid #00ff00',
                color: '#00ff00',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#00ff00';
                (e.currentTarget as HTMLElement).style.color = '#000';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(0, 255, 0, 0.1)';
                (e.currentTarget as HTMLElement).style.color = '#00ff00';
              }}
            >
              📺
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        footer > div:hover .social-popup {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}
