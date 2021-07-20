import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react'
import React, { Component } from 'react'
import Party from '../components/Party'

interface userProps{
    history:any
}

export default class Teams extends Component<userProps> {


    componentDidMount(){
        //this.props.history.push('/tab1')
    }
    Navigate = (teamid:string,id: string) => {
        this.props.history.push('/teams/' + teamid + '/'+ id)
    }

    render() {
        return (
            <IonPage>
                
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Teams</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Teams</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <div>
                        <Party team='1' navigate={this.Navigate}/>
                        <Party team='2' navigate={this.Navigate}/>
                        <Party team='3' navigate={this.Navigate}/>
                        <Party team='4' navigate={this.Navigate}/>
                    </div>


                </IonContent>
            </IonPage>
        )
    }
}
