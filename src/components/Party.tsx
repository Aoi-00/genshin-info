import React from 'react'
import { IonRow,  IonAvatar, IonItem, IonButton, IonCard, IonCardContent,IonText } from '@ionic/react'
import './Party.css';
import defaultAvatar from '../assets/defaultAvatar.jpg'
import { MDBCol } from 'mdbreact';


interface ContainerProps {
    team: string;
    navigate: Function;
    chars:any;
    onClear:Function;
}


const Party: React.FC<ContainerProps> = ({ team, navigate, chars, onClear }) => {

    return (
        <IonCard>
            <IonItem>
                <IonText >Team {team}</IonText>

                <IonButton onClick={(e)=> {onClear(team)}} fill="outline" slot="end">Clear</IonButton>
            </IonItem>

            <IonCardContent>
                <IonRow>
                    <MDBCol size='3'>
                        <IonAvatar  >
                            <img id={'1'} src={chars[0] ? chars[0].char.images.icon : defaultAvatar } alt="" onClick={(e) => {
                                navigate(team, (e.target as HTMLImageElement).id);
                            }} />
                        </IonAvatar>
                    </MDBCol>
                    <MDBCol size='3'>
                        <IonAvatar>
                            <img id={'2'} src={chars[1] ? chars[1].char.images.icon : defaultAvatar} alt="" onClick={(e) => navigate(team, (e.target as HTMLImageElement).id)} />
                        </IonAvatar>
                    </MDBCol>
                    <MDBCol size='3'>
                        <IonAvatar>
                            <img id={'3'} src={chars[2] ? chars[2].char.images.icon : defaultAvatar} alt="" onClick={(e) => navigate(team, (e.target as HTMLImageElement).id)} />
                        </IonAvatar>
                    </MDBCol>
                    <MDBCol size='3'>
                        <IonAvatar>
                            <img id={'4'} src={chars[3] ? chars[3].char.images.icon : defaultAvatar} alt="" onClick={(e) => navigate(team, (e.target as HTMLImageElement).id)} />
                        </IonAvatar>
                    </MDBCol>
                </IonRow>


            </IonCardContent>
        </IonCard>

    )
}

export default Party