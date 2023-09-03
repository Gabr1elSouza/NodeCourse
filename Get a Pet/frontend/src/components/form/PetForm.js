import { useState } from "react"

import formStyle from './form.module.css'

import Input from './input'
import Select from './Select'

function PetForm({handleSubmit, petData, btnText}){
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclados"]

    function onFileChange(e){
        setPet({...pet, images: [...e.target.files]})
    }

    function handleChange(e){
        setPet({...pet, [e.target.name]: e.target.value})

    }

    function handleColor(e){
        setPet({...pet, color: e.target.options[e.target.selectedIndex].text})

    }

    function submit(e){
        e.preventDefault()
        
    }

    return <form onSubmit={submit} className={formStyle.form_container}>
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
        placeholder="Digite o nome"
        handleOnChange={handleChange}
        value={pet.name || ''}
        />
        <Input
        text="Idade do Pet"
        type="text"
        name="age"
        placeholder="Digite a idade"
        handleOnChange={handleChange}
        value={pet.age || ''}
        />
        <Input
        text="Peso do Pet"
        type="number"
        name="weight"
        placeholder="Digite o peso"
        handleOnChange={handleChange}
        value={pet.weight || ''}
        />
        <Select name="color"
        text="Selecione a cor"
        options = {colors}
        handleOnChange={handleColor}
        value={pet.color || ''}
        />
        <input type="submit" value={btnText}/>
    </form>
}

export default PetForm