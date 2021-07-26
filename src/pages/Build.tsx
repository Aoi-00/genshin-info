import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Build.css';
import DmgCalculator from '../components/StatsCalc';

import React, { Component } from 'react'
import Weapon from '../components/Weapon';
import Character from '../components/Character';
import Artifacts from '../components/Artifacts';

const genshindb = require('genshin-db');
const genshin = require("genshin_panel");
type Stat = {
  statType: string,
  statValue: string
}
interface userProps {
  history: any;
  location: any
}
export default class Tab2 extends Component<userProps> {

  state = {
    feather: [],
    flower: [],
    sand: [],
    cup: [],
    head: [],
    weap: {},
    char: {},
    refine: 'r1',
    weapLvl: 1,

    allWep: [],
    wepList: [],
    buildWeap: {},
    buildChar: {},
    buildAttributes: {}
  }


  componentDidMount() {
    this.setState({
      allWep: genshindb.weapons('names', { matchCategories: true })
    })
    var retrievedObject = localStorage.getItem(this.props.location.pathname);
    if (retrievedObject !== null) {
      this.setState({
        char: JSON.parse(retrievedObject).char
      })
      //console.log('retrievedObject: ', JSON.parse(retrievedObject).char);
      // this.setState({
      //   feather: JSON.parse(retrievedObject).feather,
      //   flower: JSON.parse(retrievedObject).flower,
      //   sand: JSON.parse(retrievedObject).sand,
      //   cup: JSON.parse(retrievedObject).cup,
      //   head: JSON.parse(retrievedObject).head,
      //   weap: JSON.parse(retrievedObject).weap,
      //   char: JSON.parse(retrievedObject).char,
      //   refine: JSON.parse(retrievedObject).refine,
      //   weapLvl: JSON.parse(retrievedObject).weapLvl,
      // })


    }
  }

  componentWillUnmount() {
    //console.log(this.props.location)
    // let data = {
    //   feather: this.state.feather,
    //   flower: this.state.flower,
    //   sand: this.state.sand,
    //   cup: this.state.cup,
    //   head: this.state.head,
    //   weap: this.state.weap,
    //   char: this.state.char,
    //   refine: this.state.refine,
    //   weapLvl: this.state.weapLvl,
    // }
    // //console.log(data)
    // localStorage.setItem(this.props.location, JSON.stringify(data))

    if (Object.keys(this.state.char).length !== 0){
      let data = {
        char:this.state.char
      }
      localStorage.setItem(this.props.location.pathname, JSON.stringify(data))
    }   
  }

  componentDidUpdate(prevProp: any, prevState: any, snapShot: any) {
    if (this.state.char !== prevState.char && Object.keys(this.state.char).length !== 0) {
      let charInfo: any = this.state.char;
      var wepList: any[] = [];
      let tempWepList = genshindb.weapons(charInfo['weapontype'], { matchCategories: true })
      tempWepList.forEach((eachWep: any) => {
        var wepInfo = genshindb.weapons(eachWep)
        wepList.push(wepInfo)
      });
      this.setState({
        wepList: wepList
      })
      //name, level, ascended, const TODO: allow level,ascend,const changes
      if (charInfo.name !== "Aether"){
        let char = new genshin.Character(charInfo.name.toLowerCase().replace(" ", ""), 90, false, 0);
        this.setState({
          buildChar: char
        })
      }
      else {
        let char = new genshin.Character('me_geo',90,false,0);
        this.setState({
          buildChar: char
        })
      }

    }

    if (this.state.weap !== prevState.weap) {
      //console.log(this.state.refine)
      let selectedWep: any = this.state.weap;
      if (selectedWep) {
        this.setState({
          weap: selectedWep
        })
      }
    }

    if (this.state.weap !== prevState.weap || this.state.refine !== prevState.refine || this.state.weapLvl !== prevState.weapLvl) {
      //To add choice for ascension of wep name, level, ascend,refine
      let temp: any = this.state.weap;
      let name;
      switch (temp.name) {
        case ("Sacrificial Fragments"): {
          name = "scarificialfragments";
          break;
        }
        case ("Emerald Orb"): {
          name = "emeraldord";
          break;
        }
        case ("Favonius Codex"): {
          name = "favoniuscodes";
          break;
        }
        case ("Sword of Descension"): {
          name = "swordofdecension";
          break;
        }
        default: {
          name = temp.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
          break;
        }
      }
      let wep = new genshin.Weapon(name, this.state.weapLvl, false, parseInt(this.state.refine.replace("r", ""), 10))
      this.setState({
        buildWeap: wep
      })
      console.log(wep)
    }

    if (this.state.buildWeap !== prevState.buildWeap || this.state.flower !== prevState.flower || this.state.feather !== prevState.feather || this.state.sand !== prevState.sand || this.state.cup !== prevState.cup || this.state.head !== prevState.head || this.state.buildChar !== prevState.buildChar) {
      //console.log(this.state.buildChar)
      if (![this.state.flower, this.state.feather, this.state.cup, this.state.head, this.state.sand, this.state.buildWeap, this.state.buildChar].some(o => Object.keys(o).length === 0)) {
        let attribute = new genshin.AttributeBuilder()
          .character(this.state.buildChar)
          .weapon(this.state.buildWeap)
          .artifact(this.state.flower)
          .artifact(this.state.feather)
          .artifact(this.state.sand)
          .artifact(this.state.cup)
          .artifact(this.state.head)
          .build()
        this.setState({
          buildAttributes: attribute
        })
      }
    }
  }

  onChange = (e: any) => {
    if (e.target.id === 'weapLvl') {
      this.setState({
        [e.target.id]: parseInt(e.detail.value!, 10)
      })
    }
    else {
      this.setState({
        [e.target.id]: e.target.value
      })
    }
  }

  handleObject = (Info: any, e: any) => {
    //console.log(e, charInfo)
    this.setState({
      [e.target.id]: Info
    })
  }

  camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: string, index: number) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  handleArti = (mainStat: Stat, stat1: Stat, stat2: Stat, stat3: Stat, stat4: Stat, set: any, position: string) => {
    if (set) {
      let name;
      switch (set.name) {
        case "Crimson Witch of Flames": {
          name = "crimsonWitch";
          break;
        }
        case "Lavawalker": {
          name = "lavaWalker";
          break;
        }
        case "The Exile": {
          name = "exile";
          break;
        }
        case "Wanderer's Troupe": {
          name = "wandererTroupe";
          break;
        }
        default: {
          name = this.camelize(set.name);
          break;
        }
      }
      //substringsArray.some(substring=>yourBigString.includes(substring))
      let arti = new genshin.ArtifactBuilder()
        .setName(name)
        .position(position)
        .mainTag(mainStat.statType, ["Bonus", "critical", "Percentage", "recharge"].some(substring => mainStat.statType.includes(substring)) ? parseFloat(mainStat.statValue) / 100 : parseFloat(mainStat.statValue))
        .tag(stat1.statType, ["critical", "Percentage", "recharge"].some(substring => stat1.statType.includes(substring)) ? parseFloat(stat1.statValue) / 100 : parseFloat(stat1.statValue))
        .tag(stat2.statType, ["critical", "Percentage", "recharge"].some(substring => stat2.statType.includes(substring)) ? parseFloat(stat2.statValue) / 100 : parseFloat(stat2.statValue))
        .tag(stat3.statType, ["critical", "Percentage", "recharge"].some(substring => stat3.statType.includes(substring)) ? parseFloat(stat3.statValue) / 100 : parseFloat(stat3.statValue))
        .tag(stat4.statType, ["critical", "Percentage", "recharge"].some(substring => stat4.statType.includes(substring)) ? parseFloat(stat4.statValue) / 100 : parseFloat(stat4.statValue))
        .build()
        ;
      this.setState({
        [position]: arti
      })
    }

  }


  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/teams" />
            </IonButtons>
            <IonTitle>Damage Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 2</IonTitle>
            </IonToolbar>
          </IonHeader>

          <Character handleChange={this.handleObject} />

          <div>
            <Weapon handleChange={this.onChange} wepList={this.state.wepList} refine={this.state.refine} weapLvl={this.state.weapLvl} weapon={this.state.weap} />
          </div>

          <div>
            <Artifacts handleChange={this.handleArti} position={"flower"} />
            <Artifacts handleChange={this.handleArti} position={"feather"} />
            <Artifacts handleChange={this.handleArti} position={"cup"} />
            <Artifacts handleChange={this.handleArti} position={"sand"} />
            <Artifacts handleChange={this.handleArti} position={"head"} />
          </div>

          <div>
            <DmgCalculator char={this.state.char} attribute={this.state.buildAttributes} />
          </div>

        </IonContent>
      </IonPage>
    )
  }
}
