import {FC, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {fetchCriteria} from "./slice";
import {useAppDispatch} from "../../app/hooks";
import {Loading} from "../../components/atoms/Loading/Loading";
import styles from "./style.module.css"
import {HeaderText} from "../../components/atoms/HeaderText/HeaderText";

export const Criteria: FC = () => {
    const state = useSelector((state: RootState) => state.criteriaState)
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCriteria())
    }, [dispatch])

    return <div className={styles.criteriaPagesWrapper}>
        {state.loading ? <Loading/> :
            <div>
                <HeaderText text={"Halaman Kriteria"} fontSize={30} boxHeight={30}/>
            </div>}
    </div>
}
