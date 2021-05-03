<template>
  <div class="home text-center">
    <h2 class="mb-3">Welcome to the Employee Development Dashboard!</h2>
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
      <template v-slot:default="slotProps">
        <b-embed
          type="iframe"
          aspect="16by9"
          :src="slotProps.item.url"
          allowfullscreen
        ></b-embed>
      </template>
    </ed-carousel-card>

    <ed-carousel-card
      cardTitle='Upcoming Events'
      errorText="There are no current upcoming events. Check back later!"
      :items="upcomingEvents"
    >
      <template v-slot:default="slotProps">
        <b-card
          :header="slotProps.item.title"
          border-variant="secondary"
          header-bg-variant="secondary"
          header-text-variant="white"
          align="left"
          @click="$router.push({ name: 'View-Event', params: { eventId: encodeURI(slotProps.item.event_id) }})"
        >
          <b-list-group>
            <b-list-group-item><h6>Event Title:</h6><h6>{{ slotProps.item.title }}</h6></b-list-group-item>
            <b-list-group-item><h6>Summary:</h6><h6>{{ slotProps.item.summary }}</h6></b-list-group-item>
            <b-list-group-item><h6>Date:</h6><h6>{{ slotProps.item.date | formatDate }}</h6></b-list-group-item>
            <b-list-group-item><h6>Registered:</h6><h6>{{ `${slotProps.item.num_registered} / ${slotProps.item.capacity}` }}</h6></b-list-group-item>
          </b-list-group>
        </b-card>
      </template>
    </ed-carousel-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import agent from '../utils/agent';

import EdCarouselCard from '../components/CarouselCard';
import WindowMixin from '../mixins/window.mixin';

export default {
  name: 'Home',
  mounted() {
    this.createInternalUser();

    this.getPopularVideos();
    this.getUpcomingEvents();
  },
  data: () => ({
    popularVideos: [],
    upcomingEvents: [],
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
      this.popularVideos = await agent.getTrainingVideos({ limit: 10, rating: 4 });
    },
    async getUpcomingEvents() {
      this.upcomingEvents = await agent.getEvents({ limit: 10, status: 'open' });
    }
  },
  components: { EdCarouselCard },
  mixins: [WindowMixin]
}
</script>

<style lang="scss">
.ed-carousel-card {
  text-align: left;
  margin-bottom: 25px;
  width: 100%;

  .card-body .card {
    .list-group .list-group-item {
      *:first-child {
        font-weight: bold;
      }
      padding-bottom: 5px;
      padding-top: 5px;
    }
  }
}

.home,
.ed-events,
.ed-training {
  .slick-prev, .slick-next {
    background-color: var(--primary, blue);
  }

  .ed-carousel-card {
    text-align: left;
    margin-bottom: 25px;
    width: 100%;

    .card-body .card {
      cursor: pointer;

      .list-group .list-group-item {
        border: none;
        padding: 0px;
        *:first-child {
          text-decoration: underline;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
