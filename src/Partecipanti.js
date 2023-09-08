import React, { useState } from "react";
import { GiocatoriProvider, useGiocatori } from "./GiocatoriContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, FloatingLabel, Form, ListGroup, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";

function Partecipanti() {

  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [punteggio, setPunteggio] = useState(0);

  const { giocatori, aggiungiGiocatore, cancellaGiocatore } = useGiocatori();

  const handleAggiungiGiocatore = () => {
    if (nome.trim() !== "") {
      let giocatore_aggiunto = aggiungiGiocatore(nome, punteggio);
      if (!giocatore_aggiunto) {
        toast.error("Impossibile aggiungere 2 giocatori con lo stesso nome", {
          position: "bottom-center",
        });
      }
      setNome("");
      setPunteggio(0);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleAggiungiGiocatore()
  }

  const navigateToStart = () => {
    navigate('/play')
  }

  const handleSetName = (playerName) => {
    if(playerName.length > 8){
      toast.error("Hai superato il massimo di caratteri consentito", {
        position: "bottom-center",
      }) 
      } else {
        setNome(playerName)
      }
    }

  return (
    <Container>
      <h1 className="mb-3 mt-3">Partecipanti</h1>
      <Form onSubmit={(e) => handleFormSubmit(e)}>

      <FloatingLabel
        controlId="floatingInput"
        label="Aggiungi giocatore (max 8 ch.)"
        className="mb-3"
        >
        <Form.Control type="text" placeholder="Sergio" value={nome}
        onChange={(e) => handleSetName(e.target.value)} />
      </FloatingLabel>
 
      <Button disabled={!nome} type="submit" className="mb-5" onClick={handleAggiungiGiocatore}>Aggiungi Giocatore</Button>
      </Form>
      
      <h2 className="mb-3 mb-3">Lista dei Giocatori:</h2>
      <ListGroup className="mb-3" style={{textAlign:'center'}}>
        {giocatori.map((giocatore, index) => (
          <ListGroup.Item key={index}>
            <Row>
            <Col><div className="mt-1">{giocatore.nome}</div></Col>
            <Col><div className="mt-1">{giocatore.punteggio}</div></Col>
            <Col><Button className="ms-5" variant="warning" onClick={()=> cancellaGiocatore(giocatore.id)}><FaTrash /></Button></Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="success" disabled={giocatori.length < 2} onClick={navigateToStart}>Avvia gioco</Button>
      <ToastContainer />
    </Container>
  );
}

export default Partecipanti;
