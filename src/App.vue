<template>
  <div id="nav" class="csum-nav" v-if="$store.state.user">
    <router-link to="/" class="csum-nav-link">Home</router-link>
    <router-link to="/about" class="csum-nav-link">About</router-link>
    <button @click="$store.dispatch('logout')" class="csum-logout-button">
      Logout
    </button>
  </div>
  <router-view />
</template>

<script lang>
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch("fetchUser");
    });
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
.csum-nav {
  background-color: #49b06c;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.csum-nav-link {
  color: white;
  text-decoration: none;
  margin-right: 10px;
  transition: color 0.3s;
}

.csum-nav-link:hover {
  color: rgb(122, 122, 222);
}

.csum-logout-button {
  background-color: rgb(122, 122, 222);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.csum-logout-button:hover {
  background-color: rgb(71, 71, 238);
}
</style>
