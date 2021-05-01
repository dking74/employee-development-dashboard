<template>
  <ed-form
    title="Add Goal"
    :props="formProps"
    :resource="{ name: 'goals', type: 'add', apiPath: getUserEndpoint('goals') }"
    completedLink="/my-career/goals"
  ></ed-form>
</template>

<script>
import EdForm from '../../components/form/Form.vue';
import UserMixin from '../../mixins/user.mixin';
import { goalFormProps } from '../../utils/constants';

export default {
  name: 'ed-add-goal',
  data: () => ({
    formProps: goalFormProps
  }),
  components: { EdForm },
  mixins: [UserMixin],
}
</script>

<style>

</style>