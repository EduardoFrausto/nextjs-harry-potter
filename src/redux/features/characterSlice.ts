import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Character} from "@/models/character";
import {httpClient} from "@/helpers/httpClient";
import {RootState} from "@/redux/app/store";

interface CharacterSliceInitialState {
    fetchStaffCharacters: boolean
    fetchStudentsCharacters: boolean

    characters: Character[]
    _page: number
    totalPages: number
    loadingCharacter: boolean
}

const initialState: CharacterSliceInitialState = {
    fetchStaffCharacters: false,
    fetchStudentsCharacters: true,

    characters: [],
    _page: 1,
    totalPages: 1,
    loadingCharacter: false
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


export const {setFetchStaffCharacters, setFetchStudentsCharacters} = characterSlice.actions;

export default characterSlice.reducer;

export {getCharactersByPage};
