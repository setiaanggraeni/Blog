<template>
  <div class="formNewPost">
      <NewPost/>
  </div>
</template>

<script>
// @ is an alias to /src
import NewPost from '@/components/Dashboard.vue'

export default {
  name: 'newPost',
  components: {
    NewPost
  }
}
</script>
