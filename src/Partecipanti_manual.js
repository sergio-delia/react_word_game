import { useState } from "react"
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Partecipanti_manual() {
  const [n_partecipanti, setNPartecipanti] = useState(2);
  const elementi = []
  const renderList = () => {
    for(let i = 0; i< n_partecipanti; i++){
      elementi.push(<input key={i} name="" style={{width: '30rem', margin: '1em', padding: '1em'}} />)
    }
  }

  const aumenta = () =>{
    n_partecipanti < 10 ? setNPartecipanti(n_partecipanti + 1) : toast.error('Non puoi aggiungere altri giocatori', {position: "bottom-center"});
  }

  const diminuisci = () =>{
    n_partecipanti > 2 ? setNPartecipanti(n_partecipanti - 1) : toast.error('Giocatori minimi: 2', {position: "bottom-center"});
  }
  
  renderList()
    
  return (
    <>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {elementi}
    </div>
      {n_partecipanti}
      <button onClick={aumenta}>Aumenta</button>
      <button onClick={diminuisci}>Diminuisci</button>
      <ToastContainer />
    </>
  )
}

export default Partecipanti_manual