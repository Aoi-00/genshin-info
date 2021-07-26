import { Redirect, Switch, Route } from 'react-router-dom';
import {
  IonApp,
  IonAvatar,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendar, ellipse, map, people, square, triangle } from 'ionicons/icons';
import team from './assets/party-setup.jpg';
import Tab1 from './pages/Tab1';
import Build from './pages/Build';
import Tab3 from './pages/Tab3';
import Map from './pages/Map';
import Teams from './pages/Teams';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Switch>
          <Route exact path="/tab1" component={Tab1} />
          <Redirect exact from="/" to="/tab1"  />
         
          
          <Route exact path="/tab3" component={Tab3}/>
          <Route exact path="/teams/:teamid/:id/dmg" component={Tab3}/>

          <Route exact path="/map" component={Map}/>

          <Route exact path="/teams" component={Teams}/>
          <Route exact path="/teams/:teamid/:id" component={Build}/>

          <Route render={() => <h1>Not Found</h1>} />
          </Switch>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={calendar} />
            <IonLabel>Dailies</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/teams">
            <IonIcon icon={people}> </IonIcon>
            <IonLabel>Teams</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
          <IonTabButton tab="map" href="/map">
            <IonIcon icon={map} />
            <IonLabel>Map</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
