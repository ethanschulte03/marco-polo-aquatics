const RESEND_API_KEY = 're_TUhFLBDH_E4UGxfFD7Gi5VJpejpWYnYJK'

export async function sendEmail({ to, subject, html }) {
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Marco Polo Aquatics <onboarding@resend.dev>',
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      }),
    })
  } catch (err) {
    console.error('Email send error:', err)
  }
}
