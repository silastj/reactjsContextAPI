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

function Login({nome, setNome, saldo, setSaldo}) {
  const history = useHistory() 

  const nextPage = () => {
    if(nome !== '' && saldo !== 0){
      console.log('nome', nome)
      console.log('saldo', saldo)
      console.log('useHistory ', history)
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
    </Container>
  )
};

export default Login;