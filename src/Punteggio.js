import { Button, ButtonGroup, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useGiocatori } from "./GiocatoriContext"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Punteggio() {

    const { giocatori, aggiungiPunteggio, sottraiPunteggio } = useGiocatori()


    const sottrai = (giocatore, punteggioDaDiminuire = 1) => {
            sottraiPunteggio(giocatore.id, punteggioDaDiminuire)
    }

  return (
    <Container className="mt-3">
           <h2 className="mt-5 mb-3" style={{textAlign:'center'}}>Punteggio</h2>
        <ListGroup style={{textAlign:'center'}}>
            {giocatori.map((giocatore) => (
                <ListGroup.Item key={giocatore.id}>
                <Row style={{maxWidth: '1000px', margin: '0 auto'}}>
                    <Col xs={3}>{giocatore.nome}</Col>
                    <Col xs={3}>{giocatore.punteggio}</Col>
                    <Col>
                            <ButtonGroup>
                            <Button variant="success" onClick={() => aggiungiPunteggio(giocatore.id)}>+</Button>
                            <Button variant="warning" onClick={() => sottrai(giocatore)}>-</Button>
                            </ButtonGroup>
                    </Col>
                </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
        <ToastContainer />
    </Container>
  )
}

export default Punteggio