import { IonContent, IonHeader, IonItem, IonInput, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, IonItemDivider, IonLabel, IonToggle } from '@ionic/react';
import { Component } from 'react';

import Talents from '../components/Talents';
import './Tab3.css';

const genshindb = require('genshin-db');
const genshin = require("genshin_panel");

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

    let config = { //always assumes set effect is activated, and at max effect
      configBraveHeart: {
        rate: 1, //full Bonus
      },
      configInstructor: {
        rate: 1, //full Bonus
      },
      configBerserker: {
        rate: 1, //full Bonus
      },
      configMartialArtist: {
        rate: 1, //full Bonus
      },
      configCrimsonWitch: {
        level: 3 //max level
      },
      configBlizzardStrayer: {
        criticalBonus: 0.4
      },
      configBloodstainedChivalry: {
        rate: 1, //full Bonus
      },
      configNoblesseOblige: {
        rate: 1, //full Bonus
      },
      configHeartOfDepth: {
        rate: 1, //full Bonus
      },
      // ConfigArchaicPetra: {
      //   element:,
      //   rate: 1
      // }
      configPaleFlame: {
        level: 2,
        rate: 1
      },
      configRetracingBolide: {
        rate: 1, //full Bonus
      },
      configThunderSmoother: {
        rate: 1, //full Bonus
      },
      configTenacityOfTheMillelith: {
        rate: 1, //full Bonus
      },
      configLavaWalker: {
        rate: 1, //full Bonus
      },
      configMaidenBeloved: {
        rate: 1, //full Bonus
      },
      configShimenawaReminiscence: {
        rate: 1, //full Bonus
      },
    }

    let art1 = new genshin.ArtifactBuilder()
      .setName("crimsonWitch")      // 如雷的盛怒
      .position("flower")             // 生之花
      .mainTag("lifeStatic", 4780)
      .tag("critical", 0.066)
      .tag("criticalDamage", 0.241)
      .tag("attackStatic", 16)
      .tag("defendStatic", 19)
      .build()
    let art2 = new genshin.ArtifactBuilder()
      .setName("crimsonWitch")      // 如雷的盛怒
      .position("feather")             // 生之花
      .mainTag("attackStatic", 311)
      .tag("critical", 0.062)
      .tag("criticalDamage", 0.249)
      .tag("recharge", 0.065)
      .tag("defendStatic", 35)
      .build()
    let art3 = new genshin.ArtifactBuilder()
      .setName("crimsonWitch")      // 如雷的盛怒
      .position("sand")             // 生之花
      .mainTag("recharge", 0.518)
      .tag("attackPercentage", 0.105)
      .tag("criticalDamage", 0.14)
      .tag("attackStatic", 16)
      .tag("defendStatic", 53)
      .build()
    let art4 = new genshin.ArtifactBuilder()
      .setName("crimsonWitch")      // 如雷的盛怒
      .position("cup")             // 生之花
      .mainTag("fireBonus", 0.466)
      .tag("critical", 0.031)
      .tag("criticalDamage", 0.194)
      .tag("attackPercentage", 0.152)
      .tag("defendStatic", 42)
      .build()
    let art5 = new genshin.ArtifactBuilder()
      .setName("crimsonWitch")      // 如雷的盛怒
      .position("head")             // 生之花
      .mainTag("criticalDamage", 0.622)
      .tag("critical", 0.058)
      .tag("elementalMastery", 40)
      .tag("attackStatic", 39)
      .tag("defendStatic", 37)
      .build()
    let testchar = new genshin.Character("bennett", 90, false, 5);
    let testWeap = new genshin.Weapon("primordialjadecutter", 90, false, 1);
    let test = new genshin.AttributeBuilder()
      .character(testchar)
      .weapon(testWeap)
      .artifactsConfig(config)
      .artifact(art1)
      .artifact(art2)
      .artifact(art3)
      .artifact(art4)
      .artifact(art5)
      .build()


    this.setState({
      attr: test
    })

    var retrievedObject = localStorage.getItem(this.props.location.pathname.slice(0, -4));
    if (retrievedObject !== null) {
      this.setState({
        char: JSON.parse(retrievedObject).char
      })
    }

  }

  // componentDidUpdate(){
  //   console.log(this.state.char)
  // }

  handleChange = (e: any) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    //console.log(this.state)
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
