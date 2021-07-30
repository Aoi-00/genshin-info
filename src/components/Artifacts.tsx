
import { IonCard, IonCardContent, IonItem, IonButton, IonAvatar, IonSelect, IonSelectOption, IonInput, IonRow, IonCol } from '@ionic/react'
import defaultimage from '../assets/default.jpeg';
import React, { useState } from 'react';
import './Artifacts.css';

interface ContainerProps {
    handleChange: Function;
    position: string;
}
const customActionSheetOptions = {
    header: 'Options',
    subHeader: 'Select your choice'
};

type Stat = {
    statType: string,
    statValue: string
}


const Artifacts: React.FC<ContainerProps> = ({ handleChange, position }) => {
    const genshindb = require('genshin-db');
    const [artiList, setartiList] = useState(genshindb.artifacts('name', { matchCategories: true }));
    const [mainStat, setMainStat] = useState({} as Stat);
    const [stat1, setStat1] = useState({} as Stat);
    const [stat2, setStat2] = useState({} as Stat);
    const [stat3, setStat3] = useState({} as Stat);
    const [stat4, setStat4] = useState({} as Stat);
    const [set, setArtiSet] = useState<any>({});

    let slot: string;
    switch (position) {
        case "feather": {
            slot = 'plume';
            break;
        }
        case "sand": {
            slot = 'sands';
            break;
        }
        case "cup": {
            slot = 'goblet';
            break;
        }
        case "head": {
            slot = 'circlet';
            break;
        }
        default: {
            slot = position;
            break;
        }
    }


    return (

        <div>
            <IonCard>
                <IonItem>
                    <IonAvatar slot="start">
                        <img alt="" src={Object.keys(set).length === 0 ? defaultimage : set.images[slot]} />
                    </IonAvatar>
                    <IonButton onClick={(e) => handleChange(mainStat, stat1, stat2, stat3, stat4, set, position)}
                        fill="outline" slot="end">Build</IonButton>
                    <IonSelect
                        className="artiSelect"
                        id="flower" value={set}
                        interfaceOptions={customActionSheetOptions}
                        interface="action-sheet"
                        placeholder="Select Artifact"
                        onIonChange={(e) => setArtiSet((e.target as HTMLSelectElement).value)}
                    >
                        {
                            artiList.map((eachArti: any) => {
                                if (eachArti !== "Glacier and Snowfield" && eachArti !== "Prayers to the Firmament") {
                                    let arti = genshindb.artifacts(eachArti);
                                    return (
                                        <IonSelectOption key={arti.name} value={arti}> {arti.name} </IonSelectOption>
                                    )
                                }
                            }
                            )
                        }
                    </IonSelect>
                </IonItem>
                <IonCardContent>

                    <IonItem>
                        <IonSelect
                            className="artiSelect"
                            id="mainStat" value={mainStat?.statType}
                            interfaceOptions={customActionSheetOptions}
                            interface="action-sheet"
                            placeholder="Main Stat"
                            onIonChange={(e) => setMainStat({ ...mainStat, statType: (e.target as unknown as HTMLInputElement).value })}
                        >
                            {(slot !== "goblet") ? <div><IonSelectOption value={'critical'}> Crit </IonSelectOption>
                                <IonSelectOption value={'criticalDamage'}> Crit DMG </IonSelectOption>
                                <IonSelectOption value={'attackStatic'}> ATK </IonSelectOption>
                                <IonSelectOption value={'attackPercentage'}> ATK% </IonSelectOption>
                                <IonSelectOption value={'defendPercentage'}> DEF% </IonSelectOption>
                                <IonSelectOption value={'recharge'}> Energy Recharge </IonSelectOption>
                                <IonSelectOption value={'elementalMastery'}> EM </IonSelectOption>
                                <IonSelectOption value={'lifeStatic'}> HP </IonSelectOption>
                                <IonSelectOption value={'lifePercentage'}> HP% </IonSelectOption></div>
                                : <div>
                                    <IonSelectOption value={'elementalMastery'}> EM </IonSelectOption>
                                    <IonSelectOption value={'attackPercentage'}> ATK% </IonSelectOption>
                                    <IonSelectOption value={'defendPercentage'}> DEF% </IonSelectOption>
                                    <IonSelectOption value={'lifePercentage'}> HP% </IonSelectOption>
                                    <IonSelectOption value={'waterBonus'}> Hydro Bonus </IonSelectOption>
                                    <IonSelectOption value={'fireBonus'}> Pyro Bonus </IonSelectOption>
                                    <IonSelectOption value={'iceBonus'}> Cryo Bonus </IonSelectOption>
                                    <IonSelectOption value={'windBonus'}> Anemo Bonus </IonSelectOption>
                                    <IonSelectOption value={'rockBonus'}> Geo Bonus </IonSelectOption>
                                    <IonSelectOption value={'thunderBonus'}> Electro Bonus </IonSelectOption>
                                    <IonSelectOption value={'physicalBonus'}> Phys Bonus </IonSelectOption>
                                </div>
                            }

                        </IonSelect>
                        <IonInput type="number" value={mainStat?.statValue} placeholder="Enter" onIonChange={e => setMainStat({
                            ...mainStat, statValue: (e.target as unknown as HTMLInputElement).value
                        })}></IonInput>

                    </IonItem>

                    <IonRow >
                        <IonCol size="6" className="stats">
                            <IonItem>
                                <IonSelect
                                    className="artiSelect"
                                    id="stat1" value={stat1?.statType}
                                    interfaceOptions={customActionSheetOptions}
                                    interface="action-sheet"
                                    placeholder="Stat 1"
                                    onIonChange={(e) => setStat1({ ...stat1, statType: (e.target as unknown as HTMLInputElement).value })}
                                >
                                    <IonSelectOption value={'critical'}> Crit </IonSelectOption>
                                    <IonSelectOption value={'criticalDamage'}> Crit DMG </IonSelectOption>
                                    <IonSelectOption value={'attackStatic'}> ATK </IonSelectOption>
                                    <IonSelectOption value={'attackPercentage'}> ATK% </IonSelectOption>
                                    <IonSelectOption value={'defendStatic'}> DEF </IonSelectOption>
                                    <IonSelectOption value={'defendPercentage'}> DEF% </IonSelectOption>
                                    <IonSelectOption value={'recharge'}> Energy Recharge </IonSelectOption>
                                    <IonSelectOption value={'elementalMastery'}> EM </IonSelectOption>
                                    <IonSelectOption value={'lifeStatic'}> HP </IonSelectOption>
                                    <IonSelectOption value={'lifePercentage'}> HP% </IonSelectOption>
                                </IonSelect>
                                <IonInput type="number" value={stat1?.statValue} placeholder="Enter" onIonChange={e => setStat1({
                                    ...stat1, statValue: (e.target as unknown as HTMLInputElement).value
                                })}></IonInput>

                            </IonItem>
                        </IonCol>
                        <IonCol size="6" className="stats">
                            <IonItem>
                                <IonSelect
                                    className="artiSelect"
                                    id="stat2" value={stat2?.statType}
                                    interfaceOptions={customActionSheetOptions}
                                    interface="action-sheet"
                                    placeholder="Stat 2"
                                    onIonChange={(e) => setStat2({ ...stat2, statType: (e.target as unknown as HTMLInputElement).value })}
                                >
                                    <IonSelectOption value={'critical'}> Crit </IonSelectOption>
                                    <IonSelectOption value={'criticalDamage'}> Crit DMG </IonSelectOption>
                                    <IonSelectOption value={'attackStatic'}> ATK </IonSelectOption>
                                    <IonSelectOption value={'attackPercentage'}> ATK% </IonSelectOption>
                                    <IonSelectOption value={'defendStatic'}> DEF </IonSelectOption>
                                    <IonSelectOption value={'defendPercentage'}> DEF% </IonSelectOption>
                                    <IonSelectOption value={'recharge'}> Energy Recharge </IonSelectOption>
                                    <IonSelectOption value={'elementalMastery'}> EM </IonSelectOption>
                                    <IonSelectOption value={'lifeStatic'}> HP </IonSelectOption>
                                    <IonSelectOption value={'lifePercentage'}> HP% </IonSelectOption>
                                </IonSelect>
                                <IonInput type="number" value={stat2?.statValue} placeholder="Enter" onIonChange={e => setStat2({
                                    ...stat2, statValue: (e.target as unknown as HTMLInputElement).value
                                })}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size="6" className="stats">
                            <IonItem>
                                <IonSelect
                                    className="artiSelect"
                                    id="stat1"
                                    interfaceOptions={customActionSheetOptions}
                                    interface="action-sheet"
                                    placeholder="Stat 3"
                                    onIonChange={(e) => setStat3({ ...stat3, statType: (e.target as unknown as HTMLInputElement).value })}
                                >
                                    <IonSelectOption value={'critical'}> Crit </IonSelectOption>
                                    <IonSelectOption value={'criticalDamage'}> Crit DMG </IonSelectOption>
                                    <IonSelectOption value={'attackStatic'}> ATK </IonSelectOption>
                                    <IonSelectOption value={'attackPercentage'}> ATK% </IonSelectOption>
                                    <IonSelectOption value={'defendStatic'}> DEF </IonSelectOption>
                                    <IonSelectOption value={'defendPercentage'}> DEF% </IonSelectOption>
                                    <IonSelectOption value={'recharge'}> Energy Recharge </IonSelectOption>
                                    <IonSelectOption value={'elementalMastery'}> EM </IonSelectOption>
                                    <IonSelectOption value={'lifeStatic'}> HP </IonSelectOption>
                                    <IonSelectOption value={'lifePercentage'}> HP% </IonSelectOption>
                                </IonSelect>
                                <IonInput type="number" value={stat3?.statValue} placeholder="Enter" onIonChange={e => setStat3({
                                    ...stat3, statValue: (e.target as unknown as HTMLInputElement).value
                                })}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size="6" className="stats">
                            <IonItem>
                                <IonSelect
                                    className="artiSelect"
                                    id="stat1"
                                    interfaceOptions={customActionSheetOptions}
                                    interface="action-sheet"
                                    placeholder="Stat 4"
                                    onIonChange={(e) => setStat4({ ...stat4, statType: (e.target as unknown as HTMLInputElement).value })}
                                >
                                    <IonSelectOption value={'critical'}> Crit </IonSelectOption>
                                    <IonSelectOption value={'criticalDamage'}> Crit DMG </IonSelectOption>
                                    <IonSelectOption value={'attackStatic'}> ATK </IonSelectOption>
                                    <IonSelectOption value={'attackPercentage'}> ATK% </IonSelectOption>
                                    <IonSelectOption value={'defendStatic'}> DEF </IonSelectOption>
                                    <IonSelectOption value={'defendPercentage'}> DEF% </IonSelectOption>
                                    <IonSelectOption value={'recharge'}> Energy Recharge </IonSelectOption>
                                    <IonSelectOption value={'elementalMastery'}> EM </IonSelectOption>
                                    <IonSelectOption value={'lifeStatic'}> HP </IonSelectOption>
                                    <IonSelectOption value={'lifePercentage'}> HP% </IonSelectOption>
                                </IonSelect>
                                <IonInput type="number" value={stat4?.statValue} placeholder="Enter" onIonChange={e => setStat4({
                                    ...stat4, statValue: (e.target as unknown as HTMLInputElement).value
                                })}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonCardContent>
            </IonCard>

        </div >
    )
}

export default Artifacts