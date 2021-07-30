import { IonContent, IonHeader, IonItem, IonInput, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, IonItemDivider, IonLabel, IonToggle } from '@ionic/react';
import { Component } from 'react';

import Talents from '../components/Talents';
import './Damage.css';


interface userProps {
  history: any;
  location: any
}


class Tab3 extends Component<userProps> {
  state = {
    level: "1",
    attr: {},
    char: {},
  }

  componentDidMount() {
    var retrievedObject = localStorage.getItem(this.props.location.pathname.slice(0, -4));
    if (retrievedObject !== null) {
      this.setState({
        char: JSON.parse(retrievedObject).char,
        attr: JSON.parse(retrievedObject).buildAttributes
      })
    }
  }

  handleChange = (e: any) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Damage</IonTitle>
            <IonButtons slot="start">
              <IonBackButton defaultHref={this.props.location.pathname.slice(0, -4)} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Damage</IonTitle>
            </IonToolbar>
          </IonHeader>
          <Talents char={this.state.char} attribute={this.state.attr} level={this.state.level} />
          <IonItem>
            <IonInput id="level" value={this.state.level} placeholder="Enter Input" onIonChange={this.handleChange} clearInput></IonInput>
          </IonItem>
        </IonContent>
      </IonPage>
    );
  }
};

export default Tab3;
