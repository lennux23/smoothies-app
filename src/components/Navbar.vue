<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link :to="{name: 'Index'}">
          <span class="nav-title">Ninja Smoothies </span>
          <a href="" class="btn-floating btn-large halfway-fab pink">
            <router-link :to="{name: 'AddSmoothie'}">
              <i class="material-icons">add</i>
            </router-link>
          </a>
        </router-link>
      </div>
    </nav>    
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return{

    }
  }
}
</script>
<style scoped>
.navbar nav{
  padding: 0 15px; 
}
</style>

