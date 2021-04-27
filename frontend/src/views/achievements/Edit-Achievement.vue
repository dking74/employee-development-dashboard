<template>
  <ed-form
    title="Edit Achievement"
    :props="formProps"
    :resource="{ name: 'achievements', type: 'edit', apiPath: achievementEndpoint }"
    :completedLink='`/my-career/achievements`'
  ></ed-form>
</template>

<script>
import EdForm from '../../components/form/Form.vue';
import UserMixin from '../../mixins/user.mixin';
import { achievementFormProps } from '../../utils/constants';
import { mapAchievementToForm } from '../../utils/mappers';

export default {
  name: 'ed-add-achievement',
  async mounted() {
    this.achievementId = this.$route.params.achievementId;
    const achievement = await this.getAchievement(this.achievementId);
    this.formProps = mapAchievementToForm(this.formProps, achievement);
  },
  data: () => ({
    achievementId: '',
    formProps: achievementFormProps,
  }),
  computed: {
    achievementEndpoint() {
      return this.getUserEndpoint(`achievements/${this.achievementId}`);
    },
  },
  components: { EdForm },
  mixins: [UserMixin]
}
</script>

<style>

</style>