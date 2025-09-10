import React from 'react'

interface MapPlaceholderProps {
  className?: string
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ className = '' }) => {
  return (
    <div 
      className={`bg-cover bg-center bg-no-repeat ${className}`}
      style={{
        backgroundImage: 'url(//www.researchgate.net/profile/Vincent-Labatut/publication/308321200/figure/fig18/AS:642475333009417@1530189464757/The-famous-rectilinear-network-of-Manhattan-USA-Google-Maps.png)'
      }}
    />
  )
}
