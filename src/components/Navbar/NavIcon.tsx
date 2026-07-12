const NavIcon = () => {
  return (
    <svg 
      viewBox="0 0 36 36" 
      fill="none" 
      className="h-full shrink-0"
    >
      {/* Outer Triangle Outline */}
      <polygon 
        points="18,2 34,32 2,32" 
        stroke="#c9a227" 
        strokeWidth="1.5" 
      />
      
      {/* Inner Shaded Triangle */}
      <polygon 
        points="18,10 28,28 8,28" 
        fill="#c9a227" 
        opacity="0.15" 
      />
      
      {/* Center Core Circle */}
      <circle 
        cx="18" 
        cy="20" 
        r="3" 
        fill="#c9a227" 
      />
      
      {/* Top Vertical Anchor Line */}
      <line 
        x1="18" 
        y1="2" 
        x2="18" 
        y2="10" 
        stroke="#c9a227" 
        strokeWidth="1" 
        opacity="0.6" 
      />
    </svg>
  );
}

export default NavIcon