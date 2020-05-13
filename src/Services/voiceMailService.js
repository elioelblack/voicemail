import fetch2 from 'node-fetch';
import axios from 'axios';
const serverUrl = 'https://sandbox.2600hz.com:8443/v2';
const ACCOUNT_ID = '4642e64040cdb8b89c310a21a07c7f62';
const VM_BOX_ID = 'b37675a2d7b90d60f0ee5d4175502394';
const credentials = 'NDY0MmU2NDA0MGNkYjhiODljMzEwYTIxYTA3YzdmNjI6MjMyNjQxNTY1OTA3NWU3NTAwMGNlY2Q3YmNiZjM3NTY=';


const headers = {
    Authorization: `Basic ${credentials}`,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
};
var config = {
    headers: {
        'Authorization': "Basic " + credentials,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Headers':'*',
    'Content-Type': 'application/json',
    }
};
class VoicemailService {

    retrieveAllSchemas() {
        // console.log(`${API_URL}/courses`,config);
        return fetch(`${serverUrl}/schemas`);
    }
    retrieveAllVmBoxes() {
        //return axios.get(`http://localhost:8080/voicemail/messages`);
        return fetch(`https://eliotest-heroku-spring.herokuapp.com/voicemail/messages`);
        //return axios.get(`${serverUrl}/accounts/${ACCOUNT_ID}/vmboxes/${VM_BOX_ID}/messages`,config);
        //return fetch2(`${serverUrl}/accounts/${ACCOUNT_ID}/vmboxes/${VM_BOX_ID}/messages`,{headers});
    }
}

export default new VoicemailService();