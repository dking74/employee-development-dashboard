<template>
  <div class="ed-content-loader">
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-skeleton></b-skeleton>
      </template>
    </b-skeleton-wrapper>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ed-content-loader',
  props: {
    loading: {
      required: false,
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>