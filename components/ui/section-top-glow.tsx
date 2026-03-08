export function SectionTopGlow() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: 'radial-gradient(ellipse 60% 1px at 50% 0%, rgba(1,123,185,0.35) 0%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: '120px',
          background: 'radial-gradient(ellipse 50% 120px at 50% 0%, rgba(1,123,185,0.08) 0%, transparent 100%)',
        }}
      />
    </>
  )
}
