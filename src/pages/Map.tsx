import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react'
import React, { Component } from 'react'
import './Map.css'

export default class Map extends Component {

    componentDidMount(){

    }

    render() {
        return (
            <IonPage>
                {/* <IonHeader>
                    <IonToolbar>
                        <IonTitle>Genshin Map</IonTitle>
                    </IonToolbar>
                </IonHeader> */}

                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Genshin Map</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <div className="Map">
                    <iframe src="https://webstatic-sea.mihoyo.com/app/ys-map-sea/?lang=en-sg#/map/2?shown_types=&center=-438.00,15.00&zoom=-2.00" width="100%" height="100%"></iframe>
                    </div>
                    

                </IonContent>
            </IonPage>
        )
    }
}
