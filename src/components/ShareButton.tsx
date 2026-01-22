import { useState } from 'react'
import { Share2, Check, Link } from 'lucide-react'

interface ShareButtonProps {
  section: string
  title: string
  text?: string
  className?: string
}

export default function ShareButton({ section, title, text, className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const canShare = typeof navigator !== 'undefined' && 'share' in navigator

  const shareUrl = `${window.location.origin}${window.location.pathname}#${section}`
  const shareTitle = `${title} - How Unique is a GUID?`
  const shareText = text || `Check out this mind-blowing fact about GUIDs: ${title}`

  const handleShare = async () => {
    // Try native share API first (mobile)
    if (canShare) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        })
        return
      } catch (err) {
        // User cancelled or share failed, fallback to copy
        if ((err as Error).name === 'AbortError') return
      }
    }

    // Fallback: copy link to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Last resort: select and copy
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors text-sm ${className}`}
      aria-label={`Share: ${title}`}
      title="Share this section"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-400" />
          <span className="text-green-400">Link copied!</span>
        </>
      ) : (
        <>
          {canShare ? <Share2 className="h-4 w-4" /> : <Link className="h-4 w-4" />}
          <span>Share</span>
        </>
      )}
    </button>
  )
}
