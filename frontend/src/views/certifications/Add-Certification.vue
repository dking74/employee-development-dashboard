<template>
  <ed-form
    title="Add Certification"
    :props="formProps"
    :resource="{ name: 'certifications', customSubmit: submitCertifications }"
    completedLink="/my-career/certifications"
  ></ed-form>
</template>

<script>
import EdForm from '../../components/form/Form.vue';
import ToastMixin from '../../mixins/toast.mixin';
import UserMixin from '../../mixins/user.mixin';
import agent from '../../utils/agent';
import { certificationFormProps } from '../../utils/constants';

export default {
  name: 'ed-add-certification',
  data: () => ({
    formProps: certificationFormProps
  }),
  methods: {
    async submitCertifications(form) {
      if (form.name) {
        let file = null;
        if (form.files.length > 0) {
          const uploadFiles = Object.values(await agent.uploadFiles(form.files));
          file = (uploadFiles && uploadFiles.length > 0 && uploadFiles[0]) || null;
        }
        this.createCertification({
          name: form.name,
          description: form.description,
          attachment_url: file
        }).then(() => {
          this.showToast('Successfully created certification');
          this.$router.push({ name: 'Certifications' });
        }).catch((error) => {
          this.showToast(`Unable to create certification: ${error}`, error);
        });
      } else {
        this.showToast('Certification name must be inputted', true);
      }
    }
  },
  components: { EdForm },
  mixins: [UserMixin, ToastMixin],
}
</script>

<style>

</style>