<template>
    <div class="form-group col-md-8" style="margin-left:20%;margin-top:10%">
      <h3>Login for author only</h3>
      <label for="exampleInputEmail1">Username</label>
      <input type="text" class="form-control" v-model="username" aria-describedby="emailHelp" placeholder="Username">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" v-model="password" placeholder="Password">
      <button @click="login" style="border-radius:5px; background-color:pink">Login</button>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'loginForm',
  props: ['username, password'],
  data () {
    return {
      username: '',
      password: '',
      rawData: []
    }
  },
  methods: {
    login () {
      var dataAuthors = firebase.database().ref('authors/')
      dataAuthors.on('value', snapshot => {
        var authorVal = snapshot.val()
        this.rawData.push(authorVal)
        // console.log("masuk nggak contentVal--------",this.rawData)
        this.rawData.forEach(element => {
          // console.log(element)
          if (element.username === this.username && element.password.toString() === this.password.toString()) {
            this.$router.replace('/dashboard')
          }
        })
      })
    }
  }
}
</script>
