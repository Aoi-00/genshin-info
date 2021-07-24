import { IonCard, IonCardContent, } from "@ionic/react";
import { useEffect, useState } from "react";

const genshin = require("genshin_panel");
const genshindb = require('genshin-db');

interface ContainerProps {

    char: any;
    attribute: any;
    level: string;

}



const Talents: React.FC<ContainerProps> = ({ char, attribute, level }) => {
    function getParamName(label: string, occurence: number) {
        let index = 0;
        while (occurence > 0) {
            index = label.indexOf("param", index + 1);
            if (index === -1) return undefined;
            occurence--;
        }
        return label.substring(index, index + 7).replace(":", "");
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
        let result: { name: string; dmg: any; }[] = [];
        for (var i in arr) {
            var val = arr[i];
            //console.log(val)
            //let Json: {name: any; dmg:[]} ;
            var label = Object.keys(val)[0].split("|");
            var formattedResult = FormatNumber(label[1], Object.values(val)[0])
            var Json = { name: label[0], dmg: formattedResult }
            result.push(Json)
    
        }
        //console.log(result)
        return result
    }
    
    
    
    function FormatNumber(format: string, number: any) {
        var result: any = format.match(/{.+?}/g)
        //console.log(result,number)
        for (var i in result) {
            //console.log(result[i],number[i])
            if (result[i].includes(":P")) {
                number[i] = number[i].map((x: number) => (x * 100).toFixed(1)+ '%')
                //console.log(number[i])
            }
            else if (result[i].includes(":F1P")) {
                number[i] = number[i].map((x: number) => Number((x * 100).toFixed(1)) + '%')
            }
            else if (result[i].includes(":F2P")) {
                number[i] = number[i].map((x: number) => Number((x * 100).toFixed(2))+ '%')
            }
            else if (result[i].includes(":I")) {
                number[i] = number[i].map((x: number) => Math.round(x))
            }
            format = format.replace(result[i],number[i][Number(level)-1])
        }
        return format
        
    }
    
    // function FormatResult(format: string, number: any){
    //     var result: any = format.match(/{.+?}/g)
    //     for (var i in result) {
    //         console.log(format, result[i],number[level])
    //     }
    // }

    const [combat1, setCombat1] = useState(Array());
    const [combat2, setCombat2] = useState(Array());
    const [combat3, setCombat3] = useState(Array());
    const [talentLvl, setTalentLvl] = useState('1');

    useEffect(()=> {
        if (talentLvl !== level){
            setTalentLvl(level)
        }
    },[level])

    useEffect(() => {
        //console.log(char)
        if (char.length !== 0 && Object.keys(attribute).length !== 0) {
            let talentDetails: { [key: string]: any } = genshindb.talents(char)
            let allTalents: { [key: string]: any } = {};
            for (const stat of ["combat1", "combat2", "combat3"]) {
                let talentMultiplier: any[] = []
                for (var label of talentDetails[stat].attributes.labels) {
                    //if (!["CD", "Energy", "Duration"].some(substring => label.includes(substring))) {
                        let Params = getParamList(label)
                        let values = [];
                        for (const param of Params) {
                            values.push(talentDetails[stat].attributes.parameters[param])
                        }
                        talentMultiplier.push({ [label]: values })
                    //}
                }
                allTalents[stat] = talentMultiplier
            }
            setCombat1(FilterText(allTalents.combat1))
            setCombat2(FilterText(allTalents.combat2))
            setCombat3(FilterText(allTalents.combat3))
            // console.log(combat1)
            // console.log(combat2)
            // console.log(combat3)
        }
    }, [char, level])

    return ( //key={x.name}
        <div>
            <IonCard>
                <IonCardContent>
                    Attack
                    {
                        combat1 && combat1.map(x => {
                            return (
                                <p>{x.name}: {x.dmg.includes('undefined') ? "" : x.dmg} </p>
                            )
                        })
                    }
                    <br/>
                    Elemental Skill
                    {
                        combat2 && combat2.map(x => {
                            return (
                                <p>{x.name}: {x.dmg.includes('undefined') ? "" : x.dmg} </p>
                            )
                        })
                    }
                    <br/>
                    Elemental Burst
                    {
                        combat3 && combat3.map(x => {
                            return (
                                <p>{x.name}: {x.dmg.includes('undefined') ? "" : x.dmg} </p>
                            )
                        })
                    }
                </IonCardContent>
            </IonCard>
        </div>
    )
}
export default Talents