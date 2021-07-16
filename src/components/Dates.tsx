import React from 'react'
import { IonSegment, IonSegmentButton, IonLabel} from '@ionic/react'


interface ContainerProps {
    handleChange: Function;
    date: string;
}

const Dates: React.FC<ContainerProps> = ({ handleChange, date }) => {
    return (
        <div>
            {/*-- Segment buttons with text and click listener --*/}
            <IonSegment scrollable={true} id="date" value={(date === "") ? "Today" : date} onIonChange={(e) => handleChange(e)}>
                <IonSegmentButton  value="Today">
                    <IonLabel>Today</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Monday">
                    <IonLabel>Mon/Thurs</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Tuesday">
                    <IonLabel>Tues/Fri</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Wednesday">
                    <IonLabel>Wed/Sat</IonLabel>
                </IonSegmentButton>
                {/* <IonSegmentButton value="Thursday">
                    <IonLabel>Thurs</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Friday">
                    <IonLabel>Fri</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Saturday">
                    <IonLabel>Sat</IonLabel>
                </IonSegmentButton> */}
                <IonSegmentButton value="Sunday">
                    <IonLabel>Sun</IonLabel>
                </IonSegmentButton>
            </IonSegment>
        </div>
    )
}
export default Dates;