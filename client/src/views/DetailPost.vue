<template>
  <div class="detPos" style="text-align: justify;">
    <ForNav/>
    <div class="row">
      <div class="col-md-8 blog-main">
        <SinglePost style="margin-top:100px;"/>
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
                  <input type="text" v-model="visitorEmail" style="height:40px;border-radius:5px" placeholder="Your Email...">
              </div>
              <div class="col-auto">
                <button @click="loginVisitor" class="btn btn-primary">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
        <ForAside style="margin-top:100px;"/>
    </div>
    <ForFooter/>
  </div>
</template>

<script>
import SinglePost from '@/components/DetailPost.vue'
import ForNav from '@/components/Navbar.vue'
import ForAside from '@/components/Aside.vue'
import ForFooter from '@/components/Footer.vue'

import firebase from 'firebase'
export default {
  name: 'detail',
  props: {},
  components: {
    SinglePost, ForNav, ForAside, ForFooter
  },
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
  mounted () {
    this.getDetails()
  },
  methods: {
    postComment () {
      var name = localStorage.getItem('username')
      firebase.database().ref('contents/' + this.allPost[0].title + '/comment').push({
        commentPost: this.theComment,
        userComment: name,
        timeComment: new Date().toString()
      })
      this.theComment = ''
      alert('Successfuly add new comment!')
    },
    getDetails () {
      var name = localStorage.getItem('username')
      if (name !== null) {
        this.seen = true
      }
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
    replyComment (val) {
      console.log('test reply-------', val)
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
