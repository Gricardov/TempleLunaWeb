import React, { useContext } from 'react'
import Inicio from './pages/inicio'
import Login from './pages/login'
import SolicitudCritica from './pages/solicitud-critica'
import SolicitudDiseno from './pages/solicitud-diseno'
import Drawer from './componentes/drawer'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

const App = () => {

  return (
    <Router>
      <Drawer />
      <Switch>
        <Route exact path="/" component={Inicio} />
        <Route exact path="/sol_critica" component={SolicitudCritica} />
        <Route exact path="/sol_diseno" component={SolicitudDiseno} />
        <Route exact path="/login" component={Login} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
