<template>
  <ed-form
    title="Edit Certification"
    :props="formProps"
    :resource="{ name: 'certifications', customSubmit: _updateCertification }"
    :completedLink='`/my-career/certifications`'
  ></ed-form>
</template>

<script>
import EdForm from '../../components/form/Form.vue';
import ToastMixin from '../../mixins/toast.mixin';
import UserMixin from '../../mixins/user.mixin';
import { certificationFormProps } from '../../utils/constants';
import { mapCertificationToForm } from '../../utils/mappers';

export default {
  name: 'ed-edit-certification',
  async mounted() {
    this.certificationId = this.$route.params.certificationId;
    const certification = await this.getCertification(this.certificationId);
    this.formProps = mapCertificationToForm(this.formProps, certification);
  },
  data: () => ({
    certificationId: '',
    formProps: certificationFormProps,
  }),
  computed: {
    certificationEndpoint() {
      return this.getUserEndpoint(`certifications/${this.certificationId}`);
    },
  },
  methods: {
    _updateCertification(form) {
      this.updateCertification(this.certificationId, {
        name: form.name,
        description: form.description,
        // Can't update attachment at moment -- will adjust later.
      }).then(() => {
        this.showToast('Successfully updated certification');
        this.$router.push({ name: 'Certifications' });
      }).catch((error) => {
        this.showToast(`Unable to update certification: ${error.message}`, error);
      });
    }
  },
  components: { EdForm },
  mixins: [UserMixin, ToastMixin]
}
</script>

<style>
.certification-file {
  cursor: hover;
}
</style>