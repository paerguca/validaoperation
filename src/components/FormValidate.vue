<template lang="pug">
  section#FormValidate
    nav
      .valign-wrapper.nav-wrapper.light-blue.darken-3
        h5.center-align {{msg}}
    form.col.s12
      .card-panel.z-depth-3.hoverable.col.l6.s12
        .row
          .input-field.col.m4.s12
            select.icons(v-model='operacion.banco')
              option(value='' disabled selected) Banco
              option(v-for='banco in bancos') {{ banco }}
              
          .input-field.col.m4.s12
            select.icons(v-model='operacion.moneda')
              option(value='' disabled selected) Moneda
              option(v-for='moneda in monedas') {{moneda}}
              
          .input-field.col.m4.s12
            select.icons(v-model='operacion.titular')
              option(value='' disabled selected) Titular
              option(v-for='titular in titulares') {{titular}}
          
        .row
          .input-field.col.s12(value='')
            input(id='nro_op'
              type='text'
              class='validate' v-model.lazy='operacion.nro_operacion' required)
            label(for="nro_op") Número de operación

        a.waves-effect.waves-light.btn.modal-trigger.light-blue.darken-3(href='#modal1' v-on:click.prevent='post') Enviar

        #modal1.modal.bottom-sheet
          .modal-content.s12
            .row
              .col.s12(v-if='!duplicated')
                ul.collection.with-header
                  li.collection-header
                    blockquote
                      h4(class='light-blue-text text-darken-3') Se registró la operacion!
                  li.collection-item.blue-text Banco: {{operacion.banco}}
                    i.material-icons.left account_balance
                  li.collection-item.blue-text Moneda: {{operacion.moneda}}
                    i.material-icons.left compare_arrows
                  li.collection-item.blue-text Titular: {{operacion.titular}}
                    i.material-icons.left child_care
                  li.collection-item.blue-text Operacion: {{operacion.nro_operacion}}
                    i.material-icons.left attach_money
                  
              .col.s12(v-if='duplicated')
                ul.collection.with-header
                  li.collection-header
                    blockquote
                      h4(class='red-text text-accent-2') Operacion Duplicada!!
                  li.collection-item.red-text Banco: {{dup_operacion.banco}}
                    i.material-icons.left account_balance
                  li.collection-item.red-text Moneda: {{dup_operacion.moneda}}
                    i.material-icons.left compare_arrows
                  li.collection-item.red-text Titular: {{dup_operacion.titular}}
                    i.material-icons.left child_care
                  li.collection-item.red-text Creado: {{dup_operacion.createdAt}}
                    i.material-icons.left date_range
                  li.collection-item.red-text Operacion: {{dup_operacion.nro_operacion}}
                    i.material-icons.left attach_money
                  
</template>

<script>
import operacionService from '../../services/operacion.js'

export default {
  name: 'FormValidate',

  data () {
    return {
      searchQuery: '',
      operaciones: [],
      operacion: {
        banco: '',
        moneda: '',
        titular: '',
        nro_operacion: '',
        createdAt: ''
      },
      saved_operacion: {},
      dup_operacion: {},
      bancos: ['BCP', 'Interbank', 'Scotiabank', 'BBVA Continental'],
      monedas: ['Soles', 'Dolares'],
      titulares: ['Benjamin', 'Naguara', 'Yoselin', 'Kevin', 'Deivid', 'Ramon'],
      submitted: false,
      duplicated: false,
      arr_operaciones: [],
      arr_nop: []
    }
  },
  //created() {
    //this.$http.get('http://localhost:3000/operaciones').then(data => {
      //this.arr_operaciones = data.body
      //for (const op in this.arr_operaciones) {
        //this.arr_nop[op] = this.arr_operaciones[op].nro_operacion
      //}
    //})
  //},

  computed: {
    searchMessage () {
      return `Encontrados: ${this.operaciones.length}`
    }
  },

  methods: {
    search () {
      operacionService.search(this.searchQuery)
        .then(res => console.log(res))
    },
    save () {
      operacionService.save()
    },
    post: function(){
      
      this.$http.post('http://localhost:3000/operaciones', {
        banco: this.operacion.banco,
        moneda: this.operacion.moneda,
        titular: this.operacion.titular,
        nro_operacion: this.operacion.nro_operacion
      }).then(response => {
        console.log(response.status)
        this.saved_operacion = response.body
        this.duplicated = false
      }, response => {
        console.log(response.status)
        this.duplicated = true
        this.dup_operacion = response.body
      })
    }
  },
  
  props: {
    msg: String
  },
  mounted() {
    M.AutoInit(); // That way, it is only initialized when the component is mounted
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  blockquote{
  margin: 20px 0;
  padding-left: 1.5rem;
  border-left: 5px solid #0277bd; /* Just change the color value and that's it*/
}
</style>
