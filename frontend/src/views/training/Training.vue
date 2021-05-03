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

        <!-- Users vidoes they are currently watching -->
    <ed-carousel-card
      cardTitle='All videos'
      errorText="No current videos available to watch"
      :items="trainingVideos"
    >
      <template v-slot:default="slotProps">
        <ed-video-player
          :videoId="slotProps.item.training_id"
          :url="slotProps.item.url"
        ></ed-video-player>
      </template>
    </ed-carousel-card>
  </div>
</template>

<script>
import agent from '../../utils/agent';

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
    userTrainingVideos: [],
    userInProgressVideos: [],
  }),
  methods: {
    async getAllTrainingVideos() {
      this.trainingVideos = await agent.getTrainingVideos();
    },
    // async getMostWatchedVideos() {
    //   agent.getTrainingVideos({ })
    // },
    async getUserTrainingVideos() {
      this.userTrainingVideos = await this.getUserTrainings();
    },
    getUserInProgressVideos() {
      this.userInProgressVideos = this.userTrainingVideos.filter(video => video.status === 'pending');
    },
  },
  watch: {
    userTrainingVideos() {
      this.getUserInProgressVideos();
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