<template >
  <div class="chat-footer">
    <div class="chat-footer">
      <form @submit.prevent="sendMessage" class="chat-footer">
        <input
          type="text"
          placeholder="Type something"
          v-model="this.newMessage"
          autocomplete="off"
          :disabled="isdisabled"
        />
        <img src="../assets/send.png" class="send" @click="sendMessage" />
      </form>
      <br />
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import fb from "@/firebase/init";
export default {
  name: "CreateMessage",
  data() {
    return {
      newMessage: "",
    };
  },
  computed: {
    isdisabled() {
      return !this.$store.state.network;
    },
  },
  methods: {
    scroll() {
      let box = document.querySelector(".chat-footer");
      box.scrollTop = box.scrollHeight;
    },
    sendMessage() {
      if (this.$store.state.network === true) {
        this.newMessage = this.newMessage.trim();

        console.log(this.newMessage);
        if (this.newMessage) {
          fb.collection("messages")
            .add({
              message: this.newMessage,
              name: this.$store.state.name,
              timestamp: Date.now(),
            })
            .then(() => {
              this.scroll();
            })
            .catch((error) => {
              console.log(error);
            });
          setTimeout(() => {
            this.scroll();
          }, 10);
          this.newMessage = "";
        }
      }
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
.chat_img {
  float: left;
  width: 11%;
}
.chat_people {
  overflow: hidden;
  clear: both;
}

.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.chat_ib h5 {
  font-size: 15px;
  color: rgb(12, 12, 12);
  margin: 0 0 8px 0;
}
.container {
  width: 400px;
  margin: auto;
}
.chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f1f0e8;
}
.chat-header {
  display: flex;
  cursor: pointer;
}
.profile {
  width: 100%;
  background: #036055;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0px 10px;
  position: relative;
}

.profile .pp {
  width: 50px;
  display: inline-block;
  border-radius: 50%;
  margin-left: 32px;
}
.profile .description .left .a:hover {
  opacity: 0;
}
.profile .description {
  opacity: 1;
  text-decoration: none;
  padding-top: 10px;
  align-items: center;
  color: white;
  font-size: 150%;
  background: #036055;
  height: 60px;
  padding-left: 30px;
}
.chat-box {
  background: url("../assets/bg.jpeg");
  background-attachment: fixed;
  padding-left: 20px;
  overflow-y: scroll;
  flex: 1;
}

*::-webkit-scrollbar {
  width: 5px;
}
*::-webkit-scrollbar-track {
  background: #f1f1f1;
}
*::-webkit-scrollbar-thumb {
  background: #aaa;
}
*::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.chat-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  position: fixed;
  bottom: 0px;
  cursor: pointer;
}
.chat-footer input[disabled] {
  background-color: rgb(245, 241, 241);
}
.chat-footer input {
  display: block;
  flex: 1;
  width: 100%;
  height: 50px;
  border-radius: 60px;
  margin: 5px;
  padding: 10px;
  outline: none;
  font-size: 19px;
  padding-left: 30px;
  padding-right: 10px;
  border: 2px solid #ccc;
  color: #555;
  /* resize: none; */
}
.chat-footer .send {
  display: block;
  width: 40px;
  height: 35px;
  padding-left: 10px;
  margin-right: 20px;
}
</style>