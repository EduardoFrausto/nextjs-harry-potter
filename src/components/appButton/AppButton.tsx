import {FC, HTMLAttributes, MouseEventHandler, useMemo} from "react";
import styles from './appButton.module.css'

const AppButton: FC<AppButtonProps> = ({className = '', text, isActive = false, onClick}) => {
    const buttonClasses = useMemo(() => {
        const classes: string[] = [styles.appButton]
        if (className) {
            classes.push(className)
        }
        return classes.join(' ')
    }, [className])

    const innerClass = useMemo(() => {
        return isActive ? styles.buttonInnerActive : styles.buttonInner
    }, [isActive])

    return (
        <button onClick={onClick} className={buttonClasses}>
            <div className={innerClass}>
                {text}
            </div>
        </button>
    )
}

type AppButtonProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>
    className?: HTMLAttributes<HTMLButtonElement>['className']
    text: string
    isActive?: boolean
}

export default AppButton
