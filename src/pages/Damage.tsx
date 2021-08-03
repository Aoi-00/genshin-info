import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, IonAvatar, IonImg } from '@ionic/react';
import { Component } from 'react';
import Mob from '../components/Mob';
import TalentDetails from '../components/TalentDetails';

import Talents from '../components/Talents';
import './Damage.css';


interface userProps {
  history: any;
  location: any
}


class Tab3 extends Component<userProps> {
  state = {
    attr: {},
    char: {},
    charLvl: "1",
    enemyLvl: "1",
    DMGReduction: 1,
    talent: [1, 1, 1]
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
    var data = localStorage.getItem(this.props.location.pathname)
    if (data !== null) {
      this.setState({
        enemyLvl: JSON.parse(data).enemyLvl,
        talent: JSON.parse(data).talent
      })
    }
  }

  componentDidUpdate(prevProps: any, prevState: any, prevSnapShot: any) {
    if (this.state.enemyLvl !== prevState.enemyLvl || this.state.charLvl !== prevState.charLvl) {
      if (this.state.enemyLvl.length !== 0) {
        var DMGReduction = (Number(this.state.charLvl.replace("+", "")) + 100) / (Number(this.state.charLvl.replace("+", "")) + Math.max(1, Number(this.state.enemyLvl)) + 200);
        this.setState({ DMGReduction: DMGReduction })
      }
    }
  }

  componentWillUnmount() {
    if (this.state.enemyLvl.length !== 0) {
      let data = {
        enemyLvl: this.state.enemyLvl,
        talent: this.state.talent
      }
      localStorage.setItem(this.props.location.pathname, JSON.stringify(data))
    }
  }

  handleChange = (e: any) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleTalent = (e: any, skill: number) => {
    let talent = this.state.talent;
    talent[skill] = e.target.value;
    this.setState({ talent: talent })
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonAvatar slot="end" style={{ width: '2em', height: '2em', margin: '1rem' }}>
              <IonImg src={""} />
            </IonAvatar>
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
          <Talents handleChange={this.handleTalent} char={this.state.char} attribute={this.state.attr} level={this.state.talent} DMGReduction={this.state.DMGReduction} />
          <TalentDetails char={this.state.char} />
        </IonContent>
      </IonPage>
    );
  }
};

export default Tab3;
