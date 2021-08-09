import React from 'react'
import AdImage from '../assets/images/wrapt-ad.png'
import Link from 'next/link'

function WraptAd() {
  return (
    <div className="my-5 md:my-8 flex items-center justify-center">
      <Link href={"/"}>
        <a>
          <img className="h-36 sm:h-48 object-contain" src={AdImage} alt="wrapt scaffolding info"/>
        </a>
      </Link>
    </div>
  )
}

export default WraptAd
