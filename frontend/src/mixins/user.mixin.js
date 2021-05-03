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
      return `users/${this.userId}/${subPath}`;
    },
    /** Achievements */
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
    /** Goals */
    async getGoals() {
      const userId = this.userId;
      return await agent.getGoals(userId);
    },
    async getGoal(goalId) {
      const userId = this.userId; 
      return await agent.getGoal(userId, goalId);
    },
    async deleteGoal(goalId) {
      const userId = this.userId; 
      return await agent.deleteGoal(userId, goalId);
    },
    /** Certifications */
    async createCertification(certId, certBody) {
      const userId = this.userId;
      return await agent.createCertification(userId, certId, certBody);
    },
    async updateCertification(certId, certBody) {
      const userId = this.userId;
      return await agent.updateCertification(userId, certId, certBody);
    },
    async getCertifications() {
      const userId = this.userId;
      return await agent.getCertifications(userId);
    },
    async getCertification(certificationId) {
      const userId = this.userId; 
      return await agent.getCertification(userId, certificationId);
    },
    async deleteCertification(certificationId) {
      const userId = this.userId; 
      return await agent.deleteCertification(userId, certificationId);
    },

    /** User Events  */
    async getUserEvents(queryParams) {
      const userId = this.userId;
      return await agent.getUserEvents(userId, queryParams);
    },
    async getUserEvent(eventId) {
      const userId = this.userId;
      return await agent.getUserEvent(userId, eventId);
    },
    async getUserEventStatus(eventId) {
      const event = await this.getUserEvent(eventId);
      return event.status || 'inactive';
    },
    async isUserSubscribedToEvent(eventId) {
      const userEvent = await this.findEventInUserEvents(eventId);
      if (!userEvent) return false;

      return userEvent.status === 'registered';
    },
    async createUserEvent(eventId, status = 'registered') {
      const userEvent = { userId: this.userId, eventId: eventId, status };
      return await agent.createUserEvent(userEvent);
    },
    async updateUserEventStatus(eventId, status) {
      const userEvent = { userId: this.userId, eventId: eventId, status };
      return await agent.updateUserEvent(userEvent);
    },

    /** UserTraining Status */
    async getUserTrainings() {
      return await agent.getUserTrainings(this.userId);
    },
    async updateUserTrainingStatus(trainingId, status) {
      const userTraining = { userId: this.userId, trainingId, status };

      const isUserTrainingExists = await agent.isUserTrainingExists(this.userId, trainingId);
      return !isUserTrainingExists
        ? await agent.createUserTraining(userTraining)
        : await agent.updateUserTraining(userTraining);
    },
    async deleteUserTraining(trainingId) {
      return await agent.deleteUserTraining(this.userId, trainingId);
    }
  }
}