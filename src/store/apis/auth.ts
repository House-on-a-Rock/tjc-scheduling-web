import axios, { AxiosResponse } from 'axios';
import { secretIp } from '../../../secrets/secretStuff';

export function recoverEmail(email: string) {
    return axios.post(`${secretIp}/api/authentication/sendResetEmail`, {
        email: email,
    });
}

export function checkResetToken(token: string) {
    return axios.get(`${secretIp}/api/authentication/checkResetToken`, {
        headers: {
            authorization:
                'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vMTAuMTAuMTUwLjUwOjgwODAvYXBpLyIsInN1YiI6InRqYy1zY2hlZHVsaW5nfDUiLCJleHAiOjE1OTI0MjU4MTAsInR5cGUiOiJwd2RfcmVzZXQiLCJpYXQiOjE1OTIzMzk0MTB9.bqeHAuasRzGfhp5oTTVpwJjnBYuM8wyX49Z7v_pQmFFOGLsSdS1QGxkvZMyW7ThQ1n00y3C2xmO1slhf3vTfywIQem-jeC0ZY-LSTsmv-9-B8qqOnNsJy1oG156Jdb-8jp0F1HqBni3lvZemcUmh-SHZlEQ6B8cLWlZTi-BWWMx5nlL8NWPlh4poyRL5-tI4NwUmsMk_PmGRR9aEYovU7w3sW5Wteee98H_XJnN3mskfPcZeoXvrE_5GA44mkEser-26q1JJcVVpHUY2MIJdKBju8uYFMqbIrh0dCJT8jcL7-1a-e3yNqxWzMAd1tsjTLh4FDQbg-VVEFBf4DIdjdv4VADd8nwtqt_rNavqaJU1LE6sSJeeyFN7fyfoctZ6GNoVyJFd1LcpnBOON1XqbRIyo-eHzIBS25BcZHAFZWNxJ0eZViLaFksTyPbVWreUwlx-LsEx4QjNfU7y18NunHdlNy1gJp_yKM-YThxu3AEYxNQeQIHcyTqB9nny_S1nS1L7Q4LN2PRJFHpkTNhxlFGPQ-PeFb76ESWjxZN8xAiRVxpLRajY7oXvy5KLuZBKvRk3gMzZG3ZRTvgGmpxLfZHgS5_l6WlnSYYhzXKQVEQ5QDvy-oKit86mmPfQQ11eXRRNidgsndt_8I-vPumQWlXJxCpJ0BLW235I_Sd6Q0-s',
        },
    });
}

export function authenticateLogin(email: string, password: string) {
    return axios.post(`${secretIp}/api/authentication/login`, {
        email: email,
        password: password,
    });
}
