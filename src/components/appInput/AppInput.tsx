import {FC, HTMLAttributes, InputHTMLAttributes} from "react";
import {Open_Sans} from 'next/font/google'
import styles from './appInput.module.css';

const openSans = Open_Sans({subsets: ['latin']})

const AppInput: FC<AppInputProps> = (
    {
        className = '',
        label,
        type,
        onChange,
        value,
        errorMessage = '',
        showErrorMessage = false

    }
) => {
    return (
        <div className={[styles.appInputContainer, className].join(' ')}>
            <label className={'label'} htmlFor={label}>{label}</label>
            <input
                className={[openSans.className, styles.input].join(' ')}
                type={type}
                id={label}
                onChange={onChange}
                value={value}
            />
            {errorMessage && showErrorMessage ? <span className='errorMessage'>{errorMessage}</span> : null}
        </div>
    )
}

type AppInputProps = {
    className?: HTMLAttributes<HTMLDivElement>['className'],
    label?: string,
    type: InputHTMLAttributes<HTMLInputElement>['type']
    value?: InputHTMLAttributes<HTMLInputElement>['value'],
    onChange?: InputHTMLAttributes<HTMLInputElement>['onChange']
    errorMessage?: string
    showErrorMessage?: boolean
}

export default AppInput
