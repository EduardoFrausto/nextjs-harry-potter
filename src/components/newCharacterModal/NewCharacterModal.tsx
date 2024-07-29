import {ChangeEvent, FC, FormEvent, useCallback, useEffect, useRef, useState} from "react";
import styles from './newCharacterModal.module.css'
import closeIcon from '../../../public/svg/close.svg'
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/redux/app/hooks";
import {postNewCharacter, setCharacterAdded, setIsOpenNewCharacterModal} from "@/redux/features/characterSlice";
import AppInput from "@/components/appInput/AppInput";
import RadioButton from "@/components/radioButton/RadioButton";
import AppButton from "@/components/appButton/AppButton";
import {fileToBase64} from "@/helpers/fileHelpers";

const NewCharacterModal: FC<NewCharacterModalProps> = ({}) => {
    const {
        isOpenNewCharacterModal,
        loadingPostCharacter,
        characterAdded
    } = useAppSelector(state => state.characterSlice)

    const inputFileRef = useRef<HTMLInputElement>(null)

    const [name, setName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [eyesColor, setEyesColor] = useState('')
    const [hairColor, setHairColor] = useState('')
    const [gender, setGender] = useState<'female' | 'male'>('female')
    const [position, setPosition] = useState<'student' | 'staff'>('student')
    const [base64, setBase64] = useState('')
    const [fileName, setFilename] = useState('')
    const [triedToSubmit, setTriedToSubmit] = useState(false)

    const dispatch = useAppDispatch()

    const closeModalHandler = useCallback(() => {
        dispatch(setIsOpenNewCharacterModal(false))
        setName('')
        setBirthday('')
        setEyesColor('')
        setHairColor('')
        setGender('female')
        setPosition('student')
        setBase64('')
        setFilename('')
        setTriedToSubmit(false)
    }, [dispatch])

    useEffect(() => {
        const className = 'overflow-hidden'
        if (isOpenNewCharacterModal) {
            document.getElementById('htmlTag')?.classList.add(className)
            document.body.classList.add(className)
        } else {
            document.body.classList.remove(className)
            document.getElementById('htmlTag')?.classList.remove(className)
        }
    }, [isOpenNewCharacterModal])

    useEffect(() => {
        if (characterAdded !== null) {
            const tmp = characterAdded
            dispatch(setCharacterAdded(null))
            if (tmp) {
                closeModalHandler()
                alert('Personaje agregado')
            } else {
                alert('Ocurrió un error al agregar el personaje')
            }
        }
    }, [characterAdded, closeModalHandler, dispatch])

    const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)
    const onChangeBirthdayHandler = (e: ChangeEvent<HTMLInputElement>) => setBirthday(e.target.value)
    const onChangeEyesColorHandler = (e: ChangeEvent<HTMLInputElement>) => setEyesColor(e.target.value)
    const onChangeHairColorHandler = (e: ChangeEvent<HTMLInputElement>) => setHairColor(e.target.value)
    const onChangeFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as EventTarget & { files: FileList };
        const file = target.files.item(0);
        if (file) {
            const base64 = await fileToBase64(file);
            setFilename(file.name)
            setBase64(base64)
        }
    }
    const setMaleGenderHandler = () => setGender('male')
    const setFemaleGenderHandler = () => setGender('female')
    const setStudentPositionHandler = () => setPosition('student')
    const setStaffPositionHandler = () => setPosition('staff')

    const openInputFile = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click()
        }
    }

    const isValidForm = () => {
        return !(name.trim().length === 0 ||
            birthday.trim().length === 0 ||
            eyesColor.trim().length === 0 ||
            hairColor.trim().length === 0 ||
            base64.trim().length === 0);
    }

    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault()
        setTriedToSubmit(true)
        if (!isValidForm()) {
            return
        }
        dispatch(postNewCharacter({
            birthdate: birthday, name, image: base64, position, hairColor, gender, eyesColor
        }))
    }

    return isOpenNewCharacterModal ? (
        <div className={styles.backdrop}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.title}>Agregar un personaje</h3>
                    <button className={styles.closeButton} onClick={closeModalHandler}>
                        <Image src={closeIcon} alt={'Close icon'}/>
                    </button>
                </div>
                <form className={styles.form} onSubmit={onSubmitHandler}>
                    <div className={styles.formRow}>
                        <AppInput
                            className={styles.appInput}
                            type={'text'} label={'NOMBRE'} value={name} onChange={onChangeNameHandler}
                            showErrorMessage={triedToSubmit && name.trim().length === 0}
                            errorMessage={'Ingresa un nombre'}
                        />
                        <AppInput
                            className={styles.appInput}
                            type={'date'} label={'CUMPLEAñOS'} value={birthday} onChange={onChangeBirthdayHandler}
                            showErrorMessage={triedToSubmit && birthday.trim().length === 0}
                            errorMessage={'Ingresa una fecha de nacimiento'}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <AppInput
                            className={styles.appInput}
                            type={'text'} label={'COLOR DE OJOS'} value={eyesColor} onChange={onChangeEyesColorHandler}
                            showErrorMessage={triedToSubmit && eyesColor.trim().length === 0}
                            errorMessage={'Ingresa una color de ojos'}
                        />
                        <AppInput
                            className={styles.appInput}
                            type={'text'} label={'COLOR DE PELO'} value={hairColor} onChange={onChangeHairColorHandler}
                            showErrorMessage={triedToSubmit && hairColor.trim().length === 0}
                            errorMessage={'Ingresa una color de pelo'}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.appInput}>
                            <span className={'label'}>GÉNERO</span>
                            <div className={styles.radioButtonRow}>
                                <RadioButton
                                    label={'Mujer'} isChecked={gender === 'female'} onClick={setFemaleGenderHandler}
                                />
                                <RadioButton
                                    label={'Hombre'} isChecked={gender === 'male'} onClick={setMaleGenderHandler}
                                />
                            </div>
                        </div>
                        <div className={styles.appInput}>
                            <span className={'label'}>POSICIÓN</span>
                            <div className={styles.radioButtonRow}>
                                <RadioButton
                                    label={'Estudiante'} isChecked={position === 'student'}
                                    onClick={setStudentPositionHandler}
                                />
                                <RadioButton
                                    label={'Staff'} isChecked={position === 'staff'} onClick={setStaffPositionHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <button type='button' className={styles.fileButton} onClick={openInputFile}>
                        FOTOGRAFÍA {fileName ? `(${fileName})` : ''}
                    </button>
                    {base64.trim().length === 0 && triedToSubmit ?
                        <span className='errorMessage'>Selecciona una imagen</span> : null
                    }
                    <input
                        accept='image/png, image/jpeg'
                        ref={inputFileRef}
                        type='file'
                        className={styles.inputFile}
                        onChange={onChangeFileHandler}
                    />
                    <AppButton text={'GUARDAR'} type='submit' disable={loadingPostCharacter}/>
                </form>
            </div>
        </div>
    ) : null
}

type NewCharacterModalProps = {}

export default NewCharacterModal
