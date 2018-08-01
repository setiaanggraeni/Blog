<template>
  <div class="jumbotron p-3 p-md-5 bg-faded">
    <div class="row" v-for="content in rawData" v-bind:key="content['.key']">
      <div class="col-md-6 px-0">
        <h1 class="display-4 font-italic">{{content.title}}</h1>
        <p class="lead my-3">{{content.narasi}}</p>
          <a @click="toPost(content.title)" style="color:blue">Continue reading</a>
      </div>
      <div class="col-md-6 px-0">
        <img src="../assets/garden-by-the-bay.jpg" style="width:500px;border-radius:7px;">
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'forBigPost',
  props: [],
  data () {
    return {
      rawData: [],
      allPost: [],
      allComment: '',
      theComment: '',
      rawComment: '',
      dataComment: []
    }
  },
  mounted () {
    // console.log('masuk home?')
    this.getPost()
  },
  firebase () {
    return {
      allPost: firebase.database().ref('contents')
    }
  },
  methods: {
    getPost () {
      var dataContents = firebase.database().ref('contents/')
      dataContents.on('value', snapshot => {
        var contentVal = snapshot.val()
        var arrContent = Object.values(contentVal)
        this.rawData.push(arrContent[4])
        // console.log('raw nya --- ',this.rawData)
      })
    },
    toHome () {
      this.$router.replace('/')
    },
    toPost (value) {
      this.$router.replace(`/post/${value}`)
    }
  }
}
</script>
