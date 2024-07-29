import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Character} from "@/models/character";
import {httpClient} from "@/helpers/httpClient";
import {RootState} from "@/redux/app/store";
import {Houses} from "@/models/houses";

interface CharacterSliceInitialState {
    isOpenNewCharacterModal: boolean,

    fetchStaffCharacters: boolean
    fetchStudentsCharacters: boolean

    characters: Character[]
    _page: number
    totalPages: number
    loadingCharacter: boolean

    favoriteCharacters: Character[]
    loadingFavoriteCharacter: boolean

    loadingUpdateCharacter: boolean

    loadingPostCharacter: boolean
    characterAdded: boolean | null
}

const initialState: CharacterSliceInitialState = {
    isOpenNewCharacterModal: false,

    fetchStaffCharacters: false,
    fetchStudentsCharacters: true,

    characters: [],
    _page: 1,
    totalPages: 1,
    loadingCharacter: false,

    favoriteCharacters: [],
    loadingFavoriteCharacter: false,

    loadingUpdateCharacter: false,

    loadingPostCharacter: false,
    characterAdded: null
};

const characterSlice = createSlice({
    name: 'characterSlice',
    initialState,
    reducers: {
        setFetchStaffCharacters: (state, action: PayloadAction<boolean>) => {
            state.fetchStaffCharacters = action.payload
            state.fetchStudentsCharacters = !action.payload
        },
        setFetchStudentsCharacters: (state, action: PayloadAction<boolean>) => {
            state.fetchStudentsCharacters = action.payload
            state.fetchStaffCharacters = !action.payload
        },
        setIsOpenNewCharacterModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenNewCharacterModal = action.payload
        },
        setCharacterAdded: (state, action: PayloadAction<boolean | null>) => {
            state.characterAdded = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getCharactersByPage.pending, state => {
            state.loadingCharacter = true
        })
        builder.addCase(getCharactersByPage.fulfilled, (state, action) => {
            state.loadingCharacter = false
            if (action.payload) {
                if (action.payload.next === 2) {
                    state.characters = action.payload.data
                } else {
                    state.characters = [...state.characters, ...action.payload.data]
                }
                state._page = action.payload.next ? action.payload.next : state._page + 1
                state.totalPages = action.payload.pages
            } else {
                alert('Ocurrió un error inesperado al consultar los personajes')
            }
        })
        builder.addCase(getCharactersByPage.rejected, state => {
            state.loadingCharacter = false
            alert('Ocurrió un error inesperado al consultar los personajes')
        })

        builder.addCase(getFavoriteCharacters.pending, state => {
            state.loadingFavoriteCharacter = true
        })
        builder.addCase(getFavoriteCharacters.fulfilled, (state, action) => {
            state.loadingFavoriteCharacter = false
            if (action.payload) {
                state.favoriteCharacters = action.payload
            } else {
                alert('Ocurrió un error inesperado al consultar los personajes favoritos')
            }
        })
        builder.addCase(getFavoriteCharacters.rejected, state => {
            state.loadingFavoriteCharacter = false
            alert('Ocurrió un error inesperado al consultar los personajes favoritos')
        })

        builder.addCase(updateCharacterFavoriteStatus.pending, state => {
            state.loadingUpdateCharacter = true
        })
        builder.addCase(updateCharacterFavoriteStatus.fulfilled, (state, action) => {
            state.loadingUpdateCharacter = false
            const payload = action.payload
            if (payload === 500) {
                alert('Ocurrió un error inesperado al actualizar el personaje')
            }
            if (payload === 501) {
                alert('No se pueden tener más de 5 personajes favoritos')
            }
            if (typeof payload === 'object' && typeof payload !== null) {
                const characterIndex = state.characters.findIndex(tmp => tmp.id === payload.id)
                state.characters[characterIndex] = payload;
                if (payload.isFavorite) {
                    state.favoriteCharacters.push(payload)
                } else {
                    state.favoriteCharacters = state.favoriteCharacters.filter(tmp => tmp.id !== payload.id)
                }
            }
        })
        builder.addCase(updateCharacterFavoriteStatus.rejected, state => {
            state.loadingUpdateCharacter = false
            alert('Ocurrió un error inesperado al actualizar el personaje')
        })

        builder.addCase(postNewCharacter.pending, state => {
            state.loadingPostCharacter = true
        })
        builder.addCase(postNewCharacter.fulfilled, (state, action) => {
            state.loadingPostCharacter = false
            const payload = action.payload
            if (payload) {
                if (payload.hogwartsStaff && state.fetchStaffCharacters) {
                    state.characters.push(payload)
                    state.characterAdded = true
                }
                if (payload.hogwartsStudent && state.fetchStudentsCharacters) {
                    state.characters.push(payload)
                    state.characterAdded = true
                }
            }
        })
        builder.addCase(postNewCharacter.rejected, state => {
            state.loadingPostCharacter = false
            state.characterAdded = false
            alert('Ocurrió un error inesperado al actualizar el personaje')
        })
    },
});

const getCharactersByPage = createAsyncThunk(
    'characterSlice/getCharactersByPage',
    async (data: { _page: number }, {getState}) => {
        try {
            const {characterSlice: state} = getState() as RootState
            const params = {
                hogwartsStudent: state.fetchStudentsCharacters,
                hogwartsStaff: state.fetchStaffCharacters,
                _page: data._page,
            }
            const response = await httpClient.get<{
                "first": number,
                "prev": number | null,
                "next": number | null,
                "last": number,
                "pages": number,
                "items": number,
                "data": Character[]
            }>('/characters', {params})
            return response.data
        } catch (e) {
            return null
        }
    }
)

const getFavoriteCharacters = createAsyncThunk(
    'characterSlice/getFavoriteCharacters',
    async () => {
        try {
            const params = {isFavorite: true}
            const response = await httpClient.get<Character[]>('/characters', {params})
            return response.data
        } catch (e) {
            return null
        }
    }
)

const updateCharacterFavoriteStatus = createAsyncThunk(
    'characterSlice/updateCharacterFavoriteStatus',
    async (data: { id: string, isFavorite: boolean, isFromFavorites: boolean }, {getState}) => {
        try {
            const {characterSlice: state} = getState() as RootState;
            const {id, isFromFavorites, isFavorite} = data;
            let characterTmp: Character | undefined = undefined
            characterTmp = (isFromFavorites ? state.favoriteCharacters : state.characters).find(tmp => tmp.id === id)
            if (!characterTmp) {
                return 500
            }
            characterTmp = {...characterTmp}
            characterTmp.isFavorite = isFavorite
            if (isFavorite && state.favoriteCharacters.length >= 5) {
                return 501
            }
            const response = await httpClient.put<Character>(`/characters/${id}`, characterTmp)
            return response.data
        } catch (e) {
            return 500
        }
    }
)

const postNewCharacter = createAsyncThunk(
    'characterSlice/postNewCharacter',
    async (data: {
        name: string,
        birthdate: string,
        eyesColor: string,
        hairColor: string,
        gender: string,
        position: 'staff' | 'student',
        image: string
    }) => {
        try {
            const character: Character = {
                isFavorite: false,
                actor: 'Actor',
                alive: true,
                ancestry: '?',
                dateOfBirth: data.birthdate.split('-').reverse().join('-'),
                eyeColour: data.eyesColor,
                gender: data.gender,
                hairColour: data.hairColor,
                hogwartsStaff: data.position === 'staff',
                hogwartsStudent: data.position === 'student',
                house: Houses.Slytherin,
                id: '.',
                image: data.image,
                name: data.name,
                patronus: '',
                species: 'human',
                wand: {
                    core: '',
                    length: 1,
                    wood: ''
                },
                yearOfBirth: +data.birthdate.split('-')[0]
            }
            const formData: any = {...character}
            delete formData.id
            const response = await httpClient.post<Character>(`/characters`, formData)
            return response.data
        } catch (e) {
            return null
        }
    }
)


export const {
    setFetchStaffCharacters,
    setFetchStudentsCharacters,
    setIsOpenNewCharacterModal,
    setCharacterAdded,
} = characterSlice.actions;

export default characterSlice.reducer;

export {getCharactersByPage, getFavoriteCharacters, updateCharacterFavoriteStatus, postNewCharacter};
