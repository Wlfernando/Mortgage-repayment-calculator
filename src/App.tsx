import { useState } from 'react'
import './App.css'
import Calculator from './components/Calculator/Calculator'
import type { Mortgage } from './utils/types';
import Result from './components/Results/Results';

const emptyMortgage = {monthly: '', total: ''};

function App() {
  const [reset, setReset] = useState(0);
  const [mortgage, setMortgage] = useState<Mortgage>(emptyMortgage);

  return (
    <>
      <main className='main'>
        <Calculator 
          reset={() => (setReset(reset + 1), setMortgage(emptyMortgage))}
          key={reset}
          onSubmit={(mortgage: Mortgage) => setMortgage(mortgage)}
        />
        <Result 
          monthly={mortgage.monthly}
          total={mortgage.total}
        />
      </main>
    </>
  )
}

export default App
