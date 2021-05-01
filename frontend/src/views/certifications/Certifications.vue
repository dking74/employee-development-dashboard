<template>
  <ed-card
    title="Certifications"
    :data="certifications"
    :dataHeaders="['name', 'description']"
    :headerAction="{ text: 'Add Certification', link: '/my-career/certifications/add' }"
    @edit="_editCertification"
    @delete="_deleteCertification"
  ></ed-card>
</template>

<script>
import UserMixin from '../../mixins/user.mixin';
import EdCard from '../../components/Card';
import ToastMixin from '../../mixins/toast.mixin';

export default {
  name: 'ed-certifications',
  data: () => ({
    certifications: []
  }),
  async mounted() {
    this.certifications = await this.getCertifications();
  },
  methods: {
    async _editCertification(event) {
      const certificationId = event.certification_id;
      this.$router.push({ name: 'Edit-Certification', params: { certificationId }});
    },
    async _deleteCertification(event) {
      const certificationId = event.certification_id;
      await this.deleteCertification(certificationId)
        .then(() => {
          this.showToast('Successfully deleted certification');
          setTimeout(() => window.location.reload(), 2000);
        })
        .catch(() => {
          this.showToast('Unable to delete certification');
        });
    }
  },
  components: { EdCard },
  mixins: [UserMixin, ToastMixin]
}
</script>

<style>

</style>