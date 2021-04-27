export default {
  name: 'ed-toast-mixin',
  methods: {
    showToast(message, error = false) {
      this.$root.$bvToast.toast(
        message, {
          title: (error) ? 'Error!' : 'Success!',
          variant: (error) ? 'danger' : 'success',
          toaster: 'b-toaster-bottom-center',
          autoHideDelay: 3000,
        }
      );
    }
  }
}