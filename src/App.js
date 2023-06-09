import React from 'react'
import './App.css';
import { getMeaning } from './services/dictionary-service'

function App() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [wordMeaning, setWordMeaning] = React.useState('')
  const [errorMsg, setErrorMsg] = React.useState('')

  const handleSubmit = async(e) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      setWordMeaning('')
      setErrorMsg('')
      const { word } = e.target.elements
      let response = await getMeaning(word.value)
      response = await response.json()
      setWordMeaning(response[0].meanings[0].definitions[0].definition)
    }
    catch(e) {
      if (e.message.includes('404')) {
        setErrorMsg('Word not found :( Try another search')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="App">
      <h1>Free Dictionary</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="word">Word: {` `}</label>
        <input type="text" id="word" />
        <button disabled={isLoading} type="submit">
          Consult
        </button>
      </form>
      { isLoading && <p>Loading...</p> }
      { !isLoading && wordMeaning && <p>{wordMeaning}</p> }
      { !isLoading && !wordMeaning && !errorMsg && <p>Type a word and click 'Consult'</p> }
      { !isLoading && errorMsg && <p>{errorMsg}</p> }
    </div>
  );
}

export default App;
