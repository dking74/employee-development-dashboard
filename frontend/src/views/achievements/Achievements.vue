<template>
  <ed-card
    title="Achievements"
    :data="achievements"
    :headerAction="{ text: 'Add Achievement', link: '/my-career/achievements/add' }"
  ></ed-card>
</template>

<script>
import UserMixin from '../../mixins/user.mixin';
import EdCard from '../../components/Card';

export default {
  name: 'ed-achievements',
  data: () => ({
    achievements: []
  }),
  async mounted() {
    this.achievements = await this.getAchievements();
  },
  components: { EdCard },
  mixins: [UserMixin]
}
</script>

<style>

</style>