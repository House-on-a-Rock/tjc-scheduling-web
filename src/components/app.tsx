import * as React from 'react';
import axios from 'axios';

export interface IAppProps {}

export default function IApp(props: IAppProps) {
    axios
        .get('http://localhost:8080/api/churches/getAll')
        .then((response) => console.log(response.data));
    return <h1>Hello React Typescript!</h1>;
}
