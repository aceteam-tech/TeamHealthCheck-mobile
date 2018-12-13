import {getSession} from './auth';

export const myTeams = async () => {
    const session = await getSession()
    const headers = {Authorization: session.getIdToken().getJwtToken()}
    const response = await fetch('https://z4evuu990j.execute-api.eu-west-2.amazonaws.com/dev/my-teams', {headers})
    return response.json()
}