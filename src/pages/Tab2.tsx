import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import DmgCalculator from '../components/DmgCalculator';


import React, { Component } from 'react'

export default class Tab2 extends Component {

  state={
    arti:''
  }
  onChange = (e: any) => {
    this.setState({
      arti: e.detail.value
    })
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Damage Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 2</IonTitle>
            </IonToolbar>
          </IonHeader>


          <div>
            <DmgCalculator handleChange={this.onChange}/>
          </div>

          </IonContent>
          </IonPage>
    )
  }
}
