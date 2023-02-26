import React from 'react'

interface CondicionalInterface {
  children: any
  condicao: boolean
}

export default function Condicional({ children, condicao }: CondicionalInterface) {

  if (condicao) {
    return (<>{children}</>)
  } else {
    return (<></>)
  }
}