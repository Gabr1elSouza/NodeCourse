import { useState } from "react"

import formStyle from './form.module.css'

import Input from './input'

function PetForm({handleSubmit, petData, btnText}){
    const [pet, setpet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclados"]

    function onFileChange(e){

    }

    function handleChange(e){
        
    }

    return <form className={formStyle.form_container}>
        <Input
        text="Imagens do pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
        />
        <Input
        text="Nome do Pet"
        type="text"
        name="name"
        handleOnChange={handleChange}
        />

    </form>
}

export default PetForm