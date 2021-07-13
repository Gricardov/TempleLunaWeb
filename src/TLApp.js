import React from 'react';
import Inicio from './pages/inicio';
import Login from './pages/login';
import Suscripcion from './pages/suscripcion';
import Perfil from './pages/perfil';
import Admin from './pages/admin';
import SolicitudCritica from './pages/solicitud-critica';
import SolicitudDiseno from './pages/solicitud-diseno';
import SolicitudCorreccion from './pages/solicitud-correccion';
import InscripcionEvento from './pages/ins_evento';
import PreparacionCritica from './pages/prep_critica';
import PreparacionCorreccion from './pages/prep_correccion';
import PreparacionDiseno from './pages/prep_diseno';
import PrevResultado from './pages/prev_resultado';
import Drawer from './componentes/drawer';
import HelmetMetaData from './componentes/helmet';
import { AnyRoute } from './componentes/customRouter/anyRoute';
import { PrivateRoute } from './componentes/customRouter/privateRoute';
import { PublicRoute } from './componentes/customRouter/publicRoute';
import { Router, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const App = () => {

  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <Drawer />
      <HelmetMetaData />
      <Switch>
        <PublicRoute exact path="/" component={Inicio} />
        <PublicRoute exact path="/sol_critica" component={SolicitudCritica} />
        <PublicRoute exact path="/sol_diseno" component={SolicitudDiseno} />
        <PublicRoute exact path="/sol_correccion" component={SolicitudCorreccion} />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/suscripcion" component={Suscripcion} />
        <PublicRoute exact path="/suscripcion/:id" component={Suscripcion} />
        <PrivateRoute exact path="/admin" component={Admin} />
        <PrivateRoute exact path="/prep_critica" component={PreparacionCritica} />
        <PrivateRoute exact path="/prep_diseno" component={PreparacionDiseno} />
        <PrivateRoute exact path="/prep_correccion" component={PreparacionCorreccion} />
        <AnyRoute exact path="/perfil/:id" component={Perfil} />
        <AnyRoute exact path="/ins_evento/:id" component={InscripcionEvento} />
        <AnyRoute exact path="/prev_resultado" component={PrevResultado} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
