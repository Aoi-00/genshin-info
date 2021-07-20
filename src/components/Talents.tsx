import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonCol, IonRow } from "@ionic/react";
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
    return result;
}
function FilterText(arr: any) {
    let result = [];
    for (var i in arr) {
        var val = arr[i];
        for (var j in val) {
            var sub_key = j;
            var sub_val = val[j];
            var name = sub_key.split("|") //name[1] will be format of dmg nums
            var Json = { name: name[0], dmg: sub_val }
            result.push(Json)
        }
    }
    return result
}


const Talents: React.FC<ContainerProps> = ({ char, attribute }) => {
    const [talents, setTalents] = useState<any>();
    const [combat1, setCombat1] = useState(Array());
    const [combat2, setCombat2] = useState(Array());
    const [combat3, setCombat3] = useState(Array());
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
                setCombat1(FilterText(allTalents.combat1))
                setCombat2(FilterText(allTalents.combat2))
                setCombat3(FilterText(allTalents.combat3))
                console.log(combat1)
                console.log(combat2)
                console.log(combat3)
            }
        }
    }, [char])

    // useEffect(() => {
    //     if (char.length !== 0 && Object.keys(attribute).length !== 0) {
    //         let tempTalents: { [key: string]: any } = {};
    //         for (const stat in talents) {
    //             for (const each of talents[stat]) {
    //                 //label = label.replaceAll(":F1P", "").replaceAll(":P", "").replaceAll(":F2P", "").replaceAll(":I", "").replaceAll(":F1", "")
    //                 let Params = getParamList(Object.keys(each)[0])
    //                 console.log(Object.keys(each)[0], Params, Object.values(each))

    //             }
    //         }

    //     }
    // }, [talentLvl, char])

    useEffect(()=>{
        console.log("mounted")
        console.log(combat1,combat2,combat3)
    })
    return (
        <div>
            <IonCard>
                <IonCardContent>
                    {combat1 && combat1.map(x => x.dmg.map((z:any) => {
                        console.log(z)
                        return(
                            <p key={x.name}> {x.name}: {z[0]}</p>
                        )
                    }))}
                </IonCardContent>
            </IonCard>
        </div>
    )
}
export default Talents