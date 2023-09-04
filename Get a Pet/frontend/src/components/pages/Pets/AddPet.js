import api from '../../../utils/api'

import styles from './AddPet.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/*Hooks */
import useFlashMessage from '../../../hooks/userFlashMessage'

/*Component*/
import PetForm from '../../form/PetForm'

function AddPet(){
    const [token] = useState(localStorage.getItem('token'||''))
    const { setFlashMessage } = useFlashMessage()
    const history = useNavigate()

    async function registerPet(pet){
        let msgType = 'success'

        const formData = new FormData()
        
        await Object.keys(pet).forEach((key)=> {
            if(key === 'images'){
                for(let i= 0;i < pet[key].length; i++){
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key,pet[key])
            }
        })
        const data = await api.post('pets/create', formData,{
            Authorizarion: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data'
        })
        .then((response)=> {
            return response.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
        if(msgType !== 'error'){
            history('/pets/mypets')
        }
    }
    return(
        <section className={styles.addpet_header}>
            <div>
            <h1>Cadastre um Pet</h1>
            <p>Depois ele ficará disponível para adoaçãos</p>
            </div>
            <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet"/>
        </section>
    )
}

export default AddPet