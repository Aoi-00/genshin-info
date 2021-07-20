import React, { useEffect } from 'react'
import { IonRow, IonCol, IonAvatar, IonGrid, IonItem, IonButton, IonCard, IonCardContent,IonText } from '@ionic/react'
import './Party.css';
import defaultAvatar from '../assets/defaultAvatar.jpg'
import { MDBCol } from 'mdbreact';


interface ContainerProps {
    //handleChange: Function;
    team: string;
    navigate: Function;
}


const Party: React.FC<ContainerProps> = ({ /*handleChange*/ team, navigate }) => {

    return (
        <IonCard>
            <IonItem>
                <IonText >Team {team}</IonText>

                <IonButton fill="outline" slot="end">Clear</IonButton>
            </IonItem>

            <IonCardContent>
                <IonRow>
                    <MDBCol size='3'>
                        <IonAvatar  >
                            <img id={'1'} src={defaultAvatar} alt="" onClick={(e) => {
                                navigate(team, (e.target as HTMLImageElement).id);
                            }} />
                        </IonAvatar>
                    </MDBCol>
                    <MDBCol size='3'>
                        <IonAvatar>
                            <img id={'2'} src={defaultAvatar} alt="" onClick={(e) => navigate(team, (e.target as HTMLImageElement).id)} />
                        </IonAvatar>
                    </MDBCol>
                    <MDBCol size='3'>
                        <IonAvatar>
                            <img id={'3'} src={defaultAvatar} alt="" onClick={(e) => navigate(team, (e.target as HTMLImageElement).id)} />
                        </IonAvatar>
                    </MDBCol>
                    <MDBCol size='3'>
                        <IonAvatar>
                            <img id={'4'} src={defaultAvatar} alt="" onClick={(e) => navigate(team, (e.target as HTMLImageElement).id)} />
                        </IonAvatar>
                    </MDBCol>
                </IonRow>


            </IonCardContent>
        </IonCard>

    )
}

export default Party