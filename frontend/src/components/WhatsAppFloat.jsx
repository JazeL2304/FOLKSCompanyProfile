import { useState, useEffect } from 'react'

const WhatsAppFloat = () => {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const styles = {
    container: {
      position: 'fixed',
      bottom: '32px',
      right: '32px',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      gap: '0',
      textDecoration: 'none',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      pointerEvents: visible ? 'all' : 'none',
    },
    pill: {
      display: 'flex',
      alignItems: 'center',
      background: '#25D366',
      borderRadius: '26px',
      height: '52px',
      paddingRight: '4px',
      paddingLeft: hovered ? '16px' : '4px',
      boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
      transition: 'padding-left 0.3s ease',
      overflow: 'hidden',
    },
    label: {
      color: 'white',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: '14px',
      whiteSpace: 'nowrap',
      maxWidth: hovered ? '160px' : '0',
      opacity: hovered ? 1 : 0,
      transition: 'max-width 0.3s ease, opacity 0.2s ease',
      overflow: 'hidden',
      marginRight: hovered ? '8px' : '0',
    },
    icon: {
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      background: '#25D366',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }
  }

  return (
    <a
      href="https://wa.me/6282289993655"
      target="_blank"
      rel="noopener noreferrer"
      style={styles.container}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.pill}>
        <span style={styles.label}>WhatsApp kami</span>
        <div style={styles.icon}>
          <svg viewBox="0 0 32 32" fill="none" width="26" height="26">
            <path d="M16 1C7.716 1 1 7.716 1 16c0 2.628.676 5.15 1.96 7.374L1 31l7.84-1.932A14.94 14.94 0 0016 31c8.284 0 15-6.716 15-15S24.284 1 16 1z" fill="white"/>
            <path d="M23.07 19.44c-.36-.18-2.13-1.05-2.46-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.9-1.79-1.07-.96-1.8-2.14-2.01-2.5-.21-.36-.02-.55.16-.73.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.7-.59-.6-.81-.61h-.69c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3s1.29 3.48 1.47 3.72c.18.24 2.54 3.88 6.16 5.44.86.37 1.53.59 2.05.76.86.27 1.65.23 2.27.14.69-.1 2.13-.87 2.43-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42z" fill="#25D366"/>
          </svg>
        </div>
      </div>
    </a>
  )
}

export default WhatsAppFloat