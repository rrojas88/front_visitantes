<template>
	<div class="container">
    <section>

      <Header />
      <h2>Prueba de desarrollo Sigma</h2>
      <ArticleInfo />

      <div class="row">
        <SigmaImg />
        <GuestRegister />
      </div>

    </section>
  </div>
</template>

<script>

import Header from './components/Header.vue'
import ArticleInfo from './components/ArticleInfo.vue'
import SigmaImg from './components/SigmaImg.vue'
import GuestRegister from './components/GuestRegister.vue'

export default {
	name: 'App',
	components: {
    Header,
    ArticleInfo,
    SigmaImg,
    GuestRegister
	}
}

</script>

<style>

</style>
