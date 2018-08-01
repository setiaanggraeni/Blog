<template>
  <div>
    <ForNavbar/>
    <div class="formNewPost col-md-8" style="margin-top:100px">
      <p style="font-size:20px">Select Category:</p>
      <select class="form-control form-control-sm" v-model="postCategory">
        <option value="Travel">Travel</option>
        <option value="Foods">Foods</option>
      </select>
      <br>
      <p style="font-size:20px">Title: </p>
      <input type="text" v-model="postTitle" placeholder="Write the post title here..." style="width:100%;border-radius:5px;height:35px;"><br>
      <br>
      <p style="font-size:20px">Short Description: </p>
      <textarea class="form-control" rows="2" v-model="shortDes" placeholder="Write sort description here..."></textarea>
      <br>
      <p style="font-size:20px">Content: </p>
      <textarea class="form-control" rows="5" v-model="theContent" placeholder="Write content here..."></textarea>
      <br>
      <button @click="submitNewPost" class="btnNewPost" style="border-radius:5px;background-color:pink">Submit New Post</button>
      <button @click="blogContent" style="border-radius:5px;background-color:grey">See Post</button>
    </div>
  </div>
</template>

<script >
import Login from '@/components/Login.vue'
import ForNavbar from '@/components/Navbar.vue'
import ForFooter from '@/components/Footer.vue'
import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyBALdwY-sDJ-k-t6zmviZxOzk3vwK9PmME',
  authDomain: 'blog-dfd9d.firebaseapp.com',
  databaseURL: 'https://blog-dfd9d.firebaseio.com',
  storageBucket: ''
}
firebase.initializeApp(config)
export default {
  name: 'forNewBlogPost',
  props: [],
  data () {
    return {
      postCategory: '',
      theContent: '',
      postTitle: '',
      created: '',
      shortDes: '',
      username: '',
      password: ''
    }
  },
  components: {
    Login, ForNavbar, ForFooter
  },
  methods: {
    submitNewPost () {
      firebase.database().ref('contents/' + this.postTitle).set({
        title: this.postTitle,
        category: this.postCategory,
        content: this.theContent,
        narasi: this.shortDes,
        created: new Date().toString(),
        comment: ''
      })
      this.postTitle = ''
      this.postCategory = ''
      this.theContent = ''
      this.created = ''
      this.shortDes = ''
      alert('Successfuly add new content!')
    },
    blogContent () {
      this.$router.replace('/')
    }
  }
}
</script>
