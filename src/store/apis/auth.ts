import axios from 'axios';
import { secretIp } from '../../../secrets/secretStuff';

export function recoverEmail(email: string) {
    return axios.post(`${secretIp}/api/authentication/sendResetEmail`, {
        email: email,
    });
}

export function checkResetToken(token: string) {
    // console.log(token);

    console.log('checkResetToken', typeof token, token);
    return axios.get(`${secretIp}/api/authentication/checkResetToken`, {
        headers: {
            authorization: token,
        },
    });
}

export function authenticateLogin(email: string, password: string) {
    console.log(email, password);
    return axios.post(`${secretIp}/api/authentication/login`, {
        email: email,
        password: password,
    });
}

export function sendNewPassword(token: string, newPassword: string) {
    return axios.post(
        `${secretIp}/api/authentication/resetPassword`,
        { email: 'shaun.tung@gmail.com', password: newPassword },
        {
            headers: {
                authorization:
                    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vMTAuMTAuMTUwLjUwOjgwODAvYXBpLyIsInN1YiI6InRqYy1zY2hlZHVsaW5nfDIiLCJleHAiOjE1OTI1MTAxODAsInR5cGUiOiJwd2RfcmVzZXQiLCJpYXQiOjE1OTI0MjM3ODB9.REVpOD2n33JENrHQ6ByG6TEQ4tGPztC2FaRbyjvu4anHaNYkaExbDKr3mfEwHJAD2jX9Tn3SI6ydYODQpfAhGM6avjmQ3VZ2HOmrZPSJRboAC9c6KeHIY1L4vXJDgq2vb9XT2iF9ybdxvRHtWhKRMycVa21PYIPjrw3SZz03uvvl0Xnr60bFQbEm-8OKPQstQqG38wGRbzfuMOrTOQ87wFpsFg9MvXQo4gJ-Yq__4_grVTgqpvgdJQg7br9k6pdmL80xo-gkqELR8nj_xL3a92NbpozG2jR-jy5eBDlFA9GfRNoh_redhP6oUmunjp6XTaLDT-Xhp2RN5A3SbTs8u12y8eEHVsFGJINoZ_MkBnbHBvmCinjRzlL8LYbiyW18n2nAwgo54DWSJ3SjalQqUCAtmM8pQeYaJBZ0ZWR_IqOz9auTd1L05iSJdYqJuA8Xdc7i09ZxTMMthG5zqPFEcz_0SRRsPkwJAhuv10fiffjKme_AJVs_9oOOYyi-5Z1EEbT_z4vMehtjHK_DbGFA-kt5u39MxFC1p-6w4hkNnk8lScF3SCwuHyH948d3hcD4_9_r3viAmTZcvmomAJkGqjxuD9Ks6HC1qRoUbAszx7rYQoGKy5x_o6bx5PvoVXOTkm7yd7CnLK0vkOYSGOI2FeB1aKG8Wik9veI95mdeAW8',
            },
        },
    );
}
