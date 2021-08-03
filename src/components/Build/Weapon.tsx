import { IonCard, IonItem, IonAvatar, IonLabel, IonCardContent, IonSelect, IonSelectOption, } from '@ionic/react'
import defaultimage from '../../assets/default.jpeg';
import React, { useEffect, useState } from 'react'
import './Weapon.css';
import { customActionSheetOptions } from '../customActionSheetOptions';
import threeStar from '../../data/3StarWep.json'

interface ContainerProps {
    handleChange: Function;
    weapon: string;
    refine: string;
    weapLvl: number;
    wepList: Array<any>;
}

const Weapon: React.FC<ContainerProps> = ({ handleChange, weapon, refine, weapLvl, wepList }) => {
    const genshindb = require('genshin-db');
    const [effect, setEffect] = useState("No Effect")
    let tempholder: any = { specialized: 0, attack: 0 }
    const [substat, setSubstat] = useState(tempholder)
    const [weap, setWeap] = useState(genshindb.weapons(weapon))

    useEffect(() => {
        if (weapon.length !== 0) {
            setWeap(genshindb.weapons(weapon));
            let tempWep = genshindb.weapons(weapon)
            if (Object.keys(tempWep).length !== 0) {
                let temp = tempWep.effect.replace(`{${0}}`, tempWep[refine][0]);
                for (let i = 0; i < tempWep[refine].length; i++) {
                    if (tempWep[refine].length === 1) {
                        setEffect(tempWep.effect.replace(`{${i}}`, tempWep[refine][i]))
                        return;
                    }
                    else {
                        if (i !== 0) {
                            temp = temp.replace(`{${i}}`, tempWep[refine][i])
                        }
                    }
                }
                setEffect(temp);
            }
        }
    }, [refine, weapon])

    useEffect(() => {
        if (weapon.length !== 0) {
            if (weapLvl !== null) {
                let tempWeap = genshindb.weapons(weapon).stats(weapLvl);
                setSubstat(tempWeap)
            }
        }
    }, [weapLvl, weapon])

    return (
        <div>
            <IonCard>
                <IonItem>
                    <IonAvatar slot="start">
                        <img alt="" src={weap === undefined ? defaultimage : weap.images.icon} />
                    </IonAvatar>

                    <IonSelect
                        className="weaponSelect"
                        id="weap" value={weapon}
                        interfaceOptions={customActionSheetOptions}
                        interface="action-sheet"
                        placeholder="Select Weapon"
                        onIonChange={(e) => handleChange(e)}
                    >
                        {

                            wepList.filter(x => threeStar.every(wep => wep.name !== x.name)).map((eachWep) => {
                                return (
                                    <IonSelectOption key={eachWep.name} value={eachWep.name}> {eachWep.name} </IonSelectOption>
                                )
                            })
                        }
                    </IonSelect>

                </IonItem>

                <IonCardContent>
                    <div className="row">
                        <div className="block">
                            <IonLabel id="weapLvl" >Refinement: </IonLabel>
                            <IonSelect
                                style={{ 'marginRight': '0.2em' }}
                                id="refine" value={refine}
                                interfaceOptions={customActionSheetOptions}
                                interface="action-sheet"
                                placeholder="Select One"
                                onIonChange={(e) => handleChange(e)}
                            >
                                <IonSelectOption key={"r1"} value="r1"> r1 </IonSelectOption>
                                <IonSelectOption key={"r2"} value="r2"> r2 </IonSelectOption>
                                <IonSelectOption key={"r3"} value="r3"> r3 </IonSelectOption>
                                <IonSelectOption key={"r4"} value="r4"> r4 </IonSelectOption>
                                <IonSelectOption key={"r5"} value="r5"> r5 </IonSelectOption>
                            </IonSelect>
                        </div>
                        <div className="block">
                            < IonLabel id="weapLvl" >Level: </IonLabel>
                            <IonSelect
                                style={{ 'marginRight': '0.2em' }}
                                id="weapLvl" value={weapLvl}
                                interfaceOptions={customActionSheetOptions}
                                interface="action-sheet"
                                placeholder="Select One"
                                onIonChange={(e) => handleChange(e)}
                            >
                                {Array.from({ length: 90 }, (_, i) => i + 1).map((x) => {
                                    return (<IonSelectOption key={x} value={x}> {x} </IonSelectOption>)
                                })}
                            </IonSelect>
                        </div>
                        <div className="block">
                            <h3>Attack: {weapon.length ? (substat.attack).toFixed(1) : ""} </h3>
                        </div>
                    </div>
                    <h3> Substat: {weapon.length ? (weap?.substat === undefined ? "No substat" : weap.substat) : "Select a weapon"} {weapon && substat?.specialized !== null ? (substat.specialized < 1 ? (substat.specialized * 100).toFixed(1) : substat.specialized.toFixed(1)) : ''} </h3>
                    <h3> Effect: {weapon.length ? (effect?.length === 0 ? "No effect" : effect) : "Select a weapon"}</h3>

                </IonCardContent>
            </IonCard>
        </div >
    )
}
export default Weapon;