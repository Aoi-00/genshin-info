//import './ExploreContainer.css';

import { IonRow, IonCol, IonChip, IonAvatar, IonLabel, IonImg, IonText, IonItem, IonGrid } from "@ionic/react";

const genshindb = require('genshin-db');

//To wait for updated pic fix

interface ContainerProps {
    date: string;
    today: string;
}

const Materials: React.FC<ContainerProps> = ({ date, today }) => {
    const chosenDay = ((date) === "Today") ? today : date;
    const talentMatResults = genshindb.talentmaterialtypes(chosenDay, { matchCategories: true });
    const weaponMatResults = genshindb.weaponmaterialtypes(chosenDay, { matchCategories: true })
    let allResults = genshindb.materials(chosenDay, { matchCategories: true });
    let allMat: any[] = [];
    let talentMat: any[] = [];
    let weaponMat: any[] = [];

    allResults && allResults.map((each: any[]) => {
        return (
            allMat.push(genshindb.materials(each, { matchCategories: true, verboseCategories: true }))
        )
    })

    talentMatResults && talentMatResults.map((each: any[]) => {
        const test = allMat.filter(eachItem => eachItem.name.includes(each));
        return (

            talentMat.push(test)
        )
    })
    let talentMatData: any[] = [];
    talentMat && talentMat.map((each) => {
        each.forEach((item: any) => {
            talentMatData.push(item);
        })
    })
    weaponMatResults && weaponMatResults.map((each: any[]) => {
        return (
            weaponMat.push(genshindb.materials(each, { matchCategories: true, verboseCategories: true }))
        )
    })







    return (

        <IonGrid>
            <IonRow >
                <div style={{ width: '100%' }} className="ion-text-center">
                    <h5>Talent Materials</h5>
                </div>

                {
                    talentMatData && talentMatData.map((each) => {
                        return (
                            <IonCol size="6" >
                                <IonChip>
                                    <IonAvatar>
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
                            <IonCol size="6" >
                                <IonChip>
                                    <IonAvatar>
                                        <IonImg src={each.images.fandom} />  
                                    </IonAvatar>
                                    <IonLabel>{each.name}</IonLabel>
                                </IonChip>
                            </IonCol>
                        )
                    })
                }


            </IonRow>
        </IonGrid >



    );
};

export default Materials;
