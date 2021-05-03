<template>
  <ed-content-screen>
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
  </ed-content-screen>
</template>

<script>
import EdContentScreen from '../ContentScreen';

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
  components: { EdContentScreen }
}
</script>

<style>

</style>