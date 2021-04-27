<template>
  <div class="home">
    <b-img src="/ed-banner-image.png"
      alt="Employee Development Dashboard Banner Image"
      v-bind="{ width: '500px', height: '300px' }"
      fluid rounded center
      class="mb-5"
      v-if="isGreaterThanSmall"
    >
    </b-img>
    <ed-carousel-card
      cardTitle='Popular Videos'
      errorText="There are no current popular videos. Check back later!"
      :items="popularVideos"
    >
      <b-embed v-for="video in popularVideos" :key="video.title"
        type="iframe"
        aspect="16by9"
        :src="video.url"
        allowfullscreen
      ></b-embed>
    </ed-carousel-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import EdCarouselCard  from '../components/CarouselCard';
import WindowMixin from '../mixins/window.mixin';

export default {
  name: 'Home',
  mounted() {
    this.createInternalUser();
  },
  data: () => ({
    popularVideos: []
  }),
  methods: {
    ...mapActions([
      'isUserExist',
      'createUser',
    ]),
    async isInternalUserExist() {
      const email = this.$auth.user.email;
      return await this.isUserExist(email);
    },
    async createInternalUser() {
      const isUserExist = await this.isInternalUserExist();
      const userInfo = this.$auth.user;
      if (!isUserExist) {
        const user = {
          email: userInfo.email,
          username: userInfo.username || userInfo.nickname || userInfo.email,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
        }
        await this.createUser(user);
      }
    },
    async getPopularVideos() {

    }
  },
  components: { EdCarouselCard },
  mixins: [WindowMixin]
}
</script>

<style lang="scss">
.home {
  .slick-prev, .slick-next {
    background-color: var(--primary, blue);
  }
}
</style>
