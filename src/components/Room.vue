<template>
  <div>
    <span>Usernname :</span>
    <input v-model="username" type="text" placeholder="guppykang" />
    <br />

    <span>Room Code :</span>

    <input v-model="roomNumber" type="text" placeholder="himom" />
    <span class="error-font" v-if="invalid">Room Code already in use</span>
    <br />

    <button @click="getNewCode">Start New Game</button>
    <br />
    <br />

    <span>Join a game room:</span>
    <input v-model="joinCode" type="text" placeholder="yoyo" />
    <br />

    <span>Username</span>
    <input v-model="usernameJoin" type="text" placeholder="guppykang" />
    <span class="error-font" v-if="usernameExists">Username already exists</span>
    <br />

    <button @click="joinRoomHandler">Join</button>
    <span class="error-font" v-if="!roomCodeExists">Room does not exist</span>
    <br />
  </div>
</template>

<script>
import { getNewRoomCode, joinRoom } from "../api/room";
import { getStartGame } from "../api/game";
import { mapActions, mapState } from "vuex";
import io from "socket.io-client";

export default {
  data: () => {
    return {
      socket: io("localhost:5000", { transports: ["websocket"] }),
      roomNumber: "",
      username: "",
      invalid: false,
      joinCode: "",
      usernameJoin: "",
      roomCodeExists: true,
      usernameExists: false
    };
  },
  methods: {
    ...mapActions("room", [
      "clearRoomState",
      "setNewCode",
      "setNewMeIsMaster",
      "setNewMe"
    ]),
    ...mapActions("user", [
      "clearUserState",
      "setNewPlayers",
      "addNewPlayer",
      "setTeamOne",
      "setTeamTwo"
    ]),
    async getNewCode() {
      let response;
      try {
        response = await getNewRoomCode(this.roomNumber, this.username);
      } catch (err) {
        console.log(err);
      }
      if (!response) {
        alert("try a new code, that already exists");
        this.invalid = true;
      } else {
        this.setNewCode(this.roomNumber);
        this.setNewMe(this.username);
        this.setNewPlayers([this.username]);
        this.setNewMeIsMaster(true);
        this.$router.push({ path: "/himom" });
      }
      return response;
    },
    async joinRoomHandler() {
      let gameStartedResponse = await getStartGame(this.joinCode);

      //TODO : Allower users to join a game in the case where they disconnected
      if (gameStartedResponse) {
        alert("game already started. Consult game master.");
        return;
      }

      let joinedStatus = await joinRoom(this.joinCode, this.usernameJoin);

      if (joinedStatus.codeExists && !joinedStatus.usernameExists) {

        console.log(joinedStatus);

        this.setNewPlayers(joinedStatus.players);
        this.setNewMe(this.usernameJoin);
        this.setNewMeIsMaster(false);
        this.setTeamOne(joinedStatus.teamOne);
        this.setTeamTwo(joinedStatus.teamTwo);

        this.socket.emit("PLAYER_ADDED", {
          newPlayer: this.usernameJoin,
          gameCode: this.joinCode
        });
        this.setNewCode(this.joinCode);
        this.$router.push({ path: "/himom" });
      } else {
        if (!joinedStatus.codeExists) {
          this.roomCodeExists = false;
        } else {
          this.roomCodeExists = true;
        }

        if (joinedStatus.usernameExists) {
          this.usernameExists = true;
        } else {
          this.usernameExists = false;
        }
        alert("failed joining the room");
      }
    }
  },
  computed: {
    ...mapState("room", ["code"])
  },
  mounted() {
    this.clearRoomState();
    this.clearUserState();
  }
};
</script>

<style>
.error-font {
  color: red;
}
</style> 

