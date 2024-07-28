import React, {HTMLAttributes, memo, useMemo} from "react";
import styles from './characterCard.module.css'
import {Houses} from "@/models/houses";
import Image from "next/image";

import flagEmpty from '../../../public/svg/flagEmpty.svg';
import flagFill from '../../../public/svg/flagFill.svg';
import {stringToCapitalCase} from "@/helpers/stringFormatters";

const CharacterCard = memo<CharacterCardProps>(function CharacterCard(
    {
        className,
        image,
        name,
        alive,
        dateOfBirth,
        eyeColour,
        gender,
        hairColour,
        hogwartsStaff,
        hogwartsStudent,
        house,
        isFavorite
    }
) {
    const cardClasses = useMemo(() => {
        const classes: string[] = [styles.cardContainer]
        if (className) {
            classes.push(className)
        }
        return classes.join(' ')
    }, [className])

    const gradientClassName = useMemo(() => {
        switch (house) {
            case Houses.Gryffindor:
                return styles.gryffindorGradient
            case Houses.Hufflepuff:
                return styles.hufflepuffGradient
            case Houses.Ravenclaw:
                return styles.ravenclawGradient
            case Houses.Slytherin:
                return styles.slytherinGradient
            default:
                return styles.noHouseGradient
        }
    }, [house])

    const aliveStatus = useMemo(() => {
        return alive ? 'VIVO' : 'FINADO'
    }, [alive])

    const hogwartsStatus = useMemo(() => {
        return hogwartsStudent ? 'ESTUDIANTE' : hogwartsStaff ? 'STAFF' : 'OTRO'
    }, [hogwartsStaff, hogwartsStudent])

    return (
        <div className={cardClasses}>
            <div className={[styles.imageContainer, gradientClassName].join(' ')}>
                <img className={styles.image} src={image} alt={name}/>
            </div>
            <div className={[styles.dataContainer, !alive ? styles.dataContainerNotAlive : ''].join(' ')}>
                <div className={styles.desktopCharacterInfoRow}>
                    <div className={styles.desktopCharacterStatusRow}>
                        <span className={styles.characterStatus}>{aliveStatus}</span>
                        <span className={[styles.characterStatus, styles.characterStatusSeparator].join(' ')}> / </span>
                        <span className={styles.characterStatus}>{hogwartsStatus}</span>
                    </div>
                    <button className={styles.invisibleButton}>
                        <Image src={isFavorite ? flagFill : flagEmpty} alt={'Favorite icon'}/>
                    </button>
                </div>
                <h3 className={styles.name}>{!alive ? '+' : ''} {name}</h3>
                <div className={styles.mobileCharacterInfoRow}>
                    <div className={styles.mobileCharacterStatusColumn}>
                        <span className={styles.characterStatus}>{aliveStatus}</span>
                        <span className={styles.characterStatus}>{hogwartsStatus}</span>
                    </div>
                    <button className={styles.invisibleButton}>
                        <Image src={isFavorite ? flagFill : flagEmpty} alt={'Favorite icon'}/>
                    </button>
                </div>
                <div className={styles.desktopCharacterDetailsColumn}>
                    <div className={styles.desktopCharacterDetailRow}>
                        <span className={styles.desktopCharacterDetailLabel}>Cumpleaños:</span>
                        <span className={styles.desktopCharacterDetailValue}>{dateOfBirth}</span>
                    </div>
                    <div className={styles.desktopCharacterDetailRow}>
                        <span className={styles.desktopCharacterDetailLabel}>Género:</span>
                        <span className={styles.desktopCharacterDetailValue}>{stringToCapitalCase(gender)}</span>
                    </div>
                    <div className={styles.desktopCharacterDetailRow}>
                        <span className={styles.desktopCharacterDetailLabel}>Color de ojos:</span>
                        <span className={styles.desktopCharacterDetailValue}>{stringToCapitalCase(eyeColour)}</span>
                    </div>
                    <div className={styles.desktopCharacterDetailRow}>
                        <span className={styles.desktopCharacterDetailLabel}>Color de pelo:</span>
                        <span className={styles.desktopCharacterDetailValue}>{stringToCapitalCase(hairColour)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
})

type CharacterCardProps = {
    className?: HTMLAttributes<HTMLDivElement>['className']
    image: string
    name: string
    alive: boolean
    hogwartsStudent: boolean,
    hogwartsStaff: boolean
    dateOfBirth: string
    gender: string
    eyeColour: string,
    hairColour: string
    house: Houses
    isFavorite?: boolean
}

export default CharacterCard
