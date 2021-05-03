<template>
  <b-container fluid>
    <b-row align-h="start">
      <b-col cols="12" class="mb-3">
        <slot name="title"></slot>
      </b-col>
    </b-row>
    <b-row align-h="start">
      <b-col cols="6" cols-sm="4" cols-md="2" class="mb-5">
        <b-button variant="outline-primary" @click="goBack">
          <font-awesome-icon :icon="goBackIcon" />
          Go Back
        </b-button>
      </b-col>
    </b-row>
    <slot />
  </b-container>
</template>

<script>
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'ed-content-screen',
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  },
  computed: {
    goBackIcon() {
      return faArrowCircleLeft;
    }
  },
}
</script>

<style>

</style>