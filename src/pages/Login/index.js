import { Button } from '@material-ui/core';
import {
  Container,
  Titulo,
  InputContainer
} from './styles';
import {
  Input,
  InputLabel,
  InputAdornment
} from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import { UsuarioContext } from 'common/context/Usuario'
import { useContext } from 'react'
import { Alert } from '@material-ui/lab';
import { useState } from 'react';

function Login() {
  const history = useHistory()
  const {nome, setNome, saldo, setSaldo} = useContext(UsuarioContext)
  const [ alert, setAlert] = useState(false)

  const nextPage = () => {
    if (nome !== '' && saldo !== 0) {
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, "1000")
      setTimeout(() => {
        history.push('/feira')
      }, "2500")
    }
  }

  return (
    <Container>
            <Titulo>
              Insira o seu nome
            </Titulo>
            <InputContainer>
              <InputLabel>
                Nome
              </InputLabel>
              <Input
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                type="text"
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>
                Saldo
              </InputLabel>
              <Input
                value={saldo}
                onChange={(event) => setSaldo(event.target.value)}
                type="number"
                startAdornment={
                  <InputAdornment position="start">
                    R$
                  </InputAdornment>
                }
              />
            </InputContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={nextPage}
            >
              Avançar
            </Button>
            {alert &&
              <Alert severity="success">O seu nome é: {nome}, com saldo total de R$ {saldo}. </Alert>
            }
    </Container>
  )
};

export default Login;