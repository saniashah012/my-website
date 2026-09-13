'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Send, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getSupabaseClient, mergeFeedback, type Feedback } from '@/lib/supabase'

const fields = 'id,name,message,rating,created_at'
const inputClass = 'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20'

export function ContactSection() {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [available, setAvailable] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [reload, setReload] = useState(0)
  const submittingRef = useRef(false)

  useEffect(() => {
    let active = true
    let client: ReturnType<typeof getSupabaseClient>
    try {
      client = getSupabaseClient()
    } catch {
      client = null
    }
    if (!client) {
      setLoadError('Feedback is temporarily unavailable. Please check back soon.')
      setLoading(false)
      return
    }
    const supabase = client
    setAvailable(true)
    setLoading(true)
    setLoadError('')

    async function fetchFeedback() {
      try {
        // Fetch every page, including tables larger than the API response limit.
        const rows: Feedback[] = []
        const pageSize = 100
        for (let offset = 0; active; offset += pageSize) {
          const { data, error } = await supabase.from('feedback').select(fields)
            .order('created_at', { ascending: false }).order('id', { ascending: false })
            .range(offset, offset + pageSize - 1)
          if (error) throw error
          rows.push(...(data as Feedback[]))
          if (data.length < pageSize) break
        }
        if (active) {
          setFeedback((current) => mergeFeedback(current, rows))
          setLoadError('')
        }
      } catch {
        if (active) setLoadError('Could not load feedback. Please try again.')
      } finally {
        if (active) setLoading(false)
      }
    }

    const channel = supabase.channel('public-feedback')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'feedback' }, (payload) => {
        if (active) setFeedback((current) => mergeFeedback(current, [payload.new as Feedback]))
      })
      .subscribe((status) => {
        // Catch any inserts missed while establishing or restoring the connection.
        if (status === 'SUBSCRIBED') void fetchFeedback()
      })
    void fetchFeedback()
    return () => {
      active = false
      void supabase.removeChannel(channel)
    }
  }, [reload])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submittingRef.current) return
    const form = event.currentTarget
    const values = new FormData(form)
    const name = String(values.get('name') ?? '').trim()
    const message = String(values.get('message') ?? '').trim()
    const rating = Number(values.get('rating'))
    setSubmitError('')
    setSuccess('')
    if (!name || !message || name.length > 100 || message.length > 2000 || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      setSubmitError('Enter your name, a feedback message, and a rating from 1 to 5.')
      return
    }
    submittingRef.current = true
    setSubmitting(true)
    try {
      const supabase = getSupabaseClient()
      if (!supabase) throw new Error('Feedback unavailable')
      // Supply these fields even if the existing table has no column defaults.
      const entry: Feedback = { id: crypto.randomUUID(), name, message, rating, created_at: new Date().toISOString() }
      const { data, error } = await supabase.from('feedback').insert(entry).select(fields).single()
      if (error) throw error
      setFeedback((current) => mergeFeedback(current, [data as Feedback]))
      form.reset()
      setSuccess('Thank you! Your feedback has been posted.')
    } catch {
      setSubmitError('Could not submit feedback. Your message is still here; please try again.')
    } finally {
      submittingRef.current = false
      setSubmitting(false)
    }
  }

  return (
    <section id="feedback" className="scroll-mt-16 bg-muted/40 px-6 py-20 md:py-28">
      <span id="contact" className="block scroll-mt-20" aria-hidden="true" />
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="mb-3 font-display text-sm font-semibold uppercase tracking-widest text-primary">Share your thoughts</p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Feedback</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">I&apos;d love to hear what you think of my work. Leave a rating and help me improve.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8" aria-busy={submitting}>
          <fieldset disabled={!available || submitting} className="flex min-w-0 flex-col gap-5 disabled:opacity-60">
            <legend className="sr-only">Leave feedback</legend>
            <div className="grid gap-5 sm:grid-cols-[1fr_10rem]">
              <div className="flex flex-col gap-2">
                <label htmlFor="feedback-name" className="text-sm font-medium">Name</label>
                <input id="feedback-name" name="name" type="text" autoComplete="name" required maxLength={100} placeholder="Your name" className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="feedback-rating" className="text-sm font-medium">Rating (1–5)</label>
                <select id="feedback-rating" name="rating" required defaultValue="5" className={inputClass}>
                  {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} {rating === 1 ? 'star' : 'stars'}</option>)}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="feedback-message" className="text-sm font-medium">Feedback message</label>
              <textarea id="feedback-message" name="message" required maxLength={2000} rows={5} placeholder="What stood out? What could be better?" className={`${inputClass} resize-y`} aria-describedby="feedback-public-note" />
              <p id="feedback-public-note" className="text-xs text-muted-foreground">Your name, message, and rating will be visible publicly.</p>
            </div>
            <Button type="submit" size="lg" className="w-full sm:w-auto sm:self-start">
              {submitting ? 'Submitting…' : 'Submit feedback'}<Send className="size-4" aria-hidden="true" />
            </Button>
          </fieldset>
          {submitError && <p role="alert" className="mt-4 text-sm text-destructive">{submitError}</p>}
          <p role="status" className="mt-4 text-sm text-primary">{success}</p>
        </form>

        <div className="mt-12" aria-labelledby="feedback-list-title">
          <h3 id="feedback-list-title" className="font-display text-xl font-semibold">What people are saying</h3>
          {loading && <p role="status" className="mt-5 text-sm text-muted-foreground">Loading feedback…</p>}
          {loadError && <div role="alert" className="mt-5 text-sm text-destructive">{loadError}{available && <button type="button" onClick={() => setReload((value) => value + 1)} className="ml-2 underline">Try again</button>}</div>}
          {!loading && !loadError && feedback.length === 0 && <p className="mt-5 rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">Be the first to share your feedback!</p>}
          <ul className="mt-5 grid gap-5 sm:grid-cols-2">
            {feedback.map((item) => (
              <li key={item.id} className="min-w-0 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <article className="flex h-full flex-col">
                  <h4 className="break-words font-display font-semibold">{item.name}</h4>
                  <div className="mt-2 flex gap-1 text-primary" role="img" aria-label={`${item.rating} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((star) => <Star key={star} aria-hidden="true" className={`size-4 ${star <= item.rating ? 'fill-current' : 'text-muted-foreground/30'}`} />)}
                  </div>
                  <p className="mt-4 flex-1 whitespace-pre-wrap break-words text-sm leading-relaxed">{item.message}</p>
                  <time dateTime={item.created_at} className="mt-5 block text-xs text-muted-foreground">{new Date(item.created_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</time>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
