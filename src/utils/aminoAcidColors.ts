export const aminoAcidColors: Record<string, string> = {
  C: '#FFEA00',
  A: '#67E4A6',
  I: '#67E4A6',
  L: '#67E4A6',
  M: '#67E4A6',
  F: '#67E4A6',
  W: '#67E4A6',
  Y: '#67E4A6',
  V: '#67E4A6',
  P: '#67E4A6',
  G: '#C4C4C4',
  D: '#FC9CAC',
  E: '#FC9CAC',
  K: '#BB99FF',
  R: '#BB99FF',
  S: '#80BFFF',
  T: '#80BFFF',
  H: '#80BFFF',
  Q: '#80BFFF',
  N: '#80BFFF',
  '-': '#FFFFFF',
};

export const getAminoAcidColor = (aminoAcid: string): string => {
  const upperAA = aminoAcid.toUpperCase();
  return aminoAcidColors[upperAA] || '#FFFFFF';
};

export const getTextColor = (backgroundColor: string): string => {
  switch (backgroundColor) {
    case '#FFEA00':
    case '#67E4A6':
    case '#C4C4C4':
    case '#FC9CAC':
    case '#80BFFF':
    case '#FFFFFF':
    case '#BB99FF':
      return '#000000';
    default:
      return '#000000';
  }
};

export const aminoAcidGroups = {
  cysteine: ['C'],
  hydrophobic: ['A', 'I', 'L', 'M', 'F', 'W', 'Y', 'V', 'P'],
  glycine: ['G'],
  negativelyCharged: ['D', 'E'],
  positivelyCharged: ['K', 'R'],
  polarUncharged: ['S', 'T', 'H', 'Q', 'N'],
  gap: ['-'],
};

export const aminoAcidGroupNames = {
  cysteine: 'Цистеин',
  hydrophobic: 'Гидрофобные',
  glycine: 'Глицин',
  negativelyCharged: 'Отрицательно заряженные',
  positivelyCharged: 'Положительно заряженные',
  polarUncharged: 'Полярные незаряженные',
  gap: 'Пропуск',
};
