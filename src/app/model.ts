export interface LDResponse{
  timestamp: string,
  time: string,
  text: string,
  detectedLangs: Langs[]
}

export interface Langs{
  lang: string,
  confidence: string
}
