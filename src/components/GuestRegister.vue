<template>
	<div class="col-12 col-md-6 container-form-register">

		<form action="#" id="form-register">

			<div class="form-group">
				<label for="departamento">Departamento*</label>
				<select 
          class="form-control" 
            id="departamento" 
            v-model="row.departamento" 
            @change="filterCities()"
            >
					<option>...</option>
					<option  
              v-for="(dep, index) in listDepartments" :key="index" 
              :value="index"
              >
              {{ index }}
          </option>
				</select>
			</div>

			<div class="form-group">
				<label for="ciudad">Ciudad*</label>
				<select class="form-control" id="ciudad" v-model="row.ciudad" >
					<option selected >...</option>
					<option  
              v-for="(city, index) in listCities" :key="index" 
              :value="city"
              >
              {{ city }}
          </option>
				</select>
			</div>

			<div class="form-group">
				<label for="nombre">Nombre*</label>
				<input type="text" class="form-control" id="nombre" v-model="row.nombre"  placeholder="Pepito de Jesús" />
			</div>

			<div class="form-group">
				<label for="correo">Correo*</label>
				<input type="email" class="form-control" id="correo" v-model="row.correo"  placeholder="Pepitodejesus@gmail.com" />
			</div>

			<div class="form-group">
				<button 
          type="button" 
          class="btn btn-enviar" 
          @click="sendData()"
          >
            ENVIAR
          </button>
			</div>

		</form>

    <ModalOk v-bind:open="openModal" />
	</div>
</template>

<script>
/*
eslint no-useless-escape: "off"
*/

import store, { 
  getDepartment, 
  filterCity, 
  sendDataToServer, 
} from '../store/store'

import ModalOk from './ModalOk.vue'

export default {
  name: 'GuestRegister',
  components: {
    ModalOk
  },
  data: () => ({
    row: {
      nombre: '',
      correo: '',
      ciudad: '',
      departamento: ''
    }
  }),
  mounted(){
    getDepartment()
  },
  computed: {
    listDepartments(){ return store.departamentos },
    listCities(){ return store.ciudades },
    openModal(){ return store.showModal }
  },
  methods: {
    filterCities( ){
      filterCity( this.row.departamento )
    },
    sendData(){
      
      const regexLetras = /^([a-zA-Z]+[a-zA-Z\s])*$/

      if( this.row.departamento === '' ){
        alert('Por favor seleccione un Departamento')
        return
      }
      else if( this.row.ciudad === '' ){
        alert('Por favor seleccione una ciudad')
        return
      }
      else if( this.row.nombre === '' || this.row.nombre.trim() === '' ){
        alert('Por favor ingrese su nombre')
        return
      }
      else if( ! regexLetras.test( this.row.nombre ) ){
        alert('Por favor ingrese solo letras en su nombre')
        return
      }
      else if( this.row.correo === '' ){
        alert('Por favor ingrese su correo')
        return
      }
      const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      if( ! regexEmail.test( this.row.correo ) ){
        alert('Por favor ingrese un correo válido')
        return
      }

      sendDataToServer( this.row )

      setTimeout( () => {
        this.row.departamento = ''
        this.row.ciudad = ''
        this.row.nombre = ''
        this.row.correo = ''
      }, 800)
    }
  }
}
</script>

<style >
</style>
