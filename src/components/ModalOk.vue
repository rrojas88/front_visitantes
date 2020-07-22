<template>
	<div >
	<!-- Inicio Modal -->
	<div 
		class="modal fade show"
		id="modal-ok"
		tabindex="-1"
		role="dialog"
		aria-labelledby="modal-ok-label"
		aria-hidden="true"
		>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modal-ok-label">
						Confirmación
					</h5>
					<button 
						type="button" 
						class="close" 
						data-dismiss="modal" 
						aria-label="Close"
						@click="changeStateModal()"
						>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					Tu información ha sido recibida satisfactoriamente
				</div>
				<div class="modal-footer">
					<button 
						type="button" 
						class="btn btn-success" data-dismiss="modal"
						@click="setShowData()"
						>
						Ver Registros
					</button>
					<button 
						type="button" 
						class="btn btn-secondary" data-dismiss="modal"
						@click="changeStateModal()"
						>
						Cerrar
					</button>
					<br />

					<div class="card" 
						v-if="showData"
						>
  						<div class="card-body alert alert-secondary">
							<table class="table table-striped table-sm">
								<thead>
									<tr>
										<th>Nombre</th>
										<th>Correo</th>
										<th>Departamento</th>
										<th>Ciudad</th>
									</tr>
								</thead>
								<tbody>
									<tr 
										v-for="(row, index) in rows" :key="index" 
										>
										<td>{{ row.nombre }}</td>
										<td>{{ row.correo }}</td>
										<td>{{ row.departamento }}</td>
										<td>{{ row.ciudad }}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
	<!-- FIN Modal -->
	<pre class="debug">{{open}}</pre>
	</div>
</template>

<script>
/*
eslint no-mixed-spaces-and-tabs: "off"
*/

import store, { showHideModal, getRows } from '../store/store'


export default {
	name: 'ModalOk',
	props: [
		'open'
	],
	updated: function (){
		this.$nextTick( function () {
			if( this.open ){
				this.element.style.display = 'block';
      			this.element.removeAttribute('aria-hidden');
      			this.element.setAttribute('aria-modal', true);
			}
			else{
				this.element.style.display = 'none';
				this.element.setAttribute('aria-hidden', true);
				this.element.removeAttribute('aria-modal');
			}
		})
	},
	data: () => ({
		element: null,
		showData: false
	}),
	mounted() {
		this.cargarModal()
	},
	computed: {
		showModal(){
			return store.showModal;
		},
		rows(){
			return store.rows;
		}
	},
	methods: {
		cargarModal(){
			this.element = document.querySelector('#modal-ok')
		},
		changeStateModal(){
			this.showData = false
			showHideModal( false )
		},
		setShowData(){
			this.showData = true
			getRows()
		}
	}
}

</script>


<style >
.debug { display: none; }
</style>
