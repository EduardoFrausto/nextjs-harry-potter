"use client";
import BackgroundImage from "@/components/backgroundImage/BackgroundImage";
import Image from "next/image";
import logo from '../../public/svg/logo.svg'
import styles from './page.module.css'
import Filters from "@/components/filters/Filters";
import {useEffect} from "react";
import {useAppDispatch} from "@/redux/app/hooks";
import {getCharactersByPage} from "@/redux/features/characterSlice";
import CharacterList from "@/components/CharactersList/CharacterList";

export default function Home() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCharactersByPage({_page: 1}))
    }, [dispatch])

    return (
        <main>
            <BackgroundImage/>
            <div className={styles.headerContainer}>
                <Image src={logo} alt={'Harry Potter Logo'}/>
                <h1 className={styles.headerTitle}>Selecciona tu filtro</h1>
            </div>
            <Filters/>
            <CharacterList/>
        </main>
    );
}
