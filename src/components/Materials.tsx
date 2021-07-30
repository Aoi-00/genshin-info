import { IonRow, IonCol, IonChip, IonAvatar, IonLabel, IonImg,IonGrid } from "@ionic/react";

const genshindb = require('genshin-db');

interface ContainerProps {
    date: string;
    today: string;
}

const Materials: React.FC<ContainerProps> = ({ date, today }) => {
    const chosenDay = ((date) === "Today") ? today : date;
    const talentMatResults = genshindb.materials('Talent Level-Up Material', { matchCategories: true });
    const weaponMatResults = genshindb.materials('Weapon Ascension Material', { matchCategories: true, verboseCategories: true });
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
        if (test.length !== 0){
            return (           
                talentMat.push(test)
            )
        }        
    })
    let talentMatData: any[] = [];
    talentMat && talentMat.map((each) => {
        return (
            each.forEach((item: any) => {
                talentMatData.push(item);
            })
        )
    })
    weaponMatResults && weaponMatResults.map((each: any) => {
        const test = allMat.filter(eachItem => eachItem.name.includes(each.name));
        if (test.length !== 0){
            return (
                weaponMat.push(each)
            )
        }
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
                            <IonCol key={each.name} size="6" >
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
                            <IonCol key={each.name} size="6" >
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
