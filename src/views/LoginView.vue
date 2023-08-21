<template>
  <main class="login">
    <section class="forms">
      <form class="register" @submit.prevent="register">
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email address"
          v-model="register_form.email"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="register_form.password"
        />
        <input type="submit" value="Register" />
      </form>

      <form class="login-1" @submit.prevent="login">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email address"
          v-model="login_form.email"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="login_form.password"
        />
        <input type="submit" value="Login" />
      </form>
    </section>
  </main>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const login_form = ref({});
    const register_form = ref({});
    const store = useStore();

    const login = () => {
      store.dispatch("login", login_form.value);
    };

    const register = () => {
      store.dispatch("register", register_form.value);
    };

    return {
      login_form,
      register_form,
      login,
      register,
    };
  },
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #49b06c; /* Background color */
}

.forms {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

form {
  width: 300px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type="submit"] {
  background-color: #49b06c;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

input[type="submit"]:hover {
  background-color: #407855;
}
</style>
