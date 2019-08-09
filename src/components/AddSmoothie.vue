<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text"> Agregar un nuevo Smoothie</h2>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title"> Nombre: </label>
        <input type="text" name="title" v-model="title">
      </div>
      <div  class="field" v-for="(ing, index) in ingredients" :key="index" >
        <label for="add-ingredient">Ingrediente</label>
        <input type="text" name="ingredient" v-model="ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient"> Agrega ingrediente: </label>
        <input @keydown.tab.prevent="addIng" v-model="another" type="text" name="add-ingredient">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="feedback"> {{feedback}}</p>
        <button class="btn pink">Agregar Smoothie</button>
      </div>
    </form>
  </div>
</template>
<script>

import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'add-smoothie',
  data(){
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    }
  },
  methods:{
    addSmoothie(){
      if (this.title){
        this.feedback = null
        //create a slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+.()'"!\-:@]/g,
          lower: true
        })
        db.collection('smoothies').add( {
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug
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
        this.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'Debes meter a introducir un ingrediente'
      }
    },
    deleteIng(ing){
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing
      })
    }
  }
}
</script>

<style>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-smoothie .field {
  margin: 20px auto;
  position: relative;
}
.feedback {
  color: red;
  font-size: .85em;
}
.add-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
} 
</style>

  