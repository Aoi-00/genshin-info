import { IonAvatar, IonItem, IonRow, IonSegment, IonSegmentButton, IonToast } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { MDBCol } from "mdbreact";
import anemo from '../../assets/anemo.jpg'
import geo from '../../assets/geo.jpg'
import cryo from '../../assets/cryo.jpg'
import pyro from '../../assets/pyro.jpg'
import hydro from '../../assets/hydro.jpg'
import electro from '../../assets/electro.jpg'
import dendro from '../../assets/dendro.jpg'
import { useLocation } from 'react-router';

const genshindb = require('genshin-db');

interface ContainerProps {
    handleChange: Function;
}


const Character: React.FC<ContainerProps> = ({ handleChange }) => {
    const usePrevious = (value: any) => {
        const ref = React.useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    const location = useLocation();
    const [ele, setEle] = useState('');
    const [charList, setCharList] = useState(genshindb.characters(ele, { matchCategories: true }))
    const [showToast1, setShowToast1] = useState(false);
    const [charName, setChar] = useState("");
    useEffect(() => {
        if (ele === 'geo' || ele === 'anemo' || ele === 'electro') {
            let list = genshindb.characters(ele, { matchCategories: true });
            list.push("Aether")
            setCharList(list)
            return charList;
        }
        setCharList(genshindb.characters(ele, { matchCategories: true }))
        return charList;
    }, [ele])

    useEffect(() => {
        const localRepoItems = localStorage.getItem(location.pathname + "/ele");
        if (localRepoItems) {
            setEle(JSON.parse(localRepoItems));
        }
    }, [])

    const prevEle: any = usePrevious(ele);
    useEffect(() => {
        if (prevEle?.length !== ele.length) {
            localStorage.setItem(location.pathname + "/ele", JSON.stringify(ele));
        }
    }, [ele]);

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
                                    <IonAvatar onClick={(e) => { handleChange(charInfo, e); setChar(charInfo.name); setShowToast1(true); }} >
                                        <img id={'char'} alt="" src={charInfo.images.icon} />
                                    </IonAvatar>
                                    <IonToast
                                        isOpen={showToast1}
                                        onDidDismiss={() => setShowToast1(false)}
                                        message={`${charName} selected.`}
                                        duration={200}
                                    />
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

