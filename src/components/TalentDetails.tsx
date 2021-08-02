import { IonCard, IonItem, IonAvatar, IonLabel, IonCardContent, IonItemDivider, IonItemGroup, IonImg, IonText, } from '@ionic/react'
import React, { useEffect, useState } from 'react'

const genshindb = require('genshin-db');
interface ContainerProps {
    char: any;
}

const TalentDetails: React.FC<ContainerProps> = ({ char }) => {
    const [talents, setTalent] = useState<any>({});
    const [passives, setPassives] = useState<any>({});

    function findImage(images: any, talent: any) {
        Object.keys(talent).map((each) => {
            talent[each].pic = images[each]
            talent[each].info = FormatText(talent[each].info)
        })
        return talent
    }

    function FormatText(text: string) {
        let result = text.match(/\*\*([^,*]+)\*\*/g)
        if (result !== null) {
            let replace: any[] = [];
            for (var i in result) {
                replace[i] = `${result[i].replaceAll("**", "")}`
            }
            for (var i in replace) {
                text = text.replace(result[i], replace[i])
            }
        }
        return text
    }

    useEffect(() => {
        if (char.name !== undefined) {
            let details: any = genshindb.talents(char.name);
            let combat: any = {};
            Object.keys(details).filter((x) => x.includes("combat")).map((each) => {
                combat[each] = details[each]
            })
            let passives: any = {};
            Object.keys(details).filter((x) => x.includes("passive")).map((each) => {
                passives[each] = details[each]
            })
            setTalent(findImage(details.images, combat))
            setPassives(findImage(details.images, passives))
        }
    }, [char.name])

    return (
        <div>
            <IonItemGroup>
                <IonItemDivider>
                    <h3>Talents</h3>
                </IonItemDivider>
                {
                    talents && Object.keys(talents).map((x) => {
                        return (
                            <IonCard>
                                <IonItem>
                                    <IonAvatar style={{ marginRight: "0.5em" }}>
                                        <IonImg src={talents[x].pic} alt={""} />
                                    </IonAvatar>
                                    <IonLabel>{talents[x].name}</IonLabel>
                                </IonItem>

                                <IonCardContent>
                                    <pre style={{ fontFamily: 'Roboto', fontSize: "1em" }}><IonText id={talents[x].name} color="medium">{talents[x].info} </IonText></pre>
                                </IonCardContent>
                            </IonCard>
                        )
                    })
                }
            </IonItemGroup>

            <IonItemGroup>
                <IonItemDivider>
                    <h3>Passives</h3>
                </IonItemDivider>
                {
                    passives && Object.keys(passives).map((x) => {
                        return (
                            <IonCard>
                                <IonItem>
                                    <IonAvatar style={{ marginRight: "0.5em" }}>
                                        <IonImg src={passives[x].pic} alt={""} />
                                    </IonAvatar>
                                    <IonLabel>{passives[x].name}</IonLabel>
                                </IonItem>

                                <IonCardContent>
                                    <pre style={{ fontFamily: 'Roboto', fontSize: "1em" }}><IonText id={passives[x].name} color="medium">{passives[x].info}</IonText></pre>
                                </IonCardContent>
                            </IonCard>
                        )
                    })
                }
            </IonItemGroup>
        </div>
    )
}
export default TalentDetails;