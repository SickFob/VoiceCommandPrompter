const numbersByLanguage: { [key: string]: { [key: string]: number } } = {
  'en-US': { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 },
  'es-ES': { un: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10 },
  // Add more code languages and their corresponding numbers here
};

export function convertLetterToNumber(letter: string, language: string): number | null {
  const numbers = numbersByLanguage[language];
  if (!numbers) {
    return null; // Language not supported
  }
  const number = numbers[letter.toLowerCase()];
  return number || null; // Return the corresponding number or null if not found
}
