<template>
  <div class='ed-events'>
    <h1 class='mb-5'>Events</h1>
    <!-- Users upcoming events they are registered for -->
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
            <b-list-group-item><h6>Location:</h6><h6>{{ slotProps.item.location }}</h6></b-list-group-item>
          </b-list-group>
        </b-card>
      </template>
    </ed-carousel-card>

    <!-- Users interested events they showed interest in -->
    <ed-carousel-card
      cardTitle='Your Interested Events'
      errorText="You have no interested events. Check to see if there is anything that you may like!"
      :items="userInterestedEvents"
      v-if="userInterestedEvents.length > 0"
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
            <b-list-group-item><h6>Location:</h6><h6>{{ slotProps.item.location }}</h6></b-list-group-item>
          </b-list-group>
        </b-card>
      </template>
    </ed-carousel-card>

    <!-- Upcoming events user can register for -->
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

    <!-- Popular events to register for -->
    <ed-carousel-card
      cardTitle='Popular events'
      errorText="There are no popular events at this time. Check back later!"
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
  async mounted() {
    this.getAllEvents();
    this.getAllUserEvents();
  },
  data: () => ({
    allEvents: [],
    allUserEvents: [],
    upcomingEvents: [],
    popularEvents: [],
    userUpcomingEvents: [],
    userInterestedEvents: [],
  }),
  methods: {
    async getAllEvents() {
      this.allEvents = await agent.getEvents();
    },
    async getAllUserEvents() {
      this.allUserEvents = await this.getUserEvents();
    },
    async getPopularEvents() {
      this.popularEvents = this.allEvents.filter(event => event.status === 'open' && event.num_registered > 0).sort((e1, e2) => e1.num_registered - e2.num_registered).slice(0, 5);
    },
    async getUpcomingEvents() {
      this.upcomingEvents = this.allEvents.filter(event => event.status === 'open');
    },
    async getUserUpcomingEvents() {
      this.userUpcomingEvents = this.allUserEvents.filter(event => event.status === 'registered');
    },
    async getUserInterestedEvents() {
      this.userInterestedEvents = this.allUserEvents.filter(event => event.status === 'interested');
    }

  },
  watch: {
    allEvents() {
      this.getPopularEvents();
      this.getUpcomingEvents();
    },
    allUserEvents() {
      this.getUserUpcomingEvents();
      this.getUserInterestedEvents();
    }
  },
  mixins: [UserMixin],
  components: { EdCarouselCard }
}
</script>

<style>

</style>