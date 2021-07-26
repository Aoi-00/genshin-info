import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react'
import React, { Component } from 'react'
import Party from '../components/Party'

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
        //this.props.history.push('/tab1')
        //console.log("mount Teams")
        let team1: any[] = [], team2: any[] = [], team3: any[] = [], team4: any[] = [];
        for (var key in localStorage) {
            if (key.includes('/teams/')) {
                var retrievedObject = localStorage.getItem(`${key}`);
                if (retrievedObject !== null) {
                    switch (key.charAt(7)) {
                        case ('1'):
                            team1[Number(key.charAt(9))-1] = JSON.parse(retrievedObject);
                            break;
                        case ('2'):
                            team2[Number(key.charAt(9))-1] = JSON.parse(retrievedObject);
                            break;
                        case ('3'):
                            team3[Number(key.charAt(9))-1] = JSON.parse(retrievedObject);
                            break;
                        case ('4'):
                            team4[Number(key.charAt(9))-1] = JSON.parse(retrievedObject);
                            break;
                        default: {
                            break;
                        }
                    }

                }
            }

        }
        this.setState({
            team1:team1,
            team2:team2,
            team3:team3,
            team4:team4
        })
    }

    componentDidUpdate(){
        //console.log(this.state)
    }

    componentWillUnmount() {
        //console.log("unmount Teams")
    }
    Navigate = (teamid: string, id: string) => {
        this.props.history.push('/teams/' + teamid + '/' + id)
    }

    handleChange = (e: any) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onClear = (teamid: string) => {
        let team = "team"+teamid;
        this.setState({
            [team]: []
        })
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
                        <Party team='1' navigate={this.Navigate} chars={this.state.team1} onClear = {this.onClear}/>
                        <Party team='2' navigate={this.Navigate} chars={this.state.team2} onClear = {this.onClear} />
                        <Party team='3' navigate={this.Navigate} chars={this.state.team3} onClear = {this.onClear}/>
                        <Party team='4' navigate={this.Navigate} chars={this.state.team4} onClear = {this.onClear}/>
                    </div>


                </IonContent>
            </IonPage>
        )
    }
}
