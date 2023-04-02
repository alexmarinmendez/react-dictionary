export const getMeaning = async (word) => {
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
}