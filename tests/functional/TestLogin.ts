import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export async function login(email: string = 'admin', password: string = 'pass') {
    const endpoint = '/api/v1/login';
    const body = {
        "email": email,
        "password": password
    }
    const response = await axios.post(Env.get('APP_URL') + endpoint, body);
    return response.headers.authorization;
}