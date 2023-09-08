import { useEffect, useRef, useState } from "react";
import { useGiocatori } from "./GiocatoriContext";
import { useNavigate } from "react-router-dom";
import Punteggio from "./Punteggio";
import { Accordion, Button, Card, Col, Container, Form, ProgressBar, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { vocali, consonanti } from "./lettere";


function Play() {

  const { giocatori, aggiungiPunteggio, sottraiPunteggio } = useGiocatori();
  const navigate = useNavigate();
  const [lettere, setLettere] = useState([])

  const [indiceGiocatoreAttivo, setindiceGiocatoreAttivo] = useState(0)
  const [giocatoreAttivo, setGiocatoreAttivo] = useState(giocatori[indiceGiocatoreAttivo])
  const [puntiDaTogliere, setPuntiDaTogliere] = useState(1)
  const [puntiTolti, setPuntiTolti] = useState(true)
  const [timeValue, setTimeValue] = useState(15);
  const [tempo, setTempo] = useState(15)


  useEffect(() => {
    if (giocatori.length < 2) {
      navigate("/partecipanti");
    }
  }, []);




  
  const handleConsentiRipetizioni = () => {
    setConsentiRipetizioni(!consentiRipetizioni)
  }


const cambiaTempo = (e) => {
  e.preventDefault();
  setPuntiTolti(true);
  stopProgressBar();
  setTempo(timeValue)
}



  const shuffleLettere = (listaLettere) => {
      const newArray = listaLettere; // Crea una copia dell'array originale
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Scambia gli elementi
      }
      return newArray;
    
  }



  const [consentiRipetizioni, setConsentiRipetizioni] = useState(true);

  const generaLettereCasuali = () => {
    const listaLettere = [];
    const consonantiUtilizzate = [];
    const vocaliUtilizzate = [];
  
    // Genera tre consonanti uniche e aggiungile alla lista
    for (let i = 0; i < 2; i++) {
      let consonanteCasuale;
      do {
        consonanteCasuale = consonanti[Math.floor(Math.random() * consonanti.length)];
      } while (consonantiUtilizzate.includes(consonanteCasuale));
  
      listaLettere.push(consonanteCasuale);
      consonantiUtilizzate.push(consonanteCasuale);
    }
  
    // Genera due vocali uniche e aggiungile alla lista
    for (let i = 0; i < 2; i++) {
      let vocaleCasuale;
      do {
        vocaleCasuale = vocali[Math.floor(Math.random() * vocali.length)];
      } while (vocaliUtilizzate.includes(vocaleCasuale));
  
      listaLettere.push(vocaleCasuale);
      vocaliUtilizzate.push(vocaleCasuale);
    }
  
    // Mescola l'array delle lettere
    listaLettere.sort(() => Math.random() - 0.5);
  
    return listaLettere;
  };
  

  const avviaGioco2 = () => {
    setPuntiTolti(false);
    setPuntiDaTogliere(1)
    let listaLettere = []
    if(!consentiRipetizioni){
      listaLettere = generaLettereCasuali();
    } else {
      listaLettere = [
        consonanti[Math.floor(Math.random() * consonanti.length)],
        consonanti[Math.floor(Math.random() * consonanti.length)],
        vocali[Math.floor(Math.random() * vocali.length)],
        vocali[Math.floor(Math.random() * vocali.length)],
      ]
    }
    listaLettere = shuffleLettere(listaLettere)
    setLettere(listaLettere)

    startProgressBar();
   
  };


const cambiaIndiceGiocatoreAttivo = () => {

  setindiceGiocatoreAttivo((prevIndex) => {
    // Verifica se l'indice supera la lunghezza dell'array dei giocatori
    if (prevIndex + 1 >= giocatori.length) {
      return 0; // Riporta l'indice a zero
    } else {
      return prevIndex + 1; // Altrimenti, incrementa l'indice
    }
  });
  }

useEffect(() => {
    setGiocatoreAttivo(giocatori[indiceGiocatoreAttivo]) 
}, [indiceGiocatoreAttivo])


 
  
/* PROGRESS BAR ------------------------------------------------------------------------------------------------------------------- */

const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);



  const startProgressBar = () => {
    stopProgressBar()
    setIsRunning(true);
    

    
    const newIntervalId = setInterval(() => {

      setProgress((prevProgress) => {

        if (prevProgress < tempo) {
          return prevProgress + 1; // Aumenta di 10 ogni 10 secondi

        } else {
            setIsRunning(false); // Ferma la progress bar
            setPuntiDaTogliere(prev => prev + 1);
            return tempo; // Riavvia la progress bar dopo aver raggiunto il 100%
          } 
      });
    }, 1000);
  
    setIntervalId(newIntervalId);
  };

  const correctAnswer = () => {
    aggiungiPunteggio(giocatoreAttivo.id,1)
    setIsRunning(true);
    cambiaIndiceGiocatoreAttivo();
    startProgressBar();
  }
  

  const wrongAnswer = () => {
    setPuntiTolti(true)
    sottraiPunteggio(giocatoreAttivo.id, puntiDaTogliere)
  }

  const stopProgressBar = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    setIsRunning(false);
    setProgress(0);
  };

 
  

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId, isRunning]);






  return (
    <>
      <Container className="mb-3 mt-3">

      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Gestisci impostazioni</Accordion.Header>
        <Accordion.Collapse eventKey="0">
          <Accordion.Body>
      <Form onSubmit={(e) => cambiaTempo(e)} className="mt-2">
      <Form.Group controlId="exampleNumber">
        <Form.Label>Durata turno</Form.Label>
        <Form.Control
          type="number"
          value={timeValue}
          onChange={(e) => setTimeValue(e.target.value)}
        />
      </Form.Group>
      <Button className="mt-3" type="submit">Cambia durata</Button>
    </Form>
    <Form className="mt-4">
    <Form.Check
        type="checkbox"
        label="Consenti ripetizioni lettere"
        checked={consentiRipetizioni}
        onChange={handleConsentiRipetizioni}
      />
    </Form>
    </Accordion.Body>
        </Accordion.Collapse>
        </Accordion.Item>
      </Accordion>

        <Punteggio />

        <div className="d-grid gap-2">
        <Button className="mb-3 mt-5" variant="success" onClick={avviaGioco2} size="lg">Nuove lettere</Button>
        </div>

        {lettere ? 
        <Row className="justify-content-center">
        {lettere.map((lettera, index) => (
          <Col key={index} className="mb-3" xs={6} sm={6} md={3}><Card className="front">{lettera}</Card></Col>
        ) 
          )}
        
        </Row>
        : <Col></Col>
        }
        Turno di: {giocatoreAttivo ? giocatoreAttivo.nome : 'Nessun giocatore attivo'}
        <div>Penalità per chi perde: {puntiDaTogliere}</div>
        <ProgressBar max={tempo} now={progress} label={`${progress}`} />
      <div style={{textAlign:'center'}}>
      <Button variant="primary" className="mt-3 mb-3 me-1" onClick={correctAnswer} disabled={puntiTolti}>
        Risposta esatta
      </Button>
      <Button variant="danger" className="mt-3 mb-3 ms-1" onClick={stopProgressBar} disabled={!isRunning}>
        Pausa
      </Button>
      {giocatoreAttivo ? (
              <Button variant="danger" className="mt-3 mb-3 ms-1" onClick={wrongAnswer} hidden={isRunning || puntiTolti}>
              Game Over {giocatoreAttivo.nome} - Togli {puntiDaTogliere} {puntiDaTogliere > 1 ? 'punti' : 'punto'}
            </Button>
      ): (
        <div></div>
      )}

        
        </div>  
      </Container>

    </>
  );
}

export default Play;
