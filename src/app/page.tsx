import BackgroundImage from "@/components/backgroundImage/BackgroundImage";
import Image from "next/image";
import logo from '../../public/svg/logo.svg'
import styles from './page.module.css'
import Filters from "@/components/filters/Filters";


export default function Home() {
    return (
        <main>
            <BackgroundImage/>
            <div className={styles.headerContainer}>
                <Image src={logo} alt={'Harry Potter Logo'}/>
                <h1 className={styles.headerTitle}>Selecciona tu filtro</h1>
            </div>
            <Filters/>
        </main>
    );
}
