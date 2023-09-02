import api from '../../../utils/api'

import styles from './AddPet.module.css'

import { useState } from 'react'
import { Navigate } from 'react-router-dom'

/*Hooks */
import useFlashMessage from '../../../hooks/userFlashMessage'

/*Component*/
import PetForm from '../../form/PetForm'

function AddPet(){
    return(
        <section className={styles.addpet_header}>
            <div>
            <h1>Add</h1>
            <p>Depois ele ficará disponível para adoaçãos</p>
            </div>
            <PetForm/>
        </section>
    )
}

export default AddPet