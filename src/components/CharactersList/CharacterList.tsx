import {FC, useCallback, useEffect} from "react";
import styles from './characterList.module.css'
import {useAppDispatch, useAppSelector} from "@/redux/app/hooks";
import CharacterCard from "@/components/characterCard/CharacterCard";
import {getCharactersByPage} from "@/redux/features/characterSlice";

const CharacterList: FC = () => {
    const {characters, loadingCharacter, totalPages, _page} = useAppSelector(state => state.characterSlice)

    const dispatch = useAppDispatch()

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 < document.documentElement.scrollHeight) {
            return
        }
        if (loadingCharacter) {
            return;
        }
        if (_page > totalPages) {
            return;
        }
        dispatch(getCharactersByPage({_page}))
    }, [_page, dispatch, loadingCharacter, totalPages])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [handleScroll])

    return (
        <div className={styles.characterListContainer}>
            {characters.map(character => (
                <CharacterCard
                    className={styles.characterCard}
                    key={character.id}
                    image={character.image}
                    name={character.name}
                    alive={character.alive}
                    hogwartsStudent={character.hogwartsStudent}
                    hogwartsStaff={character.hogwartsStaff}
                    dateOfBirth={character.dateOfBirth}
                    gender={character.gender}
                    eyeColour={character.eyeColour}
                    hairColour={character.hairColour}
                    house={character.house}
                    isFavorite={false}
                />
            ))}
        </div>
    )
}


export default CharacterList
