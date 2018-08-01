<template>
  <div>
    <ForNav/>
      <div class="row mb-2" style="margin-top:100px;">
      <div class="col-md-6" v-for="content in travelPost" v-bind:key="content['.key']">
        <div class="card flex-md-row mb-4 shadow-sm h-md-250">
          <div class="card-body d-flex flex-column align-items-start">
            <strong class="d-inline-block mb-2 text-primary">{{content.category}}</strong>
            <h3 class="mb-0">
              <a class="text-dark">{{content.title}}</a>
            </h3>
            <div class="mb-1 text-muted">{{String(content.created).slice(4,15)}}</div>
            <p class="card-text mb-auto">{{content.narasi}}</p>
            <a @click="toPost(content.title)" style="color:blue">Continue reading</a>
          </div>
          <img class="card-img-right flex-auto d-none d-lg-block" src="../assets/beach.jpg" alt="Card image cap">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import ForNav from '@/components/Navbar.vue'

export default {
  name: 'forTravel',
  props: [],
  data () {
    return {
      rawData: '',
      travelPost: []
    }
  },
  components: {
    ForNav
  },
  mounted () {
    this.getPost()
  },
  methods: {
    getPost () {
      var dataContents = firebase.database().ref('contents/')
      dataContents.on('value', snapshot => {
        var contentVal = snapshot.val()
        var arrContent = Object.values(contentVal)
        this.rawData = arrContent
        this.rawData.forEach(element => {
          if (element.category === 'Travel') {
            this.travelPost.push(element)
          }
        })
      })
    },
    toPost (value) {
      this.$router.replace(`/post/${value}`)
    }
  }
}
</script>
