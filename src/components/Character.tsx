import { IonAvatar, IonItem, IonRow, IonSegment, IonSegmentButton } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { MDBCol } from "mdbreact";
import anemo from '../assets/anemo.jpg'
import geo from '../assets/geo.jpg'
import cryo from '../assets/cryo.jpg'
import pyro from '../assets/pyro.jpg'
import hydro from '../assets/hydro.jpg'
import electro from '../assets/electro.jpg'
import dendro from '../assets/dendro.jpg'

const genshindb = require('genshin-db');

//console.log(elements);
interface ContainerProps {
    handleChange: Function;
}


const Character: React.FC<ContainerProps> = ({ handleChange }) => {
    const [ele, setEle] = useState('anemo');
    const [charList, setCharList] = useState(genshindb.characters(ele, { matchCategories: true }))
    useEffect(() => {
        if (ele === 'geo' || ele === 'anemo' || ele === 'electro') {
            let list = genshindb.characters(ele, { matchCategories: true });
            setCharList(list)
            return charList;
        }
        setCharList(genshindb.characters(ele, { matchCategories: true }))
        return charList;
    }, [ele])

    return (
        <div>
            <IonItem>
                <IonSegment scrollable={true} onIonChange={(e) => setEle(e.detail.value!)}>
                    <IonSegmentButton value="anemo">
                        <IonAvatar>
                            <img src={anemo} alt=""></img>
                        </IonAvatar>
                    </IonSegmentButton>
                    <IonSegmentButton value="geo">
                        <IonAvatar>
                            <img src={geo} alt="" ></img>
                        </IonAvatar>
                    </IonSegmentButton>
                    <IonSegmentButton value="pyro">
                        <IonAvatar>
                            <img src={pyro} alt=""></img>
                        </IonAvatar>
                    </IonSegmentButton>
                    <IonSegmentButton value="cryo">
                        <IonAvatar>
                            <img src={cryo} alt="" ></img>
                        </IonAvatar>
                    </IonSegmentButton>
                    <IonSegmentButton value="hydro">
                        <IonAvatar>
                            <img src={hydro} alt=""></img>
                        </IonAvatar>
                    </IonSegmentButton>
                    <IonSegmentButton value="electro">
                        <IonAvatar>
                            <img src={electro} alt=""></img>
                        </IonAvatar>
                    </IonSegmentButton>
                    <IonSegmentButton value="dendro">
                        <IonAvatar>
                            <img src={dendro} alt="" ></img>
                        </IonAvatar>
                    </IonSegmentButton>

                </IonSegment>
            </IonItem>
            {charList &&
                <IonItem>
                    <IonRow>
                        {charList && charList.map((eachChar: any) => {
                            var charInfo = genshindb.characters(eachChar);
                            return (
                                <MDBCol key={charInfo.name} size="auto">
                                    <IonAvatar onClick={(e) => handleChange(charInfo, e)} >
                                        <img id={'char'} alt="" src={charInfo.images.icon} />
                                    </IonAvatar>
                                </MDBCol>
                            )
                        })}
                    </IonRow>
                </IonItem>
            }

        </div>
    )
}
export default Character

