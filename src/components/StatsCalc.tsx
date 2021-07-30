import React from 'react'
import { IonRow, IonCol, IonLabel, IonCard, IonCardContent, IonItem,  IonAvatar, IonButton, } from '@ionic/react'
import defaultimage from '../assets/default.jpeg';
import { useLocation } from 'react-router';

interface ContainerProps {
    
    char: any;
    attribute:any;
    navigate: Function;
} 

const DmgCalculator: React.FC<ContainerProps> = ({  char, attribute, navigate }) => {
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
    
    let location = useLocation();
    let team = location.pathname.charAt(7);
    let id = location.pathname.charAt(9);

    return (
        <div>
            
            

            <IonCard>
                <IonItem>
                    <IonAvatar slot="start">
                        <img alt="" src={Object.keys(char).length === 0 ? defaultimage : char.images.icon}></img>
                    </IonAvatar>
                    <IonLabel>{Object.keys(char).length === 0 ? "Choose character" : char.name}</IonLabel>
                    <IonButton onClick={(e)=> {navigate(team,id)}} fill="outline" slot="end">View More</IonButton>
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