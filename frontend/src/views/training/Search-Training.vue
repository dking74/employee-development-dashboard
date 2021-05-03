<template>
  <div class="ed-search-training">
    <ed-content-screen>
      <ed-search-filter replaceHistory></ed-search-filter>

      <template v-if="trainingVideoResults.length > 0">
        <b-list-group class='ed-search-form mb-3' v-for='trainingVideo in trainingVideoResults' :key='trainingVideo.title'>
          <b-list-group-item>
            <h4 class='mb-3'>{{ trainingVideo.title }}</h4>
            <ed-video-player
              :style="videoSize"
              :videoId='trainingVideo.training_id'
              :url='trainingVideo.url'
              showInterested
            ></ed-video-player>
          </b-list-group-item>
        </b-list-group>
      </template>
      <template v-else>
        <h1>Your search results did not yield any results. Please try again.</h1>
      </template>
    </ed-content-screen>
  </div>
</template>

<script>
import agent from '../../utils/agent';

import EdSearchFilter from '../../components/SearchFilter';
import EdVideoPlayer from '../../components/VideoPlayer';
import EdContentScreen from '../../components/ContentScreen';
import WindowMixin from '../../mixins/window.mixin';

export default {
  name: 'ed-search-training',
  async mounted() {
    const { title, category } = this.$route.query;
    const trainingVideos = await agent.getTrainingVideos({ limit: 10, category });

    // No way to filter training videos by title right now on backend
    // Since dataset will be small, lets do the work on the frontend until
    // this method can be improved.
    this.filterTrainingVideos(trainingVideos, title);
  },
  data: () => ({
    trainingVideoResults: [],
  }),
  methods: {
    filterTrainingVideos(videos, title) {
      this.trainingVideoResults = title
        ? videos.filter(video => video.title.toLowerCase().includes(title.toLowerCase()))
        : videos
    }
  },
  computed: {
    videoSize() {
      return {
        '--video-player-width': (
          this.isGreaterThanMedium ? '500px' :
          this.isGreaterThanSmall  ? '300px' : '100%'
        )
      };
    }
  },
  components: { EdSearchFilter, EdContentScreen, EdVideoPlayer },
  mixins: [WindowMixin]
}
</script>

<style lang="scss">
.ed-search-form.list-group {
  border: none;
}
</style>