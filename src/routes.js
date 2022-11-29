import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UsuarioProvider } from "common/context/Usuario";
import { CarrinhoProvider } from "common/context/Carrinho";
import { PagamentoProvider } from "common/context/Pagamento";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <UsuarioProvider>
          <CarrinhoProvider>
          <Route exact path="/">
              <Login/>
          </Route>
            <PagamentoProvider>
              <Route exact path="/feira">
                <Feira />
              </Route>
              <Route exact path="/carrinho">
                <Carrinho />
              </Route>
            </PagamentoProvider>
          </CarrinhoProvider>
        </UsuarioProvider>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
