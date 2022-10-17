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

export interface TSResponse{
  timestamp: string,
  time: string,
  lang: string,
  langConfidence: string,
  similarity: string
}

export interface SAResponse{
  timestamp: string,
  time: string,
  lang: string,
  sentiment: Sentiment
}

export interface Sentiment{
  score: string,
  type: string
}
