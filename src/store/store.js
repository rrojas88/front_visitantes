
import Vue from "vue"
import Config from './config'


const state = Vue.observable({
    rows: [],
    row:{
        nombre: '',
        correo: '',
        departamento: '',
        ciudad: '',
    },
    departamentos: [],
    ciudades: [],
    showModal: false
})



export const getDepartment = async () => {

    const strDepartamentos = localStorage.getItem('departamentos')

    if( strDepartamentos === undefined || strDepartamentos === null )
    {
        fetch(`${Config.URL_DEPTOS}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            }
        })
        .then( res => res.json() )
        .catch( err => console.error( 'Error:', err ) )
        .then( response => {
            state.departamentos = response

            const stringDepartamentos = JSON.stringify( response )

            localStorage.setItem('departamentos', stringDepartamentos)
        })
    }
    else{
        const objDepartamentos = JSON.parse( strDepartamentos )

        state.departamentos = objDepartamentos
    }
}


export const filterCity = ( dep ) => {
    state.ciudades = state.departamentos[ dep ]
}


export const sendDataToServer = ( data ) => {
    fetch(`${Config.URL_BASE}/guests`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
        }
    })
    .then( res => res.json() )
    .catch( err => console.error( 'Error:', err ) )
    .then( response => {
        if( response.error )
            alert( response.message )
        else
            showHideModal( true )
    })
}


export const showHideModal = ( option ) => {
    state.showModal = option
}


export const getRows = (  ) => {
    fetch(`${Config.URL_BASE}/guests`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    })
    .then( res => res.json() )
    .catch( err => console.error( 'Error:', err ) )
    .then( response => {
        if( response.error )
            alert( response.message )
        else
            state.rows = response.list
    })
}


export default state;
