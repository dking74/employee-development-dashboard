<template>
    <b-form-group class='mb-5'>
      <b-container fluid>
        <b-row align-h="between">
          <b-col cols='12' md='6' class='mb-3'>
            <span class='d-inline-block w-100'>
              <b-form-input placeholder='Search for videos' class='ed-training-search' v-model='searchTitleText'></b-form-input>
              <b-icon icon='search' class='ed-training-search-icon' @click='searchForVideo'></b-icon>
            </span>
          </b-col>
          <b-col cols='12' md='5'>
            <b-form-select :options='trainingCategories' v-model='searchCategory'></b-form-select>
          </b-col>
        </b-row>
      </b-container>
    </b-form-group>
</template>

<script>
import { trainingCategories } from '../utils/constants';

export default {
  name: 'ed-search-filter',
  data: () => ({
    searchTitleText: '',
    searchCategory: null,
  }),
  props: {
    replaceHistory: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  computed: {
    trainingCategories() {
      return [
        ...trainingCategories,
        { value: null, text: 'Please select a training category' }
      ];
    }
  },
  methods: {
    searchForVideo() {
      if (this.searchTitleText || this.searchCategory) {
        const queryParams = this.searchTitleText ? { title: this.searchTitleText } : { category: this.searchCategory };
        this.searchTitleText = '';
        this.searchCategory = null;
        this.$router.push({ name: 'Search-Training', query: queryParams });
      }
    }
  },
  watch: {
    searchCategory() {
      this.searchForVideo();
    }
  }
}
</script>

<style>

</style>