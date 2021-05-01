export default {
  name: 'ed-common-mixin',
  data: () => ({
    loading: false,
  }),
  methods: {
    toUpperCase(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    async triggerAsyncLoadingEvent(callback, ...props) {
      this.loading = true;
      this.$emit('loading', true);

      await callback(...props);

      this.$emit('loading', false);
      this.loading = false;
    }
  }
}