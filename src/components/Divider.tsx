const Divider = () => {
  return (
    <div className="w-full max-w-xl mx-auto flex items-center gap-3 my-1">

      <div className="flex-1 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent" />

      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
        <path 
          d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5Z" 
          fill="#c9a227" 
          opacity="0.7" 
        />
      </svg>

      <div className="flex-1 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent" />
      
    </div>
  )
}

export default Divider