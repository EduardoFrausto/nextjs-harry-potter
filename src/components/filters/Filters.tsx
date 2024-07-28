"use client";
import {FC} from "react";
import AppButton from "@/components/appButton/AppButton";
import styles from './filters.module.css'
import {useAppDispatch, useAppSelector} from "@/redux/app/hooks";
import {
    getCharactersByPage,
    setFetchStaffCharacters,
    setFetchStudentsCharacters
} from "@/redux/features/characterSlice";

const Filters: FC = () => {
    const {fetchStaffCharacters, fetchStudentsCharacters} = useAppSelector(state => state.characterSlice)

    const dispatch = useAppDispatch()

    const onClickStaffHandler = () => {
        dispatch(setFetchStaffCharacters(true))
        dispatch(getCharactersByPage({_page: 1}))
    }

    const onClickStudentsHandler = () => {
        dispatch(setFetchStudentsCharacters(true))
        dispatch(getCharactersByPage({_page: 1}))
    }

    return (
        <div className={styles.filtersContainer}>
            <AppButton
                className={styles.filterButton}
                text={'ESTUDIANTES'}
                isActive={fetchStudentsCharacters}
                onClick={onClickStudentsHandler}
            />
            <AppButton
                className={styles.filterButton}
                text={'STAFF'}
                isActive={fetchStaffCharacters}
                onClick={onClickStaffHandler}
            />
        </div>
    )
}

export default Filters
