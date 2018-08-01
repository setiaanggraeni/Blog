<template>
  <div class="row mb-2">
    <div class="col-md-12" v-for="content in postPerContent" v-bind:key="content['.key']">
      <!-- {{allPost}} -->
      <h1>{{content.title}}</h1>
      <h5>{{content.narasi}}</h5>
      <hr>
      {{content.content}}
      <hr>
      <div class="commentNih" v-for="perComment in allComment" v-bind:key="perComment['.key']">
        <div class="showComment">
          <div class="row">
            <div class="col-md-8" style="margin-left:15px; border:1px solid grey;border-radius:7px;width:100%;">
              <a style="font-size:17px;color:blue;margin-right:5px;">{{perComment.userComment}}</a>
              <a style="font-size:12px;color:grey">{{String(perComment.timeComment).slice(4,15)}}</a>
              <br>
              {{perComment.commentPost}}
              <br>
            </div>
          </div>
        </div>
        <br>
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
      postPerContent: [],
      allComment: '',
      dataComment: []
    }
  },
  mounted () {
    this.getPost()
  },
  firebase () {
    return {
      allPost: firebase.database().ref('contents')
    }
  },
  methods: {
    getPost () {
      // console.log(this.$route.params.id)
      var dataContents = firebase.database().ref('contents/' + this.$route.params.id)
      dataContents.on('value', snapshot => {
        this.postPerContent.push(snapshot.val())
        // console.log("masuk nggak contentVal yg ini--------", this.postPerContent)
        this.postPerContent.forEach(element => {
          this.dataComment.push(element.comment)
        })
        var keys = Object.values(this.dataComment[0])
        this.allComment = keys
        // console.log('----- ini nih comment',this.allComment)
      })
    }
  }
}
</script>
