import { IonRow, IonCol, IonChip, IonAvatar, IonLabel, IonImg, IonGrid } from "@ionic/react";

const genshindb = require('genshin-db');

interface ContainerProps {
    date: string;
    today: string;
}

const Materials: React.FC<ContainerProps> = ({ date, today }) => {
    const chosenDay = ((date) === "Today") ? today : date;
    const talentMatResults = genshindb.materials('Talent Level-Up Material', { matchCategories: true });
    const weaponMatResults = genshindb.materials('Weapon Ascension Material', { matchCategories: true, verboseCategories: true });
    let allResults: any[] = genshindb.materials(chosenDay, { matchCategories: true, verboseCategories: true });
    let talentMat: any[] = [];
    let weaponMat: any[] = [];

    if (allResults) {
        let oneLevel = allResults.filter((ele: any) => ele.rarity === '3');
        talentMatResults && talentMatResults.map((each: any[]) => {
            const test = oneLevel.filter(eachItem => eachItem.name.includes(each));
            if (test.length !== 0) {
                let results = allResults.filter((x: any) => x.dropdomain === test[0].dropdomain)
                let images = [];
                for (var one of results) { images.push(one.images.fandom); }
                test[0].others = images;
                return (
                    talentMat.push(test[0])
                )
            }
        })
        weaponMatResults && weaponMatResults.map((each: any) => {
            const test = oneLevel.filter(eachItem => eachItem.name.includes(each.name));
            if (test.length !== 0) {
                let results = allResults.filter((x: any) => x.dropdomain === test[0].dropdomain)
                let images = [];
                for (var one of results) { images.push(one.images.fandom); }
                test[0].others = images;
                return (
                    weaponMat.push(each)
                )
            }
        })
    }


    return (
        <IonGrid>
            {today !== "Sunday" &&
                <div>
                    <IonRow >
                        <div style={{ width: '100%' }} className="ion-text-center">
                            <h5>Talent Materials</h5>
                        </div>
                        {
                            talentMat && talentMat.map((each) => {
                                return (
                                    <IonCol key={each.name} size="6" >
                                        <IonChip>
                                            {
                                                each.others.map((one: any) => {
                                                    return (
                                                        <IonAvatar style={{ margin: '0' }}>
                                                            <IonImg src={one} />
                                                        </IonAvatar>
                                                    )
                                                })
                                            }
                                            <IonLabel>{each.name}</IonLabel>
                                        </IonChip>
                                    </IonCol>
                                )
                            })
                        }

                    </IonRow>
                    <IonRow>
                        <div style={{ width: '100%' }} className="ion-text-center">
                            <h5>Weapon Materials</h5>
                        </div>
                        {
                            weaponMat && weaponMat.map((each: any) => {
                                return (
                                    <IonCol key={each.name} size="6" >
                                        <IonChip style={{ width: '45vw', height: 'auto' }}>
                                            {
                                                each.others.map((one: any) => {
                                                    return (
                                                        <IonAvatar style={{ margin: '0' }}>
                                                            <IonImg src={one} />
                                                        </IonAvatar>
                                                    )
                                                })
                                            }
                                            <IonLabel style={{ marginLeft: '0.5em' }}>{each.name}</IonLabel>
                                        </IonChip>
                                    </IonCol>
                                )
                            })
                        }
                    </IonRow>
                </div>
            }
            {
                today === "Sunday" && <div>
                    <IonRow >
                        <div style={{ width: '100%' }} className="ion-text-center">
                            <h5>Talent Materials</h5>
                        </div>
                        {
                            talentMat && talentMat.map((each) => {
                                return (
                                    <IonCol key={each.name} size="6" >
                                        <IonChip>
                                            <IonAvatar style={{ margin: '0' }}>
                                                <IonImg src={each.images.fandom} />
                                            </IonAvatar>
                                            <IonLabel>{each.name}</IonLabel>
                                        </IonChip>
                                    </IonCol>
                                )
                            })
                        }

                    </IonRow>
                    <IonRow>
                        <div style={{ width: '100%' }} className="ion-text-center">
                            <h5>Weapon Materials</h5>
                        </div>
                        {
                            weaponMat && weaponMat.map((each: any) => {
                                return (
                                    <IonCol key={each.name} size="6" >
                                        <IonChip>
                                            <IonAvatar style={{ margin: '0' }}>
                                                <IonImg src={each.images.fandom} />
                                            </IonAvatar>
                                            <IonLabel>{each.name}</IonLabel>
                                        </IonChip>
                                    </IonCol>
                                )
                            })
                        }
                    </IonRow>
                </div>
            }
        </IonGrid >
    );
};
export default Materials;
