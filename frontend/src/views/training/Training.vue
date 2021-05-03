<template>
  <div class='ed-training'>
    <h1 class='mb-5'>Learning</h1>
    <ed-search-filter></ed-search-filter>

    <!-- Users vidoes they are currently watching -->
    <ed-carousel-card
      cardTitle='In-Progress Videos'
      errorText="You do not have any current in-progress videos."
      :items="userInProgressVideos"
    >
      <template v-slot:default="slotProps">
        <ed-video-player
          :videoId="slotProps.item.training_id"
          :url="slotProps.item.url"
        ></ed-video-player>
      </template>
    </ed-carousel-card>

    <!-- Users vidoes they are interested in -->
    <ed-carousel-card
      cardTitle='Interested Videos'
      errorText="You do not have any current videos you are interested in."
      :items="userInterestedVideos"
    >
      <template v-slot:default="slotProps">
        <ed-video-player
          :videoId="slotProps.item.training_id"
          :url="slotProps.item.url"
        ></ed-video-player>
      </template>
    </ed-carousel-card>

        <!-- Users vidoes they have completed -->
    <ed-carousel-card
      cardTitle='Completed Videos'
      errorText="You do not have any videos you have recently completed."
      :items="userCompletedVideos"
    >
      <template v-slot:default="slotProps">
        <ed-video-player
          :videoId="slotProps.item.training_id"
          :url="slotProps.item.url"
        ></ed-video-player>
      </template>
    </ed-carousel-card>

    <!-- Users vidoes that are most watched -->
    <ed-carousel-card
      cardTitle='Most-watched videos'
      errorText="No most-watched videos available to watch"
      :items="mostPopularVideos"
    >
      <template v-slot:default="slotProps">
        <ed-video-player
          :videoId="slotProps.item.training_id"
          :url="slotProps.item.url"
          showInterested
        ></ed-video-player>
      </template>
    </ed-carousel-card>

    <!-- Users vidoes that are highly rated -->
    <ed-carousel-card
      cardTitle='Highest-rated videos'
      errorText="No popular videos available to watch"
      :items="highestRatedVideos"
    >
      <template v-slot:default="slotProps">
        <ed-video-player
          :videoId="slotProps.item.training_id"
          :url="slotProps.item.url"
          showInterested
        ></ed-video-player>
      </template>
    </ed-carousel-card>
  </div>
</template>

<script>
import agent from '../../utils/agent';
import { cloneDeep } from 'lodash';

import EdSearchFilter from '../../components/SearchFilter';
import EdVideoPlayer from '../../components/VideoPlayer';
import EdCarouselCard from '../../components/CarouselCard';
import UserMixin from '../../mixins/user.mixin';

export default {
  name: 'ed-training',
  mounted() {
    this.getAllTrainingVideos();
    this.getUserTrainingVideos();
  },
  data: () => ({
    trainingVideos: [],
    mostPopularVideos: [],
    highestRatedVideos: [],
    userTrainingVideos: [],
    userInProgressVideos: [],
    userInterestedVideos: [],
    userCompletedVideos: []
  }),
  methods: {
    async getAllTrainingVideos() {
      this.trainingVideos = await agent.getTrainingVideos();
    },
    async getMostWatchedVideos() {
      const _videos = cloneDeep(this.trainingVideos);
      this.mostPopularVideos = _videos.sort(video => video.views).slice(0, 10);
    },
    async getHighestRatedVideos() {
      const _videos = cloneDeep(this.trainingVideos);
      this.highestRatedVideos = _videos.filter(video => video.rating > 0).sort(video => video.rating).slice(0, 10);
    },
    async getUserTrainingVideos() {
      this.userTrainingVideos = await this.getUserTrainings();
    },
    getUserInProgressVideos() {
      this.userInProgressVideos = this.userTrainingVideos.filter(video => video.status === 'pending');
    },
    getUserInterestedVideos() {
      this.userInterestedVideos = this.userTrainingVideos.filter(video => video.status === 'interested');
    },
    getUserCompletedVideos() {
      this.userCompletedVideos = this.userTrainingVideos.filter(video => video.status === 'watched');
    }
  },
  watch: {
    trainingVideos() {
      this.getMostWatchedVideos();
      this.getHighestRatedVideos();
    },
    userTrainingVideos() {
      this.getUserInProgressVideos();
      this.getUserInterestedVideos();
      this.getUserCompletedVideos();
    }
  },
  mixins: [UserMixin],
  components: { EdSearchFilter, EdCarouselCard, EdVideoPlayer }
}
</script>

<style>
.ed-training-search.form-control {
  width: 95%;
  display: inline-block;
}

.ed-training-search-icon {
  width: 5%;
  cursor: pointer;
}
</style>