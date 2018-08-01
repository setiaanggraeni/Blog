<template>
  <main role="main" class="container" style="text-align:justify">
    <div class="row">
      <div class="col-md-8 blog-main">
        <div class="row mb-2">
          <div class="col-md-12" v-for="content in allPost" v-bind:key="content['.key']">
            <!-- {{allPost}} -->
            <h1>{{content.title}}</h1>
            <h5>{{content.narasi}}</h5>
            <hr>
            {{content.content}}
          </div>
        </div>
          <label for="comment" style="font-size:20px;">All Comment:</label>
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
                  <button @click="loginVisitor" class="btn btn-primary">Login/Register</button>
                </div>
              </div>
            </form>
          </div>
      </div>
      <ForAside/> <!-- /aside column -->
    </div><!-- /.row -->
  </main>
</template>

<script>
import ForAside from '@/components/Aside.vue'
import firebase from 'firebase'
export default {
  name: 'mainPost',
  props: [],
  data () {
    return {
      rawData: '',
      allPost: [],
      visitorName: '',
      visitorEmail: '',
      seen: false,
      allComment: '',
      theComment: '',
      rawComment: '',
      dataComment: []
    }
  },
  firebase () {
    let firebaseBlog = firebase.database().ref('contents')
    return {
      contentsFromFirebase: firebaseBlog
    }
  },
  mounted () {
    this.getPost()
    localStorage.clear()
    // console.log("testtt",this.contentsFromFirebase);
  },
  components: {
    ForAside
  },
  methods: {
    getPost () {
      var dataContents = firebase.database().ref('contents/')
      dataContents.on('value', snapshot => {
        var contentVal = snapshot.val()
        var arrContent = Object.values(contentVal)
        this.rawData = arrContent
        this.allPost.push(this.rawData[0])
        this.allPost.forEach(element => {
          this.dataComment.push(element.comment)
        })
        var keys = Object.values(this.dataComment[0])
        this.allComment = keys
      })
    },
    postComment () {
      var name = localStorage.getItem('username')
      firebase.database().ref('contents/' + this.allPost.title + '/comment').push({
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
