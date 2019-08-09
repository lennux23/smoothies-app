<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Editando {{smoothie.title}} Smoothie</h2>
    <form @submit.prevent="editSmoothie">
      <div class="field title">
        <label for="title"> Nombre: </label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>
      <div  class="field" v-for="(ing, index) in smoothie.ingredients" :key="index" >
        <label for="edit-ingredient">Ingrediente</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field edit-ingredient">
        <label for="edit-ingredient"> Agregar ingrediente: </label>
        <input @keydown.tab.prevent="addIng" v-model="another" type="text" name="edit-ingredient">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="feedback"> {{feedback}}</p>
        <button class="btn pink">Actualizar Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  data(){
    return {
      smoothie: null,
      another: null,
      feedback: null,
    }
  },
  created(){
    let ref = db.collection('smoothies').where('slug', '==',this.$route.params.smoothie_slug)
    ref.get().then( snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data()
        this.smoothie.id = doc.id
      });
    })
  },
  methods: {
    editSmoothie(){
      if (this.smoothie.title){
        this.feedback = null
        //create a slug
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_+.()'"!\-:@]/g,
          lower: true
        })
        db.collection('smoothies').doc(this.smoothie.id).update( {
          title: this.smoothie.title,
          ingredients: this.smoothie.ingredients,
          slug: this.smoothie.slug
        }).then (() => {
          this.$router.push({name: 'Index'})
        }).catch( err => {
          console.log('err :', err);
        })
      } else {
        this.feedback = "Debes de ingresar un título al smoothie"
      }
    },
    addIng(){
      if (this.another){
        this.smoothie.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'Debes meter a introducir un ingrediente'
      }
    },
    deleteIng(ing){
      this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
        return ingredient != ing
      })
    }
  }
}
</script>

<style scoped> 
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}
.feedback {
  color: red;
  font-size: .85em;
}
.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
} 
</style>
