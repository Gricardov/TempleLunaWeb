import React from 'react'
import Inicio from './pages/inicio'
import Login from './pages/login'
import Admin from './pages/admin'
import SolicitudCritica from './pages/solicitud-critica'
import SolicitudDiseno from './pages/solicitud-diseno'
import PreparacionCritica from './pages/prep_critica'
import PreparacionDiseno from './pages/prep_diseno'
import PrevResultado from './pages/prev_resultado'
import TestResultado from './pages/test_resultado'
import Drawer from './componentes/drawer'
import { AuthProvider } from './context/AuthContext'
import { PrivateRoute } from './componentes/customRouter/privateRoute'
import { PublicRoute } from './componentes/customRouter/publicRoute'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

const App = () => {

  return (
    <AuthProvider>
      <Router>
        <Drawer />
        <Switch>
          <PublicRoute exact path="/" component={Inicio} />
          <PublicRoute exact path="/sol_critica" component={SolicitudCritica} />
          <PublicRoute exact path="/sol_diseno" component={SolicitudDiseno} />
          <PublicRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <PrivateRoute exact path="/prep_critica" component={PreparacionCritica} />
          <PrivateRoute exact path="/prep_diseno" component={PreparacionDiseno} />
          <Route exact path="/prev_resultado" component={PrevResultado} />
          <Route exact path="/test_resultado" component={TestResultado} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
