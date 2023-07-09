export interface ApiResponse<T> {
  errorMessage?: string
  success: boolean
  data?: T
}

export interface Dictionary<T> {
  [Key: string]: T
}

export interface ExecutInputType {
  code: string
  input: string
  lang: string
}
export interface ExecutOutputType {
  output: string
  error: boolean
}

export interface SaveCodeRequest {
  lang: string
  code: string
}

export interface CodeData {
  id: number
  code: string
  lang: string
  created_on: Date
}
