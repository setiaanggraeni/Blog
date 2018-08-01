<template>
  <div class="row mb-2">
    <div class="col-md-6" v-for="content in rawData" v-bind:key="content['.key']">
      <!-- {{allPost}} -->
      <div class="card flex-md-row mb-4 shadow-sm h-md-250">
        <div class="card-body d-flex flex-column align-items-start">
          <strong class="d-inline-block mb-2 text-primary">{{content.category}}</strong>
          <h3 class="mb-0">
            <a class="text-dark" @click="toHome">{{content.title}}</a>
          </h3>
          <div class="mb-1 text-muted">{{String(content.created).slice(4,15)}}</div>
          <p class="card-text mb-auto">{{content.narasi}}</p>
          <a @click="toPost(content.title)" style="color:blue">Continue reading</a>
        </div>
        <img class="card-img-right flex-auto d-none d-lg-block" src="../assets/beach.jpg" alt="Card image cap">
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'forPost',
  props: [],
  data () {
    return {
      rawData: '',
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
        this.rawData = arrContent
        // console.log('raw nya --- ',this.rawData);
        // this.allPost.push(this.rawData[0])
        // this.allPost.forEach(element => {
        //   this.dataComment.push(element.comment)
        // })
        //   var keys = Object.values(this.dataComment[0])
        //   this.allComment = keys
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
