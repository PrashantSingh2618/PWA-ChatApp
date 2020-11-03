<template>
  <div class="centered-form">
    <div class="centered-form__box">
      <h2 class="heading">Join Room</h2>
      <br />
      <form @submit.prevent="login" class="text-center">
        <input
          type="text"
          class="form-control"
          placeholder="Enter username"
          name="name"
          v-model="name"
          autocomplete="off"
        />
        <button type="submit" class="btn btn-primary">Enter Room</button>
      </form>
    </div>
  </div>
</template>

<script>
import fb from "@/firebase/init";
export default {
  name: "Login",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    login() {
      if (this.$store.state.name) this.$router.replace({ name: "Chat" });
      else {
        this.name = this.name.trim();
        if (this.name) {
          //   let ref = fb.collection('users');
          //     ref.once('value',(snapshot)=>{
          //         if(snapshot.hasChild(this.name)){
          //             $store.state.errorText ="Name Already Exists"
          //         }
          //     })
          if (!this.$store.state.errorText) {
            this.$router.push({ name: "Chat" });

            this.$store.commit("login", this.name);

            fb.collection("users")
              .add({
                name: this.$store.state.name,
                timestamp: Date.now(),
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      }
    },
  },
  created() {
    if (this.$store.state.name) {
      this.$router.replace({ name: "Chat" });
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

input {
  font-size: 14px;
}

body {
  line-height: 1.4;
  color: #333333;
  font-family: Helvetica, Arial, sans-serif;
}
.heading {
  text-align: center;
}
h1 {
  margin-bottom: 16px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: #777;
}

input {
  border: 1px solid #eeeeee;
  padding: 12px;
  outline: none;
}

button {
  cursor: pointer;
  padding: 12px;
  background: #036055;
  border: none;
  color: white;
  font-size: 16px;
  transition: background 0.3s ease;
}

button:hover {
  background: #05b6a2;
}

button:disabled {
  cursor: default;
  background: #036055;
}

/* Join Page Styles */

.centered-form {
  background: #333744;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.centered-form__box {
  box-shadow: 0px 0px 17px 1px #1d1f26;
  background: #f7f7fa;
  padding: 24px;
  width: 250px;
}

.centered-form button {
  width: 100%;
}

.centered-form input {
  margin-bottom: 16px;
  width: 100%;
}
</style>
