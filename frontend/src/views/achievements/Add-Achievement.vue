<template>
  <ed-form
    title="Add Achievement"
    :props="formProps"
    :resource="{ name: 'achievements', type: 'add', apiPath: getUserEndpoint('achievements') }"
    completedLink="/my-career/achievements"
  ></ed-form>
</template>

<script>
import EdForm from '../../components/form/Form.vue';
import UserMixin from '../../mixins/user.mixin';
import { achievementFormProps } from '../../utils/constants';

export default {
  name: 'ed-add-achievement',
  data: () => ({
    formProps: achievementFormProps
  }),
  components: { EdForm },
  mixins: [UserMixin],
}
</script>

<style>

</style>