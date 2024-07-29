import {ButtonHTMLAttributes, FC, HTMLAttributes, MouseEventHandler, useMemo} from "react";
import styles from './appButton.module.css'

const AppButton: FC<AppButtonProps> = (
    {
        className = '',
        text,
        isActive = false,
        onClick,
        type = 'button',
        disable = false
    }
) => {
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
        <button type={type} onClick={onClick} className={buttonClasses} disabled={disable}>
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
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
    isActive?: boolean
    disable?: ButtonHTMLAttributes<HTMLButtonElement>['disabled']
}

export default AppButton
