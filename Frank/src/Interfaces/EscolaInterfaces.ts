export interface EscolaInterface {
  idEscola: number
  nome: string
  cnpj: string
  email: string
  ativo: boolean
  tipo: string
  federacao: string
  veterinario: boolean
  qualidade: number | null
}