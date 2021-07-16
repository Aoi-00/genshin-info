import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonCol, IonRow } from "@ionic/react";
import { pin, wifi, wine, warning, walk } from "ionicons/icons";
import { useEffect, useState } from "react";

const genshin = require("genshin_panel");
const genshindb = require('genshin-db');

interface ContainerProps {

    char: any;
    attribute: any;
}

function getParamName(label: string, occurence: number) {
    let index = 0;
    while (occurence > 0) {
        index = label.indexOf("param", index + 1);
        if (index === -1) return undefined;
        occurence--;
    }
    return label.substring(index, index + 6);
}

let testString = "Charged Attack DMG|{param6:F1P}+{param7:F1P}";
//console.log(getParamName(testString, 1));
// console.log(getParamName(testString, 2));
function getParamList(testString: string) {
    var result = [];
    var i = 1;
    do {
        let test = getParamName(testString, i);
        if (test !== undefined) {
            result.push(test)
            i++
        }
    }
    while (getParamName(testString, i) !== undefined);
    //console.log(result)
    return result;
}


const Talents: React.FC<ContainerProps> = ({ char, attribute }) => {
    const [talents, setTalents] = useState<any>();
    const [talentLvl, setTalentLvl] = useState(1);
    useEffect(() => {
        if (char.length !== 0 && Object.keys(attribute).length !== 0) {
            let talentDetails: { [key: string]: any } = genshindb.talents(char)
            let allTalents: { [key: string]: any } = {};
            for (const stat of ["combat1", "combat2", "combat3"]) {
                let talentMultiplier: any[] = []
                //console.log(talentDetails[stat])
                for (var label of talentDetails[stat].attributes.labels) {
                    if (!["CD", "Energy", "Duration"].some(substring => label.includes(substring))) {
                        
                        let Params = getParamList(label)
                        let values = [];
                        for (const param of Params) {
                            values.push(talentDetails[stat].attributes.parameters[param])
                        }
                        talentMultiplier.push({ [label]: values })
                    }
                }
                allTalents[stat] = talentMultiplier

            }
            if (talents !== allTalents) {
                setTalents(allTalents);
                console.log(talents)
            }
        }
    }, [char])

    useEffect(() => {
        if (char.length !== 0 && Object.keys(attribute).length !== 0) {
            let tempTalents: { [key: string]: any } = {};
            for (const stat in talents) {
                for (const each of talents[stat]){
                    //label = label.replaceAll(":F1P", "").replaceAll(":P", "").replaceAll(":F2P", "").replaceAll(":I", "").replaceAll(":F1", "")
                    let Params = getParamList(Object.keys(each)[0])
                    console.log(Object.keys(each)[0], Params, Object.values(each))
                    
                }
            }

        }
    }, [talentLvl, char])

    return (
        <div>
            <IonCard>
                <IonCardContent>

                    {
                        talents !== undefined && Object.keys(talents).map((eachkey) => {
                            //console.log(talents[eachkey])
                            return (
                                <div>
                                    <h2>{eachkey}</h2>
                                    {talents[eachkey].map((each: any) => {
                                        //console.log(Object.keys(each), Object.values(each))
                                        return (
                                            <div>
                                                <h3>{Object.keys(each)} : </h3>
                                            </div>
                                        )

                                    })}
                                    <hr />
                                </div>
                            )
                        })
                    }

                </IonCardContent>
            </IonCard>
        </div>
    )
}
export default Talents