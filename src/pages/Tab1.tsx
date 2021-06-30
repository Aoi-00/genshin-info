import {  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonGrid, IonCol } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import React, { Component } from 'react';
import Materials from '../components/Materials';
import Dates from '../components/Dates';


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
    //console.log(`${e.detail.value} segment selected`)
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Daily Mats</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 1</IonTitle>
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

