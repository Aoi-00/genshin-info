import { IonAvatar, IonBackButton, IonButtons, IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Build.css';
import StatsCalc from '../components/Build/StatsCalc';

import React, { Component } from 'react'
import Weapon from '../components/Build/Weapon';
import Character from '../components/Build/Character';
import Artifacts from '../components/Build/Artifacts';
import { config } from '../components/config';

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
    featherData:{},
    flowerData:{},
    sandData: {},
    cupData: {},
    headData: {},
    weap: '',
    char: {},
    refine: 'r1',
    weapLvl: 1,
    charLvl:'20',
    charConst:0,

    feather: {},
    flower: {},
    sand: {},
    cup: {},
    head: {},
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
        this.setState({
          weap: JSON.parse(retrievedObject).weap,
          refine: JSON.parse(retrievedObject).refine,
          weapLvl: JSON.parse(retrievedObject).weapLvl,
        })
      }

      if (Object.keys(JSON.parse(retrievedObject).flowerData).length !== 0) {
        this.setState({
          flowerData: JSON.parse(retrievedObject).flowerData
        })

      }

      if (Object.keys(JSON.parse(retrievedObject).featherData).length !== 0) {
        this.setState({
          featherData: JSON.parse(retrievedObject).featherData
        })
      }

      if (Object.keys(JSON.parse(retrievedObject).cupData).length !== 0) {
        this.setState({
          cupData: JSON.parse(retrievedObject).cupData
        })
      }

      if (Object.keys(JSON.parse(retrievedObject).sandData).length !== 0) {
        this.setState({
          sandData: JSON.parse(retrievedObject).sandData
        })
      }

      if (Object.keys(JSON.parse(retrievedObject).headData).length !== 0) {  
        this.setState({
          headData: JSON.parse(retrievedObject).headData
        })
      }

      this.setState({
        char: JSON.parse(retrievedObject).char,
        charLvl:JSON.parse(retrievedObject).charLvl,
        charConst:JSON.parse(retrievedObject).charConst
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
        charLvl:this.state.charLvl,
        charConst:this.state.charConst,
        flowerData: this.state.flowerData,
        featherData: this.state.featherData,
        cupData: this.state.cupData,
        sandData: this.state.sandData,
        headData: this.state.headData,
        buildAttributes:this.state.buildAttributes
      }
      localStorage.setItem(this.props.location.pathname, JSON.stringify(data))
    }
  }

  componentDidUpdate(prevProp: any, prevState: any, snapShot: any) {
    if (this.state.flowerData !== prevState.flowerData && Object.keys(this.state.flowerData).length !== 0){
      let data: any = this.state.flowerData
      this.buildArti(data.mainStat,data.stat1,data.stat2,data.stat3,data.stat4,data.set,data.position)
    }

    if (this.state.featherData !== prevState.featherData && Object.keys(this.state.featherData).length !== 0){
      let data: any = this.state.featherData
      this.buildArti(data.mainStat,data.stat1,data.stat2,data.stat3,data.stat4,data.set,data.position)
    }

    if (this.state.sandData !== prevState.sandData && Object.keys(this.state.sandData).length !== 0){
      let data: any = this.state.sandData
      this.buildArti(data.mainStat,data.stat1,data.stat2,data.stat3,data.stat4,data.set,data.position)
    }

    if (this.state.cupData !== prevState.cupData && Object.keys(this.state.cupData).length !== 0){
      let data: any = this.state.cupData
      this.buildArti(data.mainStat,data.stat1,data.stat2,data.stat3,data.stat4,data.set,data.position)
    }

    if (this.state.headData !== prevState.headData && Object.keys(this.state.headData).length !== 0){
      let data: any = this.state.headData
      this.buildArti(data.mainStat,data.stat1,data.stat2,data.stat3,data.stat4,data.set,data.position)
    }

    if ((this.state.char !== prevState.char && Object.keys(this.state.char).length !== 0) || (this.state.charConst !== prevState.charConst) || (this.state.charLvl !== prevState.charLvl) ) {
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
      let name;
      if (charInfo.name === "Aether") {name = "me_geo"}
      else name = charInfo.name
        let char = new genshin.Character(name.toLowerCase().replace(" ", ""), this.state.charLvl.replace("+",""), this.state.charLvl.includes("+"), this.state.charConst);
        this.setState({
          buildChar: char
        })
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
        alert("Unable to build weapon, please choose another.")
      }
    }

    if (this.state.buildWeap !== prevState.buildWeap || this.state.flower !== prevState.flower || this.state.feather !== prevState.feather || this.state.sand !== prevState.sand || this.state.cup !== prevState.cup || this.state.head !== prevState.head || this.state.buildChar !== prevState.buildChar) {
      try {
        if (![this.state.flower, this.state.feather, this.state.cup, this.state.head, this.state.sand, this.state.buildWeap, this.state.buildChar].some(o => Object.keys(o).length === 0)) {
          let attribute = new genshin.AttributeBuilder()
            .character(this.state.buildChar)
            .weapon(this.state.buildWeap)
            .artifactsConfig(config)
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
      catch (err) {
        alert("Please check your artifact inputs")
        console.log(err)
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

  updateArtiData = (mainStat: Stat, stat1: Stat, stat2: Stat, stat3: Stat, stat4: Stat, set: any, position: string) => {
    let tempName = `${position}Data`
    this.setState({
      [tempName]: {
        mainStat: mainStat,
        stat1: stat1,
        stat2: stat2,
        stat3: stat3,
        stat4: stat4,
        set: set,
        position: position
      }
    })
  }
  buildArti = (mainStat: Stat, stat1: Stat, stat2: Stat, stat3: Stat, stat4: Stat, set: any, position: string) => {
    if (set) {
      try {
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
          case "Thundersoother": {
            name = "thunderSmoother";
            break;
          }
          default: {
            name = this.camelize(set.name.replace("'s", ""));
            break;
          }
        }

        let arti = new genshin.ArtifactBuilder()
          .setName(name)
          .position(position)
          .mainTag(mainStat.statType, isNaN(["Bonus", "critical", "Percentage", "recharge","cure"].some(substring => mainStat.statType.includes(substring)) ? parseFloat(mainStat.statValue) / 100 : parseFloat(mainStat.statValue)) ? 0 : ["Bonus", "critical", "Percentage", "recharge","cure"].some(substring => mainStat.statType.includes(substring)) ? parseFloat(mainStat.statValue) / 100 : parseFloat(mainStat.statValue))
          .tag(stat1.statType, isNaN(["critical", "Percentage", "recharge"].some(substring => stat1.statType.includes(substring)) ? parseFloat(stat1.statValue) / 100 : parseFloat(stat1.statValue)) ? 0 : ["critical", "Percentage", "recharge"].some(substring => stat1.statType.includes(substring)) ? parseFloat(stat1.statValue) / 100 : parseFloat(stat1.statValue))
          .tag(stat2.statType, isNaN(["critical", "Percentage", "recharge"].some(substring => stat2.statType.includes(substring)) ? parseFloat(stat2.statValue) / 100 : parseFloat(stat2.statValue)) ? 0 : ["critical", "Percentage", "recharge"].some(substring => stat2.statType.includes(substring)) ? parseFloat(stat2.statValue) / 100 : parseFloat(stat2.statValue))
          .tag(stat3.statType, isNaN(["critical", "Percentage", "recharge"].some(substring => stat3.statType.includes(substring)) ? parseFloat(stat3.statValue) / 100 : parseFloat(stat3.statValue)) ? 0 : ["critical", "Percentage", "recharge"].some(substring => stat3.statType.includes(substring)) ? parseFloat(stat3.statValue) / 100 : parseFloat(stat3.statValue))
          .tag(stat4.statType, isNaN(["critical", "Percentage", "recharge"].some(substring => stat4.statType.includes(substring)) ? parseFloat(stat4.statValue) / 100 : parseFloat(stat4.statValue)) ? 0 : ["critical", "Percentage", "recharge"].some(substring => stat4.statType.includes(substring)) ? parseFloat(stat4.statValue) / 100 : parseFloat(stat4.statValue))
          .build()
          ;
        this.setState({
          [position]: arti
        })

        
      }
      catch (err) {
        alert("Cannot build artifact. Please check your artifact input.")
      }
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
            <IonAvatar slot="end" style={{ width: '2em', height: '2em', margin: '1rem' }}>
              <IonImg src={""} />
            </IonAvatar>
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
            <Artifacts handleChange={this.updateArtiData} position={"flower"} data={this.state.flowerData}/>
            <Artifacts handleChange={this.updateArtiData} position={"feather"} data={this.state.featherData} />
            <Artifacts handleChange={this.updateArtiData} position={"sand"} data={this.state.sandData} />
            <Artifacts handleChange={this.updateArtiData} position={"cup"}  data={this.state.cupData}/>
            <Artifacts handleChange={this.updateArtiData} position={"head"}  data={this.state.headData}/>
          </div>

          <div>
            <StatsCalc handleChange={this.onChange} char={this.state.char} attribute={this.state.buildAttributes} navigate={this.Navigate} charLvl={this.state.charLvl} charConst = {this.state.charConst} />
          </div>

        </IonContent>
      </IonPage>
    )
  }
}
