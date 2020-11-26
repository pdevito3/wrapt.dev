import React from 'react'
import { DocumentationLayout } from 'src/layouts/DocumentationLayout'
import Link from 'next/link'

export default function DocsLandingPage() {
  return (
    <div>
      docs landing page
    </div>
  )
}

DocsLandingPage.layoutProps = {
  meta: {
    title: 'Documentation',
  },
  Layout: DocumentationLayout,
}
