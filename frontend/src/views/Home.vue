<template>
  <div class="home">
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Home',
  mounted() {
    this.createInternalUser();
  },
  methods: {
    ...mapActions([
      'isUserExist',
      'createUser',
    ]),
    async isInternalUserExist() {
      const email = this.$auth.user.email;
      return await this.isUserExist(email);
    },
    async createInternalUser() {
      const isUserExist = await this.isInternalUserExist();
      const userInfo = this.$auth.user;
      if (!isUserExist) {
        const user = {
          email: userInfo.email,
          username: userInfo.username || userInfo.nickname || userInfo.email,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
        }
        await this.createUser(user);
      }
    },
  },
}
</script>
