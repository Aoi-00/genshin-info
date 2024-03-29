import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonImg } from '@ionic/react'
import React, { Component } from 'react'
import Party from '../components/Party'
import paimon from '../assets/paimonTrans.jpeg';

interface userProps {
    history: any
}

export default class Teams extends Component<userProps> {
    state = {
        team1: [],
        team2: [],
        team3: [],
        team4: []
    }

    componentDidMount() {
        let team1: any[] = [], team2: any[] = [], team3: any[] = [], team4: any[] = [];
        for (var key in localStorage) {
            if (key.includes('/teams/') && !key.includes('/dmg') && !key.includes('ele')) {
                var retrievedObject = localStorage.getItem(`${key}`);
                if (retrievedObject !== null) {
                    switch (key.charAt(7)) {
                        case ('1'):
                            team1[Number(key.charAt(9)) - 1] = JSON.parse(retrievedObject);
                            break;
                        case ('2'):
                            team2[Number(key.charAt(9)) - 1] = JSON.parse(retrievedObject);
                            break;
                        case ('3'):
                            team3[Number(key.charAt(9)) - 1] = JSON.parse(retrievedObject);
                            break;
                        case ('4'):
                            team4[Number(key.charAt(9)) - 1] = JSON.parse(retrievedObject);
                            break;
                        default: {
                            break;
                        }
                    }

                }
            }

        }
        this.setState({
            team1: team1,
            team2: team2,
            team3: team3,
            team4: team4
        })
    }

    Navigate = (teamid: string, id: string) => {
        this.props.history.push('/teams/' + teamid + '/' + id)
        //this.props.history.push('/artifact/')
    }

    handleChange = (e: any) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onClear = (teamid: string) => {
        let team = "team" + teamid;
        this.setState({
            [team]: []
        })
        let keyName = "/teams/" + teamid;
        for (var key in localStorage) {
            if (key.includes(keyName)) {
                localStorage.removeItem(key)
            }
        }

    }

    render() {
        return (
            <IonPage>

                <IonHeader>
                    <IonToolbar>
                        <IonAvatar slot="end" style={{ width: '2em', height: '2em', margin: '1rem' }}>
                            <IonImg src={paimon} />
                        </IonAvatar>
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
                        <Party team='1' navigate={this.Navigate} chars={this.state.team1} onClear={this.onClear} />
                        <Party team='2' navigate={this.Navigate} chars={this.state.team2} onClear={this.onClear} />
                        <Party team='3' navigate={this.Navigate} chars={this.state.team3} onClear={this.onClear} />
                        <Party team='4' navigate={this.Navigate} chars={this.state.team4} onClear={this.onClear} />
                    </div>


                </IonContent>
            </IonPage>
        )
    }
}
