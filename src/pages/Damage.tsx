import { IonContent, IonHeader, IonItem, IonInput, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/react';
import { Component } from 'react';
import Mob from '../components/Mob';

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
    charLvl: "1",
    enemyLvl: "1",
    DMGReduction:1
  }

  componentDidMount() {
    var retrievedObject = localStorage.getItem(this.props.location.pathname.slice(0, -4));
    if (retrievedObject !== null) {
      this.setState({
        char: JSON.parse(retrievedObject).char,
        attr: JSON.parse(retrievedObject).buildAttributes,
        charLvl: JSON.parse(retrievedObject).charLvl,
      })
    }
    var enemyLvl = localStorage.getItem("enemyLvl")
    if (enemyLvl !== null) {
      this.setState({enemyLvl: enemyLvl})
    }
  }

  componentDidUpdate(prevProps: any, prevState: any, prevSnapShot: any) {
    if (this.state.enemyLvl !== prevState.enemyLvl || this.state.charLvl !== prevState.charLvl) {
      if (this.state.enemyLvl.length !== 0) {
        var DMGReduction = (Number(this.state.charLvl) + 100) / (Number(this.state.charLvl) + Math.max(1,Number(this.state.enemyLvl)) + 200);
        this.setState({DMGReduction: DMGReduction})
      }
    }
  }

  componentWillUnmount(){
    if (this.state.enemyLvl.length !== 0){
      localStorage.setItem('enemyLvl',this.state.enemyLvl)
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
          <Mob handleChange={this.handleChange} charLvl={this.state.charLvl} enemyLvl={this.state.enemyLvl} />
          <Talents char={this.state.char} attribute={this.state.attr} level={this.state.level} DMGReduction={this.state.DMGReduction}/>
          <IonItem>
            <IonInput id="level" value={this.state.level} placeholder="Enter Input" onIonChange={this.handleChange} clearInput></IonInput>
          </IonItem>
        </IonContent>
      </IonPage>
    );
  }
};

export default Tab3;
