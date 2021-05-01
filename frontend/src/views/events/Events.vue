<template>
  <div class='ed-events'>
    <h1 class='mb-5'>Events</h1>
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

    <ed-carousel-card
      cardTitle='Your Upcoming Events'
      errorText="You have no upcoming events. Go get involved!"
      :items="userUpcomingEvents"
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
import agent from '../../utils/agent';
import EdCarouselCard from '../../components/CarouselCard';
import UserMixin from '../../mixins/user.mixin';

export default {
  name: 'ed-events',
  mounted() {
    this.getUpcomingEvents();
    this.getUserUpcomingEvents();
  },
  data: () => ({
    upcomingEvents: [],
    userUpcomingEvents: []
  }),
  methods: {
    async getUpcomingEvents() {
      this.upcomingEvents = await agent.getEvents({ limit: 10, status: 'open' });
    },
    async getUserUpcomingEvents() {
      this.userUpcomingEvents = await this.getUserEvents({ limit: 10, status: 'registered' })
    }
  },
  mixins: [UserMixin],
  components: { EdCarouselCard }
}
</script>

<style>

</style>