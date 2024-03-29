import { IonAvatar, IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Dailies.css';
import React, { Component } from 'react';
import Materials from '../components/Dailies/Materials';
import Dates from '../components/Dailies/Dates';
import paimon from '../assets/paimonTrans.jpeg'


var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = new Date();
const dayName = days[today.getDay()];

export default class Tab1 extends Component {

  state = {
    date: '',
    today: dayName
  }

  componentDidMount() {
    this.setState({
      date: "Today"
    })
  }

  onChange = (e: any) => {
    this.setState({
      [e.target.id]: e.detail.value
    })
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonAvatar slot="end" style={{ width: '2em', height: '2em', margin: '1rem' }}>
              <IonImg src={paimon} />
            </IonAvatar>
            <IonTitle>Daily Mats</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Daily Mats</IonTitle>
            </IonToolbar>
          </IonHeader>

          <div className="dailyMats">
            <Dates date={this.state.date} handleChange={this.onChange} />
            <Materials date={this.state.date} today={this.state.today} />
          </div>

        </IonContent>
      </IonPage>
    )
  }
}

