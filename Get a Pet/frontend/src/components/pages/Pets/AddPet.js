import api from '../../../utils/api'

import styles from './AddPet.module.css'

import { useState } from 'react'
import { Navigate } from 'react-router-dom'

/*Hooks */
import useFlashMessage from '../../../hooks/userFlashMessage'

function AddPet(){
    return(
        <section className={styles.addpet_header}>
            <div>
            <h1>Add</h1>
            <p>Depois ele ficará disponível para adoaçãos</p>
            </div>
            <p>Formulário</p>
        </section>
    )
}

export default AddPet