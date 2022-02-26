<template>
    <div>
    <section class="section section-shaped">
    <div class="container pt-lg-7 pb-lg-7">
      <div class="row">
        <div class="col-md-6">
          <login/>
        </div>

        <div class="col-md-6">
          <register/>
        </div>
      </div>
    </div>
  </section>
    </div>
</template>
<script>
import Register from './Register.vue'
import Login from './Login.vue'
export default {
  components:{Register,Login}
}
</script>