import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRange, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { Component } from 'react'
import flowerMainStats from '../data/flower.json'
import plumeMainStats from '../data/plume.json'
import artifactSubStats from '../data/substats.json'
import defaultImage from '../assets/default.jpeg'

class Artifact extends Component {
    state = {
        fiveStarArtifact: [],
        currentArtifacts: [
            {
                "mainStatsName": "HP",
                "mainStatsVal": 717,
                "image": defaultImage,
                "level": 0,
                "sub1Name": "",
                "sub1val": "",
                "sub2Name": "",
                "sub2val": "",
                "sub3Name": "",
                "sub3val": "",
                "sub4Name": "",
                "sub4val": "",
            },
            {
                "mainStatsName": "ATK",
                "mainStatsVal": 47,
                "image": defaultImage,
                "level": 0,
                "sub1Name": "",
                "sub1val": "",
                "sub2Name": "",
                "sub2val": "",
                "sub3Name": "",
                "sub3val": "",
                "sub4Name": "",
                "sub4val": ""
            },
            {
                "mainStatsName": "ATK",
                "mainStatsVal": 47,
                "image": defaultImage,
                "level": 0,
                "sub1Name": "",
                "sub1val": "",
                "sub2Name": "",
                "sub2val": "",
                "sub3Name": "",
                "sub3val": "",
                "sub4Name": "",
                "sub4val": ""
            },
            {
                "mainStatsName": "ATK",
                "mainStatsVal": 47,
                "image": defaultImage,
                "level": 0,
                "sub1Name": "",
                "sub1val": "",
                "sub2Name": "",
                "sub2val": "",
                "sub3Name": "",
                "sub3val": "",
                "sub4Name": "",
                "sub4val": ""
            },
            {
                "mainStatsName": "ATK",
                "mainStatsVal": 47,
                "image": defaultImage,
                "level": 0,
                "sub1Name": "",
                "sub1val": "",
                "sub2Name": "",
                "sub2val": "",
                "sub3Name": "",
                "sub3val": "",
                "sub4Name": "",
                "sub4val": ""
            }
        ]
    }
    componentDidMount() {
        this.getArtifactList()
    }
    getArtifactList = () => {
        let arr: any = []
        const genshindb = require('genshin-db');
        var fiveStarList = genshindb.artifacts('5', { matchCategories: true })
        fiveStarList.forEach((x: any) => arr.push(genshindb.artifacts(x)))
        this.setState({ fiveStarArtifact: [...arr] })
    }
    selectArtifact = (image: any, artifactIndex: number) => {
        let buffer = [...this.state.currentArtifacts]
        if (artifactIndex == 0)
            buffer[artifactIndex].image = image.flower
        else if (artifactIndex == 1)
            buffer[artifactIndex].image = image.plume
        else if (artifactIndex == 2)
            buffer[artifactIndex].image = image.sands
        else if (artifactIndex == 3)
            buffer[artifactIndex].image = image.goblet
        else if (artifactIndex == 4)
            buffer[artifactIndex].image = image.circlet
        this.setState({ currentArtifacts: buffer })
    }
    changeLevel = (val: number, artifactIndex: number) => {
        let buffer = [...this.state.currentArtifacts]
        let flowerStats: any = flowerMainStats
        let plumeStats: any = plumeMainStats
        buffer[artifactIndex].level = val

        if (artifactIndex == 0)
            buffer[artifactIndex].mainStatsVal = flowerStats.HP['level' + val]
        else if (artifactIndex == 1)
            buffer[artifactIndex].mainStatsVal = plumeStats.ATK['level' + val]
        this.setState({ currentArtifacts: buffer })
    }
    changeSubStats = (substat: any, artifactIndex: number, subStatIndex: number) => {
        let buffer: any = [...this.state.currentArtifacts]
        buffer[artifactIndex]['sub' + subStatIndex + 'Name'] = substat['val']
        this.setState({ currentArtifacts: buffer })
        console.log(this.state)
    }
    handleChange = (value: any, artifactIndex: number, subStatIndex: number) => {
        let buffer: any = [...this.state.currentArtifacts]
        buffer[artifactIndex]['sub' + subStatIndex + 'val'] = value
        this.setState({ currentArtifacts: buffer })
        console.log(this.state)
    }
    Calculate = () => {
        alert("Insert Formula here")
        //us the this.state.currentArtifacts to do all the calculation
    }

    render() {
        let artifactDropDownList = this.state.fiveStarArtifact.map((x: any) => <IonSelectOption key={x.name} value={x.images}> {x.name} </IonSelectOption>)
        let flowerStats: any = flowerMainStats
        let plumeStats: any = plumeMainStats
        let subStats = artifactSubStats.map((x: any) => <IonSelectOption key={x.val} value={x}> {x.subStats} </IonSelectOption>)

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/teams" />
                        </IonButtons>
                        <IonTitle>Artifact</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Artifact</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonRow>
                        {this.state.currentArtifacts && this.state.currentArtifacts.map((z: any, i: number) => {
                            return (
                                <IonCard>
                                    <IonItem>
                                        <IonAvatar slot="start">
                                            <img alt="" src={z.image} />
                                        </IonAvatar>
                                        <IonButton
                                            fill="outline" slot="end">Build</IonButton>
                                        <IonSelect
                                            className="artiSelect"
                                            id="flower"
                                            interface="action-sheet"
                                            placeholder="Select Artifact"
                                            onIonChange={(e: any) => this.selectArtifact(e.target.value, i)}
                                        >
                                            {artifactDropDownList}
                                        </IonSelect>
                                    </IonItem>
                                    <IonItem>
                                        <IonRange pin={true} min={0} max={20} value={z.level} onIonChange={(e: any) => this.changeLevel(e.target.value, i)} />
                                        <br />
                                    </IonItem>
                                    {(i == 0) && <IonItem>
                                        HP: {flowerStats.HP['level' + z.level]} | Level: {z.level}
                                    </IonItem>}
                                    {(i == 1) && <IonItem>
                                        ATK: {plumeStats.ATK['level' + z.level]} | Level: {z.level}
                                    </IonItem>}
                                    {Array.from({ length: 4 }, (() => 10)).map((x: any, k: number) => {
                                        return (
                                            <IonCol size="6" className="stats">
                                                <IonItem>
                                                    <IonSelect
                                                        className="artiSelect"
                                                        id="stat1"
                                                        placeholder={"Stat " + ++k}
                                                        onIonChange={(e: any) => this.changeSubStats(e.target.value, i, ++k)}
                                                    >
                                                        {subStats}
                                                    </IonSelect>
                                                    <IonInput type="number" onIonInput={(e: any) => this.handleChange(e.target.value, i, ++k)} onIonChange={(e: any) => this.handleChange(e.target.value, i, ++k)} placeholder="Enter" ></IonInput>
                                                </IonItem>
                                            </IonCol>
                                        )
                                    })}
                                </IonCard>
                            )
                        })}
                    </IonRow>
                    <IonButton onClick={this.Calculate}>Calculate</IonButton>
                </IonContent>
            </IonPage>
        )
    }
}
export default Artifact