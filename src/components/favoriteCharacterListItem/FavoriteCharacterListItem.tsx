import {memo} from "react";
import styles from './favoriteCharacterListItem.module.css'
import Image from "next/image";
import trashIcon from '../../../public/svg/trash.svg'
import {useAppDispatch} from "@/redux/app/hooks";
import {updateCharacterFavoriteStatus} from "@/redux/features/characterSlice";

const FavoriteCharacterListItem = memo<FavoriteCharacterListItemProps>(function FavoriteCharacterListItem(
    {image, name, id, isLastIndex}
) {
    const dispatch = useAppDispatch();
    const deleteFavoriteHandler = () => {
        dispatch(updateCharacterFavoriteStatus({isFavorite: false, id, isFromFavorites: true}))
    }
    return (
        <div className={[
            styles.favoriteCharacterContainer, isLastIndex ? styles.favoriteCharacterNoBorderContainer : ''
        ].join(' ')}>
            <img className={styles.image} src={image} alt={name}/>
            <span className={styles.name}>{name}</span>
            <button className={styles.deleteButton} onClick={deleteFavoriteHandler}>
                <Image src={trashIcon} alt={'Delete icon'}/>
            </button>
        </div>
    )
})

type FavoriteCharacterListItemProps = {
    image: string,
    name: string,
    id: string
    isLastIndex: boolean
}

export default FavoriteCharacterListItem
