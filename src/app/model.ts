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

export interface EEResponse{
  timestamp: string,
  time: string,
  lang: string,
  text: string,
  annotations: Annotation[]
}

export interface Annotation{
  id: string,
  title: string,
  uri: string,
  label: string,
  confidence: string,
  categories: string[],
  types: string[],
  abstract: string,
  image: Image
}

export interface Image{
  full: string,
  thumbnail: string
}
