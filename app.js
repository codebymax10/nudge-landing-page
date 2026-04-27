const SUPABASE_URL = 'https://lxmgzjeonxbfawmalhlg.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4bWd6amVvbnhiZmF3bWFsaGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyODUyODksImV4cCI6MjA5Mjg2MTI4OX0.wxrh6OzZh_eyiVxqQjfOQfI-qiSjaStT6G_REou6OUw'

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function handleWaitlist(form) {
  const input = form.querySelector('input[type="email"]')
  const button = form.querySelector('button')
  const email = input.value.trim()

  if (!email) return

  const originalText = button.textContent
  button.disabled = true
  button.textContent = 'Saving…'

  const { error } = await db.from('waitlist').insert({ email })

  if (error) {
    button.textContent = error.code === '23505' ? 'Already joined!' : 'Something went wrong'
    button.disabled = false
  } else {
    input.value = ''
    button.textContent = "You're on the list!"
  }

  setTimeout(() => {
    button.textContent = originalText
    button.disabled = false
  }, 3000)
}

document.querySelectorAll('.hero-form, .cta-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault()
    handleWaitlist(form)
  })
})
