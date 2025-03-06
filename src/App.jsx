import { useReducer} from 'react'
import Board from  "./components/Board/Board.jsx";
import "./App.css"
import AppContext from './contexts/context.jsx';
import { reducer } from './reducer/reducer.jsx';
import { initGameState } from './constant.jsx';



function App() {
  
  const [appState,dispatch] = useReducer(reducer,initGameState)
  
  const providerState = {
    appState,
    dispatch
  }
  return (
    <AppContext.Provider value={providerState}>
      <div className='App'>
        <Board />
      </div>
    </AppContext.Provider>
  )
}

export default App
