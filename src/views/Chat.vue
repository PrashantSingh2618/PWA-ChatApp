<template>
  <div class="container">
    <div class="chat">
      <div class="chat-header">
        <div class="profile">
          <div class="left">
            <!-- <a class="[this.toggle'description1':'description']" @click="change"
              >Group Info
            </a> -->
            <a class="description" @click="change"> Group Info </a>
            <img src="../assets/logout.png" class="logout" @click="logout" />
            <!-- <button class="description" @click="change">Group Info</button> -->
          </div>
        </div>
      </div>

      <div v-if="this.toggle == true">
        <div class="chat-box">
          <div v-for="user in this.$store.state.users" :key="user.id">
            <div class="chat_list">
              <div class="chat_people">
                <!-- <div class="chat_img">
                  <img src="https://ptetutorials.com/images/user-profile.png" />
                </div> -->
                <div class="chat_ib">
                  <h5>{{ user.name }} has joined the room</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-if="!this.toggle"> -->
      <div class="chat-box">
        <div class="msg_history">
          <div v-if="!this.toggle">
            <div
              v-for="message in this.$store.state.messages"
              :key="message.id"
            >
              <div v-if="message.name === this.$store.state.name">
                <div class="chat-r">
                  <div class="sp"></div>
                  <div class="mess mess-r">
                    <div class="check">{{ message.name }}</div>
                    <br />
                    <p>
                      {{ message.message }}
                    </p>
                    <!-- <br /> -->
                    <div class="time">
                      <span>{{ message.timestamp }} </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="message.name !== this.$store.state.name"
                :key="message.id"
              >
                <div class="chat-l">
                  <div class="mess">
                    <div class="incoming">{{ message.name }}</div>
                    <br />
                    <p>{{ message.message }}</p>
                    <!-- <br /> -->
                    <div class="time">
                      <span>{{ message.timestamp }} </span>
                    </div>
                  </div>
                  <div class="sp"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card-action">
          <CreateMessage />
        </div>
      </div>
    </div>

    <!-- ending of chat box  -->
  </div>
  <!-- </div> -->
</template>

<script>
import CreateMessage from "@/components/CreateMessage";
import fb from "@/firebase/init";
import moment from "moment";
// import { resolve } from "url";
export default {
  name: "Chat",
  components: {
    CreateMessage,
  },
  data() {
    return {
      toggle: 0,
      // network: true
    };
  },
  methods: {
    changeNetworkoffline() {
      // console.log("I am here");
      this.$store.state.network = false;
      console.log("offline", this.$store.state.network);
    },
    changeNetworkonline() {
      // console.log("I am here");
      this.$store.state.network = true;
      console.log("online", this.$store.state.network);
    },
    logout() {
      this.$store.commit("reset");
      // console.log("Logout is called ", this.$store.state.name, " Hey ");
      this.$router.replace({ name: "Login" });
    },
    fetchMessages() {
      let ref = fb.collection("messages").orderBy("timestamp");
      ref.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          // console.log(change);
          if (change.type == "added") {
            let doc = change.doc;
            const fun = doc.data();
            this.$store.commit("storeMessage", {
              id: doc.id,
              name: fun.name,
              message: fun.message,
              timestamp: moment(fun.timestamp).format("LTS"),
              newIndex: change.newIndex,
            });
          }
        });
      });
    },
    change() {
      console.log(this.toggle);
      this.toggle = !this.toggle;
    },
    scroll() {
      let box = document.querySelector(".chat-box");
      box.scrollTop = box.scrollHeight;
    },
    fetchUsers() {
      let ref = fb.collection("users").orderBy("timestamp", "desc");
      ref.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type == "added") {
            let doc = change.doc;
            this.$store.commit("storeUsers", {
              id: doc.id,
              name: doc.data().name,
              newIndex: change.newIndex,
            });
          }
        });
        setTimeout(() => {
          this.scroll();
        }, 10);
      });
    },
  },
  beforeUnmount() {
    window.removeEventListener("offline", this.changeNetworkoffline);
    window.removeEventListener("online", this.changeNetworkonline);
  },
  created() {
    if (!this.$store.state.name) this.$router.replace({ name: "Login" });

    this.fetchUsers();
    window.addEventListener("offline", this.changeNetworkoffline);

    window.addEventListener("online", this.changeNetworkonline);

    this.fetchMessages();
    setTimeout(() => {
      this.scroll();
    }, 1000);
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
.left .a:hover {
  color: hotpink;
}
.profile .description {
  opacity: 1;
  text-decoration: none;
  padding-top: 30px;
  align-items: center;
  color: whitesmoke;
  font-size: 150%;
  background: #036055;
  height: 60px;
  padding-left: 30px;
}
.profile .description1 {
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

/* .profile .logout {
  display: inline-block;
  width: 50px;
  position: absolute;
  top: 5px;
  cursor: pointer;
} */
.profile h2 {
  display: inline-block;
  line-height: 60px;
  vertical-align: bottom;
  color: #fff;
  font-size: 20px;
}
.profile span {
  color: #ccc;
  position: absolute;
  top: 42px;
  left: 100px;
  font-size: 14px;
}
.logout {
  display: inline-block;
  width: 50px;
  margin-left: 140px;
}
.profile .left {
  flex: 1;
}

.chat-box {
  background: url("../assets/bg.jpeg");
  background-attachment: fixed;
  padding-left: 20px;
  overflow-y: scroll;
  flex: 1;
}
.chat-box .img_chat {
  width: 280px;
}

.chat-r {
  display: flex;
}
.chat-r .sp {
  flex: 1;
}

.chat-l {
  display: flex;
}
.chat-l .sp {
  flex: 1;
}

.chat-box .mess {
  width: 70%;
  max-width: 300px;
  background: #f7fcf6;
  padding: 10px;
  border-radius: 10px;
  margin: 20px 0px;
  cursor: pointer;
}
.chat-box .mess p {
  word-break: break-all;
  font-size: 18px;
}
.chat-box .mess-r {
  background: #e2ffc7;
}

.chat-box .check {
  float: left;
  color: #540acb;
  font-weight: bold;
}
.chat-box .incoming {
  float: left;
  font-weight: bold;
  color: #784005;
}
.chat-box .time {
  float: right;
  color: grey;
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
  position: relative;
  cursor: pointer;
}
.chat-footer textarea {
  display: block;
  flex: 1;
  width: 100%;
  height: 50px;
  border-radius: 60px;
  margin: 5px;
  padding: 10px;
  outline: none;
  font-size: 19px;
  padding-left: 40px;
  padding-right: 90px;
  border: 2px solid #ccc;
  color: #555;
  resize: none;
}
.chat-footer .mic {
  display: block;
  width: 55px;
  height: 55px;
  margin-right: 20px;
}

.chat-footer .emo {
  display: block;
  width: 35px;
  height: 35px;
  position: absolute;
  left: 10px;
  top: 12px;
}
.chat-footer .icons {
  position: absolute;
  right: 100px;
  top: 10px;
}
.chat-footer .icons img {
  display: inline-block;
  width: 35px;
  height: 35px;
  margin-left: 5px;
}
</style>

