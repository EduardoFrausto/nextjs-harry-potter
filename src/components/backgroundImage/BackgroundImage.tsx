import {FC} from "react";
import styles from './backgroundImage.module.css'
import Image from "next/image";
import background from '../../../public/images/background.png'

const BackgroundImage: FC = () => {
    return (
        <div className={styles.backgroundImage}>
            <Image className={styles.image} src={background} alt={''} priority/>
        </div>
    )
}

export default BackgroundImage;
