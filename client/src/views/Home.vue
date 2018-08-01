<template>
  <div class="home">
    <ForNavbar/>
    <ForBigPost style="margin-top:80px;"/>
    <ForPost/>
    <ForMainPost/>
    <ForFooter/>
  </div>
</template>

<script>
// @ is an alias to /src
import ForNavbar from '@/components/Navbar.vue'
import ForPost from '@/components/Post.vue'
import ForFooter from '@/components/Footer.vue'
import ForBigPost from '@/components/BigPost.vue'
import ForMainPost from '@/components/MainPost.vue'

export default {
  name: 'home',
  components: {
    ForNavbar, ForPost, ForFooter, ForBigPost, ForMainPost
  }
}
</script>
