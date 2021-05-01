<template>
  <ed-form
    title="Edit Goal"
    :props="formProps"
    :resource="{ name: 'goals', type: 'edit', apiPath: goalEndpoint }"
    :completedLink='`/my-career/goals`'
  ></ed-form>
</template>

<script>
import EdForm from '../../components/form/Form.vue';
import UserMixin from '../../mixins/user.mixin';
import { goalFormProps } from '../../utils/constants';
import { mapGoalToForm } from '../../utils/mappers';

export default {
  name: 'ed-add-achievement',
  async mounted() {
    this.goalId = this.$route.params.goalId;
    const goal = await this.getGoal(this.goalId);
    this.formProps = mapGoalToForm(this.formProps, goal);
  },
  data: () => ({
    goalId: '',
    formProps: goalFormProps,
  }),
  computed: {
    goalEndpoint() {
      return this.getUserEndpoint(`goals/${this.goalId}`);
    },
  },
  components: { EdForm },
  mixins: [UserMixin]
}
</script>

<style>

</style>