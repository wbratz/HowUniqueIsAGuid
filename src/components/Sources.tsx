import React from 'react'

export default function Sources() {
  const items = [
    {
      id: 1,
      label: 'University of Hawaii estimate of ~7.5e18 grains of sand on Earth',
      url: 'https://manoa.hawaii.edu/news/article.php?aId=607',
    },
    {
      id: 2,
      label: 'United Nations, world population reached 8 billion in 2022',
      url: 'https://www.un.org/en/desa/world-population-reached-8-billion-2022',
    },
    {
      id: 3,
      label: 'NASA, age of the universe is about 13.8 billion years',
      url: 'https://science.nasa.gov/astrophysics/focus-areas/how-old-is-the-universe/',
    },
  ]

  return (
    <section className="py-10 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white/70 text-sm">
        <h2 className="font-semibold mb-2">Sources</h2>
        <ol className="list-decimal list-inside space-y-1">
          {items.map((s) => (
            <li key={s.id}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline">
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
