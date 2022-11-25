import { useContext, useEffect } from "react";
import { createContext, useState } from "react";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [quantitiesProducts, setQuantitiesProducts] = useState(0);
  const [newTotalProducts, setNewTotalProducts] = useState(0);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        setCarrinho,
        quantitiesProducts,
        setQuantitiesProducts,
        newTotalProducts,
        setNewTotalProducts,
      }}
    >
      {" "}
      {children}{" "}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinhoContext = () => {
  const {
    carrinho,
    setCarrinho,
    quantitiesProducts,
    setQuantitiesProducts,
    newTotalProducts,
    setNewTotalProducts
  } = useContext(CarrinhoContext);

  function addOrRemove(id, quantidade) {
    return carrinho.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
      return itemDoCarrinho;
    });
  }

  function addProduct(newProduct) {
    const hasProduct = carrinho.some(
      (itemCarrinho) => itemCarrinho.id === newProduct.id
    );
    if (!hasProduct) {
      newProduct.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        newProduct,
      ]);
    }
    setCarrinho(addOrRemove(newProduct.id, 1));
  }

  function removeProduct(id) {
    const product = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
    if (product !== undefined) {
      const lastProduct = product.quantidade === 1;
      if (lastProduct) {
        return setCarrinho((carrinhoAnterior) =>
          carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
        );
      }
      if (product.quantidade >= 1) {
        setCarrinho(addOrRemove(id, -1));
      }
    }
  }

  useEffect(() => {
    const { newTotal, newQuantities } = carrinho.reduce(
      (contador, produto) => ({
        newQuantities: contador.newQuantities + produto.quantidade,
        newTotal: contador.newTotal + produto.valor * produto.quantidade,
      }),
      {
        newQuantities: 0,
        newTotal: 0,
      }
    );
    setQuantitiesProducts(newQuantities);
    setNewTotalProducts(newTotal);
  }, [carrinho, setQuantitiesProducts, setNewTotalProducts]);

  return {
    carrinho,
    setCarrinho,
    addProduct,
    removeProduct,
    quantitiesProducts,
    newTotalProducts
  };
};
