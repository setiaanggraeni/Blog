<template>
  <div class="row mb-2">
    <div class="col-md-12" v-for="content in postPerContent" v-bind:key="content['.key']">
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
      <div class="col-md-8 blog-main">
        <hr>
        <div class="form-group forComment" v-if="seen">
          <label for="comment" style="font-size:20px;">Leave a comment:</label>
          <textarea class="form-control col-md-9" v-model="theComment" rows="5"></textarea>
          <button @click="postComment" style="border-radius:7px;background-color:pink;">Comment</button>
        </div>

        <div v-else>
          <form>
            <label for="comment" style="font-size:20px;">Please login to leave a comment:</label>
            <div class="form-row align-items-center">
              <div class="col-auto">
                <input type="text" v-model="visitorName" style="height:40px;border-radius:5px" placeholder="Your Name...">
              </div>
              <div class="col-auto">
                  <input type="text" v-model="visitorEmail" style="height:40px;border-radius:5px" placeholder="Your Lastname...">
              </div>
              <div class="col-auto">
                <button @click="loginVisitor" class="btn btn-primary">Login</button>
              </div>
            </div>
          </form>
        </div>
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
      dataComment: [],
      visitorName: '',
      visitorEmail: '',
      seen: false,
      theComment: ''
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
    },
    postComment () {
      // console.log('ini dr post satuan --------',this.postPerContent[0].title)
      var name = localStorage.getItem('username')
      firebase.database().ref('contents/' + this.postPerContent[0].title + '/comment').push({
        commentPost: this.theComment,
        userComment: name,
        timeComment: new Date().toString()
      })
      this.theComment = ''
      alert('Successfuly add new comment!')
    },
    loginVisitor () {
      firebase.database().ref('visitors/' + this.visitorEmail).set({
        email: this.visitorEmail,
        username: this.visitorName
      })
      localStorage.setItem('username', this.visitorName)
      this.visitorEmail = ''
      this.visitorName = ''
      this.seen = true
    }
  }
}
</script>
