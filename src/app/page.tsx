import BackgroundImage from "@/components/backgroundImage/BackgroundImage";
import Image from "next/image";
import {Open_Sans} from 'next/font/google'
import logo from '../../public/svg/logo.svg'
import styles from './page.module.css'

const openSans = Open_Sans({subsets: ['latin']})

export default function Home() {
    return (
        <main className={openSans.className}>
            <BackgroundImage/>
            <div className={styles.headerContainer}>
                <Image src={logo} alt={'Harry Potter Logo'}/>
                <h1 className={styles.headerTitle}>Selecciona tu filtro</h1>
            </div>
        </main>
    );
}
