<template>
  <b-card
     :header="cardTitle"
     header-tag="h4"
     header-bg-variant="primary"
     header-text-variant="light"
     header-class="mb-3">
    <template v-if="items.length > 0">
        <VueSlickCarousel arrows :rows="1" :slidesPerRow="3" swipe>
          <slot />
        </VueSlickCarousel>
      </template>
      <template v-else>
        <p>{{ errorText }}</p>
      </template>
    </b-card>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';

export default {
  name: 'ed-carousel-card',
  props: {
    cardTitle: {
      required: true,
      type: String,
    },
    items: {
      required: true,
      type: Array,
    },
    errorText: {
      required: true,
      type: String,
    }
  },
  components: { VueSlickCarousel }
}
</script>

<style>

</style>