'use client';

import CookieConsent from 'react-cookie-consent';

export default function CookieConsentBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="bidayalab-consent"
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        fontFamily: 'var(--font-louis, sans-serif)',
        fontSize: '14px',
        color: '#a1a1aa',
        alignItems: 'center',
      }}
      buttonStyle={{
        background: '#beff01',
        color: '#000',
        fontWeight: '700',
        fontSize: '12px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: '10px 24px',
        borderRadius: '0',
        margin: '0 8px 0 0',
      }}
      declineButtonStyle={{
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.2)',
        color: '#71717a',
        fontWeight: '700',
        fontSize: '12px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: '10px 24px',
        borderRadius: '0',
      }}
    >
      We use cookies to analyse traffic and improve your experience.{' '}
      <a href="/privacy" style={{ color: '#beff01', textDecoration: 'underline' }}>
        Privacy policy
      </a>
    </CookieConsent>
  );
}
