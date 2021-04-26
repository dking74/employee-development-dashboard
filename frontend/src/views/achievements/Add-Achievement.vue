<template>
  <ed-form
    title="Add Achievement"
    :props="formProps"
    :resource="{ name: 'achievements', type: 'add' }"
    completedLink="/my-career/achievements"
  ></ed-form>
</template>

<script>
import EdForm from '../../components/form/Form.vue';

export default {
  name: 'ed-add-achievement',
  computed: {
    formProps() {
      return [
        {
          name: 'title',
          type: 'input',
          label: 'Title',
        },
        {
          name: 'summary',
          type: 'textarea',
          label: 'Summary'
        },
        {
          name: 'completed_date',
          type: 'datepicker',
          label: 'Completed Date',
          inline: true,
          props: {
            style: 'width: 300px',
          }
        },
        {
          name: 'other_comments',
          type: 'textarea',
          label: 'Other Comments'
        }
      ];
    }
  },
  components: { EdForm }
}
</script>

<style>

</style>