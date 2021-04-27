<template>
  <ed-card
    title="Achievements"
    :data="achievements"
    :dataHeaders="['title', 'summary', 'completed_date']"
    :headerAction="{ text: 'Add Achievement', link: '/my-career/achievements/add' }"
    @edit="_editAchievement"
    @delete="_deleteAchievement"
  ></ed-card>
</template>

<script>
import UserMixin from '../../mixins/user.mixin';
import EdCard from '../../components/Card';
import ToastMixin from '../../mixins/toast.mixin';

export default {
  name: 'ed-achievements',
  data: () => ({
    achievements: []
  }),
  async mounted() {
    this.achievements = await this.getAchievements();
  },
  methods: {
    async _editAchievement(event) {
      const achievementId = event.achievement_id;
      this.$router.push({ name: 'Edit-Achievement', params: { achievementId }});
    },
    async _deleteAchievement(event) {
      const achievementId = event.achievement_id;
      await this.deleteAchievement(achievementId)
        .then(() => {
          this.showToast('Successfully deleted achievement');
          setTimeout(() => window.location.reload(), 2000);
        })
        .catch(() => {
          this.showToast('Unable to delete achievement');
        });
    }
  },
  components: { EdCard },
  mixins: [UserMixin, ToastMixin]
}
</script>

<style>

</style>