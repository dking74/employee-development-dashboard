<template>
  <b-card
     :header="cardTitle"
     header-tag="h4"
     header-bg-variant="primary"
     header-text-variant="light"
     header-class="mb-3"
     body-class="px-5"
     class="ed-carousel-card">
    <template v-if="carouselEnabled">
      <Carousel :perPage="slidesPerRow" navigationEnabled loop :spacePadding="25">  
        <Slide v-for="(item, index) in items" :key="`item-${index}`" class="mr-4">
          <slot name="default" :item="item"/>
        </Slide>
      </Carousel>
    </template>
    <template v-else>
      <p>{{ errorText }}</p>
    </template>
  </b-card>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

import WindowMixin from '../mixins/window.mixin';

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
  computed: {
    carouselEnabled() {
      return (
        this.items &&
        Array.isArray(this.items) &&
        this.items.length > 0
      );
    },
    slidesPerRow() {
      return this.isGreaterThanMedium ? 2 : 1;
    }
  },
  components: { Carousel, Slide },
  mixins: [WindowMixin]
}
</script>

<style lang="scss">
.ed-carousel-card {
  width: fit-content;
  overflow-x: scroll;
}
</style>