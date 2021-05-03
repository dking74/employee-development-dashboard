<template>
  <div class="ed-video-player">
    <vue-plyr ref='videoPlayer'>
      <div class="plyr__video-embed">
        <iframe
          :src="url"
          allowfullscreen
          allowtransparency
        ></iframe>
      </div>
    </vue-plyr>
    <div class='ed-interest-button' v-if="showInterested">
      <b-button block variant="success" class="mt-3">Add as interested</b-button>
    </div>
  </div>
</template>

<script>
import agent from '../utils/agent';

import UserMixin from '../mixins/user.mixin';

export default {
  name: 'ed-video-player',
  mounted() {
    this.$refs.videoPlayer.player.on('playing', ($event) => this.playVideo($event));
    this.$refs.videoPlayer.player.on('ended', ($event) => this.endVideo($event));
  },
  props: {
    videoId: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true
    },
    showInterested: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    playVideo() {
      return Promise.all[
        this.updateUserTrainingStatus(this.videoId, 'pending'),
        agent.updateTrainingViews(this.videoId)
      ];
    },
    endVideo() {
      return this.updateUserTrainingStatus(this.videoId, 'watched');
    },
  },
  mixins: [UserMixin]
}
</script>

<style lang="scss">
.plyr__video-wrapper .plyr__video-embed {
  width: 200px;
  height: 200px;
}

.ed-video-player {
  width: var(--video-player-width, '100%');
  height: var(--video-player-height, '100%');
}
</style>