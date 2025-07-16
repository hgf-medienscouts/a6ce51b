/**
 * Generates a random ID string of specified length
 * @param {number} length - The length of the ID to generate
 * @return {string} - The generated ID
 */
export function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

/**
 * Generates a cryptographic hash for a string (similar to the original cyb3r method)
 * @param {string} str - The input string
 * @param {number} seed - Optional seed for the hash
 * @return {string} - The hash string
 */
export function cyb3r(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
  h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
  return (h2>>>0).toString(16).padStart(8,0)+(h1>>>0).toString(16).padStart(8,0);
}

/**
 * Processes a seed to generate a quiz code
 * @param {string} seed - The seed to process
 * @return {string} - The quiz code
 */
export function generateQuizCode(seed) {
  const code = btoa(seed);
  let code2 = "";
  const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0,58);

  for(let i = 0; i < code.length; i++) {
    if((code.slice(0,i).search(code[i]) === -1) && (alphabet.search(code[i]) >= 0)) {
      code2 += code[i];
    }
  }
  
  // Ensure code is long enough
  let finalCode = code2;
  if(finalCode.length < 15) {
    for(let i = 0; i < alphabet.length; i++) {
      if(finalCode.search(alphabet[i]) === -1) {
        finalCode += alphabet[i];
      }
    }
  }
  
  return finalCode.slice(0,15);
}

/**
 * Generates a random order of questions
 * @param {number} total - Total number of questions
 * @param {string} code - The quiz code
 * @return {Array<number>} - Array with question order
 */
export function generateQuestionOrder(code) {
  const ar = [];
  for(let i = 0; i < code.length; i++) {
    ar.push("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(code[i]));
  }
  return ar;
}

/**
 * Calculates quiz results
 * @param {Array<string>} givenAnswers - Answers given by the user
 * @param {Array<string>} correctAnswers - Correct answers
 * @param {Array<number>} questionOrder - Order of questions
 * @return {Object} - Results object
 */
export function calculateResults(givenAnswers, correctAnswers, questionOrder) {
  let correct = 0;
  let incorrect = 0;
  const total = givenAnswers.length;
  
  // Count answers
  let a = 0, b = 0, c = 0, d = 0;
  const resultDetails = [];
  
  for(let i = 0; i < total; i++) {
    const qIndex = questionOrder[i];
    const isCorrect = givenAnswers[i] === correctAnswers[qIndex];
    
    resultDetails.push(isCorrect ? 1 : 0);
    
    if (isCorrect) {
      correct++;
    } else {
      incorrect++;
    }
    
    // Count answer types
    switch(givenAnswers[i]) {
      case "a": a++; break;
      case "b": b++; break;
      case "c": c++; break;
      case "d": d++; break;
      default: break;
    }
  }
  
  return {
    answerCounts: [a, b, c, d],
    correct,
    incorrect,
    resultDetails,
    total
  };
}

/**
 * Parses URL parameters
 * @param {string} url - The URL to parse
 * @return {Object} - Object with parameter names and values
 */
export function parseURLParams(url) {
  const params = {};
  const queryString = url.split('?')[1];
  
  if (!queryString) return params;
  
  const pairs = queryString.split('&');
  
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1] || '');
  }
  
  return params;
}

/**
 * Gets the quiz code from the URL
 * @param {string} url - The URL to parse
 * @return {string} - The quiz code
 */
export function getQuizCode(url) {
  const params = parseURLParams(url);
  return params.s || '';
}