import {FC, MouseEventHandler} from "react";
import styles from './radioButton.module.css'
import Image from "next/image";
import checkedRadioButton from '../../../public/svg/checkedRadioButton.svg'
import unCheckedRadioButton from '../../../public/svg/unCheckedRadioButton.svg'
import {Open_Sans} from "next/font/google";

const openSans = Open_Sans({subsets: ["latin"]});

const RadioButton: FC<RadioButtonProps> = ({isChecked, label, onClick}) => {
    return (
        <button type='button' className={[openSans.className, styles.radioButtonContainer].join(' ')} onClick={onClick}>
            <Image src={isChecked ? checkedRadioButton : unCheckedRadioButton} alt={''}/>
            <span className={styles.label}>{label}</span>
        </button>
    )
}

type RadioButtonProps = {
    isChecked: boolean
    label: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export default RadioButton;
