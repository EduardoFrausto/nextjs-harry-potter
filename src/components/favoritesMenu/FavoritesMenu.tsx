"use client";
import {FC, useEffect, useState} from "react";
import styles from './favoritesMenu.module.css'
import Image from "next/image";
import favoritesIcon from '../../../public/svg/favorites.svg'
import addUser from '../../../public/svg/addUser.svg'
import {useAppDispatch, useAppSelector} from "@/redux/app/hooks";
import {getFavoriteCharacters, setIsOpenNewCharacterModal} from "@/redux/features/characterSlice";
import FavoriteCharacterListItem from "@/components/favoriteCharacterListItem/FavoriteCharacterListItem";

const FavoritesMenu: FC = () => {
    const {favoriteCharacters} = useAppSelector(state => state.characterSlice)

    const [showFavorites, setShowFavorites] = useState(false)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getFavoriteCharacters())
    }, [dispatch])

    const toggleShowFavorites = () => setShowFavorites(prevState => !prevState)
    const openNewCharacterModalHandler = () => dispatch(setIsOpenNewCharacterModal(true))

    return (
        <div className={styles.favoritesMenuContainer}>
            {showFavorites ? (
                <div className={styles.favoritesListContainer}>
                    {favoriteCharacters.map((character, index) => (
                        <FavoriteCharacterListItem
                            key={`favorite-${character.id}`}
                            id={character.id}
                            name={character.name}
                            image={character.image}
                            isLastIndex={index + 1 === favoriteCharacters.length}
                        />
                    ))}
                </div>
            ) : null}
            <div className={styles.tabButtonsContainer}>
                <button className={[styles.tabButton, styles.leftTabButton].join(' ')} onClick={toggleShowFavorites}>
                    Favoritos <Image src={favoritesIcon} alt={'Favorites icon'}/>
                </button>
                <button
                    className={[styles.tabButton, styles.rightTabButton].join(' ')}
                    onClick={openNewCharacterModalHandler}>
                    Agregar <Image src={addUser} alt={'Add user icon'}/>
                </button>
            </div>
        </div>
    )
}

export default FavoritesMenu
