<template>
  <div class="foods">
      <Foods/>
  </div>
</template>

<script>
// @ is an alias to /src
import Foods from '@/components/Foods.vue'

export default {
  name: 'forFoods',
  components: {
    Foods
  }
}
</script>
