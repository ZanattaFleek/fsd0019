import React from 'react'

export default function Condicional(
  { condicao, children }: { condicao: boolean, children: any }) {

  if (condicao) {
    return (<>{children}</>)
  } else {
    return (<></>)
  }

}