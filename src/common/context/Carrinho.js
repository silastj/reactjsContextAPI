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

  function addOrRemove(id, quantidade){
    return carrinho.map(itemDoCarrinho => {
      if(itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade
      return itemDoCarrinho
    })
  }

  function addProduct(newProduct) {
    const hasProduct = carrinho.some(itemCarrinho => itemCarrinho.id === newProduct.id)
    if(!hasProduct){
      newProduct.quantidade = 1
      return setCarrinho(carrinhoAnterior => 
        [...carrinhoAnterior, newProduct]
      )
    }
    setCarrinho(addOrRemove(newProduct.id, 1))    
  }

  function removeProduct(id){
    const product = carrinho.find(itemDoCarrinho => itemDoCarrinho.id === id)
    if(product !== undefined){
      const lastProduct = product.quantidade === 1
      if(lastProduct) {
        return setCarrinho(carrinhoAnterior => carrinhoAnterior.filter(itemDoCarrinho => itemDoCarrinho.id !== id))
      }
      if(product.quantidade >= 1){
        console.log('silas ',product.quantidade)
        setCarrinho(addOrRemove(id, -1))
      }
    }
  }
  return{
      carrinho,
      setCarrinho,
      addProduct,
      removeProduct
  }
}