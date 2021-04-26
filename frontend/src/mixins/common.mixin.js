export default {
  name: 'ed-common-mixin',
  methods: {
    toUpperCase(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  }
}