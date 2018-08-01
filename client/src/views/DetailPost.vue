<template>
  <div class="detPos" style="text-align: justify;">
    <ForNav/>
    <div class="row">
      <div class="col-md-8 blog-main">
        <SinglePost style="margin-top:100px;"/>
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
    // console.log(this.allPost)
  },
  methods: {
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
    }
  }
}
</script>
