import { IonCard, IonCardContent, IonChip, IonText, IonToggle, } from "@ionic/react";
import { useEffect, useState } from "react";


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
            var label = Object.keys(val)[0].split("|");
            var formattedResult = FormatNumber(label[1], Object.values(val)[0])
            var Dmg = ApplyAttribute(label[0], formattedResult, Object.values(val)[0])
            var Json = { name: label[0], dmg: Dmg }
            result.push(Json)
        }
        return result
    }


    function FormatNumber(format: string, number: any) {
        var result: any = format.match(/{.+?}/g)
        for (var i in result) {
            if (result[i].includes(":P")) {
                number[i] = number[i].map((x: number) => (x * 100).toFixed(1) + '%')
            }
            else if (result[i].includes(":F1P")) {
                number[i] = number[i].map((x: number) => Number((x * 100).toFixed(1)) + '%')
            }
            else if (result[i].includes(":F2P")) {
                number[i] = number[i].map((x: number) => Number((x * 100).toFixed(2)) + '%')
            }
            else if (result[i].includes(":I")) {
                number[i] = number[i].map((x: number) => Math.round(x))
            }
            else if (result[i].includes(":F1")) {
                number[i] = number[i].map((x: number) => (Math.round(x*10)/10).toFixed(1) )
            }
            format = format.replace(result[i], number[i][Number(level) - 1])
        }
        return format

    }

    function ApplyAttribute(label: string, format: string, number: any) {
        if (!["CD", "Energy", "Duration", "Stamina", "Bonus"].some(substring => label.includes(substring))) {
            if (format.includes("Max HP")) {
                var name = format.split("Max HP")
                return (format.replace(name[0] + "Max HP", (Number(name[0].replace('%', "")) / 100 * ( attribute.lifeStatic + attribute.lifePercentage + attribute.lifeBasic )).toFixed(0).toString()))
            }
            else if (format.includes("DEF")) {
                var name = format.split("DEF")
                return (format.replace(name[0] + "DEF", (Number(name[0].replace('%', "")) / 100 * ( attribute.defendStatic + attribute.defendPercentage + attribute.defendBasic ) ).toFixed(0).toString()))
            }
            else if (format.includes("%")){
                let values = format.match(/[0-9]*\.?[0-9]+%/g);               
                let tempString: any;
                for (var i in values) {
                    if (values[Number(i)].includes('%')) {
                        if (Number(i) === 0) {
                            tempString = format.replace(values[Number(i)], (Number(values[Number(i)].replace('%', "")) / 100 * (( attribute.attackStatic + attribute.attackPercentage + attribute.attackBasic )) ).toFixed(0).toString())
                        }
                        else {
                            tempString = tempString.replace(values[Number(i)], (Number(values[Number(i)].replace('%', "")) / 100 * (attribute.attackStatic + attribute.attackPercentage + attribute.attackBasic) ).toFixed(0).toString())
                        }
                    }
                }
                if (tempString.includes('×')) {
                    let values = tempString.match(/[0-9]*\.?[0-9]/g)
                    return (Number(values[0])*Number(values[1])).toString()
                }
                return (tempString)
            }
            else {
                return format
            }
        }
        return format
    }

    function Calculate (values:any, number:any , bonus:any){
        let newValues = [];
        for (var i in values) {
            newValues.push( (Number(values[i]) + Number(values[i]) * attribute[bonus]).toFixed(0) )
        }
        for (var i in newValues) {
            number = number.replace(values[i], newValues[i])
        }
        return number
    }

    function ApplyDMGBonus(type: string, name: string, number: any) {
        switch (type) {
            case ('b'):
                {
                    //apply a = normal atk, b = charged atk, air = plunge
                    if (!["CD", "Energy", "Duration", "Stamina", "Bonus"].some(substring => name.includes(substring))) {
                        if (name.includes("Plunge")) {
                            let values = number.match(/[0-9]*\.?[0-9]/g);
                            number = Calculate(values, number, 'aBonus')
                            return number
                        }
                        else if (name.includes("Charged")) {
                            let values = number.match(/[0-9]*\.?[0-9]/g);
                            number = Calculate(values, number, 'bBonus')
                            return number
                        }
                        else {
                            let values = number.match(/[0-9]*\.?[0-9]/g);
                            number = Calculate(values, number, 'aBonus')
                            return number
                        }
                    }
                    return (number)
                }
            case ('e'):
                {
                    //apply e skill atk bonus, eBonus, search for regeneration/healing (cureEffect = healing, cured = incoming)
                    if (!["CD", "Energy", "Duration", "Stamina", "Bonus"].some(substring => name.includes(substring))) {
                        let values = number.match(/[0-9]*\.?[0-9]/g);
                        if (!["Healing", "Regeneration"].some(substring => name.includes(substring))) {
                            number = Calculate(values, number, 'eBonus')
                            return number
                        }
                        else if (["Healing", "Regeneration"].some(substring => name.includes(substring))) {
                            number = Calculate(values, number, 'cureEffect')
                            return number
                        }
                        else if (["Additional Shield"].some(substring => name.includes(substring))){
                            number = Calculate(values, number, 'shield')
                            return number
                        }

                    }
                    return number;
                }
            case ('q'):
                {
                    //apply ult skill atk bonus, qBonus, search for regeneration/healing (cureEffect = healing, cured = incoming)
                    if (!["CD", "Energy", "Duration", "Stamina", "Bonus"].some(substring => name.includes(substring))) {
                        let values = number.match(/[0-9]*\.?[0-9]/g);
                        if (!["Healing", "Regeneration"].some(substring => name.includes(substring))) {
                            number = Calculate(values, number, 'qBonus')
                            return number
                        }
                        else {
                            number = Calculate(values, number, 'cureEffect')
                            return number
                        }

                    }
                    return number;
                }
        }

    }
    function ApplyCrit(name: string, number: any, crit: boolean) {
        if (!["CD", "Energy", "Duration", "Stamina", "Bonus", "Regeneration Per Sec","Shield"].some(substring => name.includes(substring))) {
            let values = number.match(/[0-9]*\.?[0-9]/g);
            let newValues = [];
            for (var i in values) {
                newValues.push(crit ? (Number(values[i]) * (attribute.criticalDamage+1)).toFixed(0) : values[i])
            }
            for (var i in newValues) {
                number = number.replace(values[i], newValues[i])
            }
            return number;
        }
        return number;
    }

    function ApplyEleBonus(name: string, number: any, ele: boolean) {
        var Bonus;
        switch (char.element) {
            case ('Anemo'): {
                Bonus = attribute.windBonus ? attribute.windBonus : attribute.physicalBonus;
                break;
            }
            case ('Cryo'): {
                Bonus = attribute.iceBonus ? attribute.iceBonus : attribute.physicalBonus;
                break;
            }
            case ('Electro'): {
                Bonus = attribute.thunderBonus ? attribute.thunderBonus : attribute.physicalBonus;;
                break;
            }
            case ('Geo'): {
                Bonus = attribute.rockBonus ? attribute.rockBonus : attribute.physicalBonus;;
                break;
            }
            case ('Hydro'): {
                Bonus = attribute.waterBonus ? attribute.waterBonus : attribute.physicalBonus;;
                break;
            }
            case ('Pyro'): {
                Bonus = attribute.fireBonus ? attribute.fireBonus : attribute.physicalBonus;;
                break;
            }
            default: {
                Bonus = attribute.physicalBonus
            }
        }
        if (!["CD", "Energy", "Duration", "Stamina","Bonus", "Regeneration Per Sec", "Healing","Shield"].some(substring => name.includes(substring))) {
            let values = number.match(/[0-9]*\.?[0-9]/g);
            let newValues = [];
            for (var i in values) {
                newValues.push(ele ? (Number(values[i]) * (Bonus+1)).toFixed(0) : values[i])
            }
            for (var i in newValues) {
                number = number.replace(values[i], newValues[i])
            }
            return number;
        }
        return number;
    }


    const [combat1, setCombat1] = useState(Array());
    const [combat2, setCombat2] = useState(Array());
    const [combat3, setCombat3] = useState(Array());
    const [bCrit, setbCrit] = useState(false);
    const [bEle, setbEle] = useState(false);
    const [eCrit, seteCrit] = useState(false);
    const [eEle, seteEle] = useState(false);
    const [qCrit, setqCrit] = useState(false);
    const [qEle, setqEle] = useState(false);
    const [talentLvl, setTalentLvl] = useState('1');

    useEffect(() => {
        if (talentLvl !== level) {
            setTalentLvl(level)
        }
    }, [level])

    useEffect(() => {
        if (Object.keys(char).length !== 0 && Object.keys(attribute).length !== 0) {
            let talentDetails: { [key: string]: any } = genshindb.talents(char.name)
            let allTalents: { [key: string]: any } = {};
            for (const stat of ["combat1", "combat2", "combat3"]) {
                let talentMultiplier: any[] = []
                for (var label of talentDetails[stat].attributes.labels) {
                    let Params = getParamList(label)
                    let values = [];
                    for (const param of Params) {
                        values.push(talentDetails[stat].attributes.parameters[param])
                    }
                    talentMultiplier.push({ [label]: values })
                }
                allTalents[stat] = talentMultiplier
            }
            setCombat1(FilterText(allTalents.combat1))
            setCombat2(FilterText(allTalents.combat2))
            setCombat3(FilterText(allTalents.combat3))
        }
    }, [char, level])



    return (
        <div>
            <IonCard>
                <IonCardContent>
                <IonText color="danger">Note: The calculation assumes that artifact effect is always active (if applicable) and at maximum level. It also does not take into account elemental reactions. <br/></IonText>
                    <div>Attack</div>
                    {
                        combat1 && combat1.map(x => {
                            return (
                                <p key={x.name}>{x.name}: {x.dmg?.includes('undefined') || x.dmg === undefined ? "" : ApplyEleBonus(x.name, ApplyCrit(x.name, ApplyDMGBonus('b', x.name, x.dmg), bCrit), bEle)} </p>
                            )
                        })
                    }
                    <IonChip>
                        Crit
                        <IonToggle color="primary" checked={bCrit} onIonChange={(e) => setbCrit(!bCrit)} />
                    </IonChip>

                    <IonChip>
                        Ele Bonus
                        <IonToggle color="primary" checked={bEle} onIonChange={(e) => setbEle(!bEle)} />
                    </IonChip>

                    <br />
                    Elemental Skill
                    {
                        combat2 && combat2.map(x => {
                            return (
                                <p key={x.name}>{x.name}: {x.dmg?.includes('undefined') || x.dmg === undefined ? "" : ApplyEleBonus(x.name,ApplyCrit(x.name, ApplyDMGBonus('e', x.name, x.dmg), eCrit),eEle) } </p>
                            )
                        })
                    }
                    <IonChip>
                        Crit
                        <IonToggle color="primary" checked={eCrit} onIonChange={(e) => seteCrit(!eCrit)} />
                    </IonChip>

                    <IonChip>
                        Ele Bonus
                        <IonToggle color="primary" checked={eEle} onIonChange={(e) => seteEle(!eEle)} />
                    </IonChip>
                    <br />
                    Elemental Burst
                    {
                        combat3 && combat3.map(x => {
                            return (
                                <p key={x.name}>{x.name}: {x.dmg?.includes('undefined') || x.dmg === undefined ? "" : ApplyEleBonus(x.name,ApplyCrit(x.name, ApplyDMGBonus('e', x.name, x.dmg), qCrit), qEle)} </p>
                            )
                        })
                    }
                    <IonChip>
                        Crit
                        <IonToggle color="primary" checked={qCrit} onIonChange={(e) => setqCrit(!qCrit)} />
                    </IonChip>

                    <IonChip>
                        Ele Bonus
                        <IonToggle color="primary" checked={qEle} onIonChange={(e) => setqEle(!qEle)} />
                    </IonChip>
                </IonCardContent>
            </IonCard>
        </div>
    )
}
export default Talents