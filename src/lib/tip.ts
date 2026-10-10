const LABELS: Record<string, string> = {
  '1': 'Home win',
  '2': 'Away win',
  X: 'Draw',
  '1X': 'Home or draw',
  X2: 'Away or draw',
  BTTS: 'Both teams to score',
}

export const tipLabel = (tip: string) => LABELS[tip] ?? tip
