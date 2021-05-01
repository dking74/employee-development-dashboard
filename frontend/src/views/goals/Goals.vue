<template>
  <ed-card
    title="Goals"
    :data="goals"
    :dataHeaders="['title', 'summary', 'status']"
    :headerAction="{ text: 'Add Goal', link: '/my-career/goals/add' }"
    @edit="_editGoal"
    @delete="_deleteGoal"
  ></ed-card>
</template>

<script>
import UserMixin from '../../mixins/user.mixin';
import EdCard from '../../components/Card';
import ToastMixin from '../../mixins/toast.mixin';

export default {
  name: 'ed-goals',
  data: () => ({
    goals: []
  }),
  async mounted() {
    this.goals = await this.getGoals();
  },
  methods: {
    async _editGoal(event) {
      const goalId = event.goal_id;
      this.$router.push({ name: 'Edit-Goal', params: { goalId }});
    },
    async _deleteGoal(event) {
      const goalId = event.goal_id;
      await this.deleteGoal(goalId)
        .then(() => {
          this.showToast('Successfully deleted goal');
          setTimeout(() => window.location.reload(), 2000);
        })
        .catch(() => {
          this.showToast('Unable to delete goal');
        });
    }
  },
  components: { EdCard },
  mixins: [UserMixin, ToastMixin]
}
</script>

<style>

</style>