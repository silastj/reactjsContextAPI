import { Container } from './styles';
import { memo, useContext, useMemo, } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCarrinhoContext } from 'common/context/Carrinho'
import { UsuarioContext } from 'common/context/Usuario';

function Produto({
  nome,
  foto,
  id,
  valor,
  unidade,
  quantidade
}) {
  const {carrinho, addProduct, removeProduct, newTotalProducts} = useCarrinhoContext()
  const ProductUnitsCarrinho = carrinho.find(itemCarrinho => itemCarrinho.id === id)
  const { saldo = 0 } = useContext(UsuarioContext);
  const total = useMemo(() => saldo - newTotalProducts, [saldo, newTotalProducts])
    return (
      <Container>
        <div>
          <img
            src={`/assets/${foto}.png`}
            alt={`foto de ${nome}`}
          />
          <p>
            {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
          </p>
        </div>
        <div>
          <IconButton
            color="secondary"
            onClick={() => {removeProduct(id)}}
            disabled={!ProductUnitsCarrinho}
          >
            <RemoveIcon />
          </IconButton>
         {ProductUnitsCarrinho?.quantidade || 0}
          <IconButton 
            color="primary"
            onClick={() => {addProduct({nome, foto, id, valor})}}
            disabled={total <= 0 }
          >
            <AddIcon/>
          </IconButton>
        </div>
      </Container>
  )
}

export default memo(Produto)