import { IonCard, IonItem, IonAvatar, IonLabel, IonCardContent, IonSelect, IonSelectOption, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonCol, IonRow, } from '@ionic/react'
import React, { useEffect, useState } from 'react'


interface ContainerProps {
    handleChange: Function;
    charLvl: string;
    enemyLvl: string;
}

const Mob: React.FC<ContainerProps> = ({ handleChange, charLvl, enemyLvl }) => {
    return (

        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Mob Level</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <div style={{ display: 'flex', alignItems: "center" }}>
                    <div style={{marginRight: '2em'}}>
                    Char Lvl: {charLvl}
                    </div>
                    Enemy Lvl: <IonInput id="enemyLvl" type="number" value={enemyLvl} placeholder="Enter Number" onIonChange={(e: any) => handleChange(e)}></IonInput>
                </div>
            </IonCardContent>
        </IonCard>
    )
}
export default Mob;