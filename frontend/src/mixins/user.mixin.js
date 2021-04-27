import agent from '../utils/agent';

export default {
  name: 'ed-user-mixin',
  computed: {
    user() {
      return this.$auth.user;
    },
    userEmail() {
      return this.user.email;
    },
    userName() {
      return this.user.name;
    },
    userId() {
      const userId = this.userEmail || this.userName;
      if (!userId) {
        throw new Error('Unable to find the user id of the currently logged in user.');
      }

      return userId;
    }
  },
  methods: {
    getUserEndpoint(subPath) {
      return `/users/${this.userId}/${subPath}`;
    },
    async getAchievements() {
      const userId = this.userId;
      return await agent.getAchievements(userId);
    },
    async getAchievement(achievementId) {
      const userId = this.userId; 
      return await agent.getAchievement(userId, achievementId);
    },
    async deleteAchievement(achievementId) {
      const userId = this.userId; 
      return await agent.deleteAchievement(userId, achievementId);
    },
  }
}