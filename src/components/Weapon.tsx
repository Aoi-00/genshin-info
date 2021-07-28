import { IonCard, IonItem, IonAvatar, IonLabel, IonCardContent, IonSelect, IonSelectOption,  } from '@ionic/react'
import defaultimage from '../assets/default.jpeg';
import React, { useEffect, useState } from 'react'
import './Weapon.css';


interface ContainerProps {
    handleChange: Function;
    weapon: any;
    refine: string;
    weapLvl: number;
    wepList: Array<any>;
}

const customActionSheetOptions = {
    header: 'Options',
    subHeader: 'Select your choice'
};

const Weapon: React.FC<ContainerProps> = ({ handleChange, weapon, refine, weapLvl, wepList }) => {
    const genshindb = require('genshin-db');
    const [effect, setEffect] = useState("No Effect")
    let tempholder: any = { specialized: 0, attack: 0 }
    const [substat, setSubstat] = useState(tempholder)

    useEffect(() => {
        if (Object.keys(weapon).length !== 0) {
            let temp = weapon.effect.replace(`{${0}}`, weapon[refine][0]);
            for (let i = 0; i < weapon[refine].length; i++) {
                if (weapon[refine].length === 1) {
                    setEffect(weapon.effect.replace(`{${i}}`, weapon[refine][i]))
                    return;
                }
                else {
                    if (i !== 0) {
                        temp = temp.replace(`{${i}}`, weapon[refine][i])
                    }
                }
            }
            setEffect(temp);
        }
    }, [refine, weapon])

    useEffect(() => {
        if (Object.keys(weapon).length !== 0) {
            if (weapLvl !== null) {
                let tempWeap = genshindb.weapons(weapon.name).stats(weapLvl);
                setSubstat(tempWeap)
            }
        }
    }, [weapLvl])

    return (
        <div>
            <IonCard>
                <IonItem>
                    <IonAvatar slot="start">
                        <img alt="" src={Object.keys(weapon).length === 0 ? defaultimage : weapon.images.icon} />
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

                            wepList.map((eachWep) => {
                                return (
                                    <IonSelectOption key={eachWep.name} value={eachWep}> {eachWep.name} </IonSelectOption>
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
                                <IonSelectOption key={"r3"}  value="r3"> r3 </IonSelectOption>
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
                            <h3>Attack: {weapon ? (substat.attack).toFixed(1) : ""} </h3>
                        </div>
                    </div>
                    <h3> Substat: {weapon ? (weapon?.substat === undefined ? "No substat" : weapon.substat) : "Select a weapon"} {weapon && substat?.specialized !== null ? (substat.specialized < 1 ? (substat.specialized * 100).toFixed(1) : substat.specialized.toFixed(1)) : ''} </h3>
                    <h3> Effect: {weapon ? (effect?.length === 0 ? "No effect" : effect) : "Select a weapon"}</h3>

                </IonCardContent>
            </IonCard>
        </div >
    )
}
export default Weapon;