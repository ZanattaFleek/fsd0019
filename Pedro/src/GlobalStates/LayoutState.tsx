import React, { useState } from 'react'

export interface LayoutStateInterface {
  tituloPagina: string
}

export default function useLayoutState() {

  const [layoutState, setLayoutState] = useState<LayoutStateInterface>({ tituloPagina: '' })

  return { layoutState, setLayoutState }

}