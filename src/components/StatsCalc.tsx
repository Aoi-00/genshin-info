import React from 'react'
import { IonRow, IonCol, IonLabel, IonCard, IonCardContent, IonItem,  IonAvatar, IonButton, } from '@ionic/react'
import defaultimage from '../assets/default.jpeg';

const genshin = require("genshin_panel");
const genshindb = require('genshin-db');

interface ContainerProps {
    
    char: any;
    attribute:any;
} 

const DmgCalculator: React.FC<ContainerProps> = ({  char, attribute }) => {
    //console.log(attribute)
    
    let basicStats = [
        "lifeBasic", "lifePercentage", "lifeStatic",
        "critical", "criticalDamage",
        "attackBasic", "attackPercentage", "attackStatic",
        "defendBasic", "defendPercentage", "defendStatic",
        "elementalMastery", "recharge",
    ]
    
    let basicData: { [key: string]: any } = {}
    
    if (Object.keys(attribute).length !== 0){
        for (const stat of basicStats) {
            //console.log(stat) console.log(attribute[stat]
            basicData[stat] = stat.includes("critical") || stat.includes("recharge") ? attribute[stat] * 100 :attribute[stat]
        }
    }
    
    let statNames = [
        "fireBonus", "fireRes", "iceBonus", "iceRes",
        "physicalBonus", "thunderBonus", "thunderRes", "waterBonus", "waterRes", "windBonus", "windRes",
        "rockBonus", "rockRes", "shield",
        "swirlEnhance", "swirlFireEnhance", "swirlIceEnhance", "swirlThunderEnhance", "swirlWaterEnhance",
        "meltEnhance", "overloadEnhance", "superconductEnhance", "vaporizeEnhance",
        "burningEnhance", "electroEnhance"
    ]
    let elementalData: { [key: string]: any } = {}
    if (Object.keys(attribute).length !== 0){
        for (const stat of statNames) {
            //console.log(stat) console.log(attribute[stat]
            elementalData[stat] = attribute[stat] * 100
        }
    }
    
    
    

//     { let art1 = new genshin.ArtifactBuilder()
//     .setName("crimsonWitch")      // 如雷的盛怒
//     .position("flower")             // 生之花
//     .mainTag("lifeStatic", 4780)
//     .tag("critical", 0.066)
//     .tag("criticalDamage", 0.241)
//     .tag("attackStatic", 16)
//     .tag("defendStatic", 19)
//     .build()
//     let art2 = new genshin.ArtifactBuilder()
//     .setName("crimsonWitch")      // 如雷的盛怒
//     .position("feather")             // 生之花
//     .mainTag("attackStatic", 311)
//     .tag("critical", 0.062)
//     .tag("criticalDamage", 0.249)
//     .tag("recharge", 0.065)
//     .tag("defendStatic", 35)
//     .build()
//     let art3 = new genshin.ArtifactBuilder()
//     .setName("crimsonWitch")      // 如雷的盛怒
//     .position("sand")             // 生之花
//     .mainTag("recharge", 0.518)
//     .tag("attackPercentage", 0.105)
//     .tag("criticalDamage", 0.14)
//     .tag("attackStatic", 16)
//     .tag("defendStatic", 53)
//     .build()
//     let art4 = new genshin.ArtifactBuilder()
//     .setName("crimsonWitch")      // 如雷的盛怒
//     .position("cup")             // 生之花
//     .mainTag("fireBonus", 0.466)
//     .tag("critical", 0.031)
//     .tag("criticalDamage", 0.194)
//     .tag("attackPercentage", 0.152)
//     .tag("defendStatic", 42)
//     .build()
//     let art5 = new genshin.ArtifactBuilder()
//     .setName("crimsonWitch")      // 如雷的盛怒
//     .position("head")             // 生之花
//     .mainTag("criticalDamage", 0.622)
//     .tag("critical", 0.058)
//     .tag("elementalMastery", 40)
//     .tag("attackStatic", 39)
//     .tag("defendStatic", 37)
//     .build()
//     let testchar = new genshin.Character("bennett", 90, false, 5);
//     let testWeap = new genshin.Weapon("primordialjadecutter", 90, false, 1);
//     let test = new genshin.AttributeBuilder()
//     .character(testchar)
//     .weapon(testWeap)
//     .artifact(art1)
//     .artifact(art2)
//     .artifact(art3)
//     .artifact(art4)
//     .artifact(art5)
//     .build()
//     console.log(test, attribute)}
    
// ;

    return (
        <div>
            
            

            <IonCard>
                <IonItem>
                    <IonAvatar slot="start">
                        <img alt="" src={Object.keys(char).length === 0 ? defaultimage : char.images.icon}></img>
                    </IonAvatar>
                    <IonLabel>{Object.keys(char).length === 0 ? "Choose character" : char.name}</IonLabel>
                    
                </IonItem>

                <IonCardContent>
                    <h2>Base Stats</h2>
                    <IonRow>
                        {Object.keys(attribute).length === 0 ? "No Details" : Object.keys(basicData).map((stat) => {
                            return (
                                <IonCol key={stat} size="6">
                                    <IonItem lines="full">
                                        <IonLabel className="ion-text-wrap"><h4>{`${stat}: ${Math.round(basicData[stat])}`}</h4></IonLabel>
                                    </IonItem>
                                </IonCol>
                            )
                        })}
                    </IonRow>

                    <h2>Elemental Type</h2>
                    <IonRow>
                        {Object.keys(attribute).length === 0 ? "No Details" : Object.keys(elementalData).map((stat) => {
                            if (elementalData[stat]){
                                return (
                                    <IonCol key={stat} size="6">
                                        <IonItem lines="full">
                                            <IonLabel className="ion-text-wrap"><h4>{`${stat}: ${elementalData[stat].toFixed(1)}`}</h4></IonLabel>
                                        </IonItem>
                                    </IonCol>
                                )
                            }
                            
                        })}
                    </IonRow>
                </IonCardContent>
            </IonCard>

        </div>

    )
}
export default DmgCalculator;