import { useContext } from 'react';
import { createContext, useState } from 'react'

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({children}) => {
  const [carrinho, setCarrinho] = useState([])
  return(
    <CarrinhoContext.Provider value={{carrinho, setCarrinho}}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export const useCarrinhoContext = () => {
  const {carrinho, setCarrinho } = useContext(CarrinhoContext)

  function addProduct(newProduct) {
    const hasProduct = carrinho.some(itemCarrinho => itemCarrinho.id === newProduct.id)
    if(!hasProduct){
      newProduct.quantidade = 1
      return setCarrinho(carrinhoAnterior => 
        [...carrinhoAnterior, newProduct]
      )
    }

    setCarrinho(carrinhoAnterior => carrinhoAnterior.map(itemCarrinho => {
      if(itemCarrinho.id === newProduct.id) itemCarrinho.quantidade += 1
      return itemCarrinho
    }))    
  }
  return{
      carrinho,
      setCarrinho,
      addProduct
  }
}