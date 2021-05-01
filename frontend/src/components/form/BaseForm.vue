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
    <b-row align-h="start" class="mb-5"> 
      <b-col cols="12">
        <b-form @submit="submitFunc" @reset="clearFunc">
          <slot name="default"></slot>
          <b-button-group class="position-absolute px-3" style="right: 0">
            <slot name="actions">
              <b-button variant="outline-primary" class="mr-2" type="reset">CLEAR</b-button>
              <b-button variant="primary" type="submit">SUBMIT</b-button>
            </slot>
          </b-button-group>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'ed-base-form',
  props: {
    clearFunc: {
      required: false,
      type: Function,
      default: () => {}
    },
    submitFunc: {
      required: true,
      type: Function,
      default: () => {}
    }
  },
  computed: {
    goBackIcon() {
      return faArrowCircleLeft;
    }
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  },
}
</script>

<style>

</style>