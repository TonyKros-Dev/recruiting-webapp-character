import { default as axios} from 'axios';
import { SKILL_LIST } from './consts';

const characterApi = axios.create({
    baseURL: "https://recruiting.verylongdomaintotestwith.ca/api/{TonyKros-Dev}"
});

export const postCharacters = (characters) => characterApi.post("/character", characters).then(response => response.data);
