import {Houses} from "@/models/houses";

export type Character = {
    "name": string,
    "species": string,
    "gender": string,
    "house": Houses,
    "dateOfBirth": string,
    "yearOfBirth": number,
    "ancestry": string,
    "eyeColour": string,
    "hairColour": string,
    "wand": {
        "wood": string,
        "core": string,
        "length": number
    },
    "patronus": string,
    "hogwartsStudent": boolean,
    "hogwartsStaff": boolean,
    "actor": string,
    "alive": boolean,
    "image": string,
    "id": string
}
