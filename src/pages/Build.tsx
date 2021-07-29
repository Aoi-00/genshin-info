import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Build.css';
import DmgCalculator from '../components/StatsCalc';

import React, { Component } from 'react'
import Weapon from '../components/Weapon';
import Character from '../components/Character';
import Artifacts from '../components/Artifacts';
import { happyOutline } from 'ionicons/icons';

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
    weap: '',
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

      if (JSON.parse(retrievedObject).weap.length !== 0) {
        console.log(JSON.parse(retrievedObject))
        this.setState({
          weap: JSON.parse(retrievedObject).weap,
          refine: JSON.parse(retrievedObject).refine,
          weapLvl: JSON.parse(retrievedObject).weapLvl,
        })
      }

      // if (JSON.parse(retrievedObject).flower.length !== 0) {
      //   console.log(JSON.parse(retrievedObject))
      //   this.setState({
      //     flower: JSON.parse(retrievedObject).flower
      //   })
          
      // } 

      // if (JSON.parse(retrievedObject).feather.length !== 0) {
      //   console.log(JSON.parse(retrievedObject))
      //   this.setState({
      //     feather: JSON.parse(retrievedObject).feather
      //   })

      // }

      // if (JSON.parse(retrievedObject).cup.length !== 0) {
      //   console.log(JSON.parse(retrievedObject))
      //   this.setState({
      //     cup: JSON.parse(retrievedObject).cup
      //   })

      // }

      // if (JSON.parse(retrievedObject).sand.length !== 0) {

      //   console.log(JSON.parse(retrievedObject))
      //   this.setState({
      //     sand: JSON.parse(retrievedObject).sand
      //   })

      // }

      // if (JSON.parse(retrievedObject).head.length !== 0) {  
      //   console.log(JSON.parse(retrievedObject))
      //   this.setState({
      //     head: JSON.parse(retrievedObject).head
      //   })

      // }

      this.setState({
        char: JSON.parse(retrievedObject).char,

      })
    }
  }

  componentWillUnmount() {
    if (Object.keys(this.state.char).length !== 0) {
      let data = {
        char: this.state.char,
        weap: this.state.weap,
        refine: this.state.refine,
        weapLvl: this.state.weapLvl,
        flower: this.state.flower,
        feather: this.state.feather,
        cup: this.state.cup,
        sand: this.state.sand,
        head: this.state.head

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
      if (charInfo.name !== "Aether") {
        let char = new genshin.Character(charInfo.name.toLowerCase().replace(" ", ""), 90, false, 0);
        this.setState({
          buildChar: char
        })
      }
      else {
        let char = new genshin.Character('me_geo', 90, false, 0);
        this.setState({
          buildChar: char
        })
      }
    }

    if (this.state.weap !== prevState.weap) {
      let selectedWep: any = this.state.weap;
      if (selectedWep) {
        this.setState({
          weap: selectedWep
        })
      }
    }

    if (this.state.weap !== prevState.weap || this.state.refine !== prevState.refine || this.state.weapLvl !== prevState.weapLvl) {
      try {
        //To add choice for ascension of wep name, level, ascend,refine
        let name;
        switch (this.state.weap) {
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
            name = this.state.weap.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            break;
          }
        }
        let wep = new genshin.Weapon(name, this.state.weapLvl, false, parseInt(this.state.refine.replace("r", ""), 10))
        this.setState({
          buildWeap: wep
        })
      }
      catch (err) {
        alert("Weapon details not out yet, please choose another.")
      }
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

  Navigate = (teamid: string, id: string) => {
    this.props.history.push('/teams/' + teamid + '/' + id + '/dmg')
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
              <IonTitle size="large">Damage Calculator</IonTitle>
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
            <DmgCalculator char={this.state.char} attribute={this.state.buildAttributes} navigate={this.Navigate} />
          </div>

        </IonContent>
      </IonPage>
    )
  }
}
