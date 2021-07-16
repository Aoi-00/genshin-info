import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { Component, useState } from 'react';

import ExploreContainer from '../components/ExploreContainer';
import Talents from '../components/Talents';
import './Tab3.css';

const genshindb = require('genshin-db');
const genshin = require("genshin_panel");

class Tab3 extends Component {

  state = {
    attr: {}
  }

  componentDidMount() {
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
      .artifact(art1)
      .artifact(art2)
      .artifact(art3)
      .artifact(art4)
      .artifact(art5)
      .build()
    

    this.setState({
      attr: test
    })
  }


  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 3</IonTitle>
            </IonToolbar>
          </IonHeader>

          <Talents char={"Bennett"} attribute={this.state.attr} />

          {/* <ExploreContainer name="Tab 3 page" /> */}
        </IonContent>
      </IonPage>
    );
  }



};

export default Tab3;
