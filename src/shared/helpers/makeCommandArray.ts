export const makeCommandArray = (prefixesArr:string[], commandWordsArr:string[]) => {
  return prefixesArr.map(pref => commandWordsArr.map(word => pref + word)).flat(1)
}