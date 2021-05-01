<template>
  <div class="ed-view-event">
    <ed-form :title="`View Event - ${event.title}`" :props="formProps" viewOnly>
      <template slot="actions">
        <span id="register-button" class="d-inline-block" tabindex="0">
          <b-button :variant="interestedVariant" type="submit" :disabled="registerForEventDisabled" class="mr-2" @click="changeInterestInEvent" v-if="!isUserSubscribed">
            <b-icon icon="star-fill"></b-icon>I'm {{ interestedMessageVariant }}
          </b-button>
          <b-button :variant="submitVariant" type="submit" :disabled="registerForEventDisabled" @click="subscribeToEvent">{{ submitMessageVariant }}</b-button>
        </span>
        <b-tooltip
          target="register-button"
          title="The event has been closed from registration. Please contact admin."
          triggers="hover"
          v-if="registerForEventDisabled"
        ></b-tooltip> 
      </template>
    </ed-form>
  </div>
</template>

<script>
import agent from '../../utils/agent';

import EdForm from '../../components/form/Form';
import { viewEventProps } from '../../utils/constants';
import { mapEventToForm } from '../../utils/mappers';
import { formatDate } from '../../utils';
import UserMixin from '../../mixins/user.mixin';
import CommonMixin from '../../mixins/common.mixin';
import ToastMixin from '../../mixins/toast.mixin';

export default {
  name: 'ed-view-event',
  async mounted() {
    await this.triggerAsyncLoadingEvent(async () => {
      const eventId = this.$route.params.eventId;
      this.event = await agent.getEvent(eventId)
        .catch(() => this.$router.push({ name: 'Home' }));

      this.formProps = this.mapFormPropsWithRegisteredValue(
        mapEventToForm(this.formProps, this.event)
      );
      this.userEvents = await this.getUserEvents();
    });
  },
  data: () => ({
    event: {},
    userEvents: [],
    formProps: viewEventProps,
  }),
  computed: {
    registerForEventDisabled() {
      if (this.loading) return true;
      if (this.event.capacity === 0) return false;
      return this.event.num_registered >= this.event.capacity;
    },
    interestedVariant() {
      if (this.loading) return 'secondary';
      return !this.isUserInterested ? 'success' : 'danger';
    },
    interestedMessageVariant() {
      return !this.isUserInterested ? 'interested' : 'uninterested';
    },
    submitVariant() {
      if (this.loading) return 'secondary';
      return !this.isUserSubscribed ? 'primary' : 'danger';
    },
    submitMessageVariant() {
      return !this.isUserSubscribed ? 'Register for Event' : 'De-register from event';
    },
    isUserHaveRelationshipToEvent() {
      const isUserEventCreated = this.eventInUserEvents
      return !!isUserEventCreated;
    },
    isUserSubscribed() {
      const isUserEventCreated = this.eventInUserEvents;
      return (isUserEventCreated && isUserEventCreated.status === 'registered');
    },
    isUserInterested() {
      const isUserEventCreated = this.eventInUserEvents;
      return (isUserEventCreated && isUserEventCreated.status === 'interested');
    },
    eventInUserEvents() {
      return this.userEvents.find(e => e.event_id == this.event.event_id);
    },
  },
  methods: {
    mapFormPropsWithRegisteredValue(formProps) {
      return formProps.map(formProp => {
        if (formProp.name === 'registered') {
          return { ...formProp, value: `${this.event.num_registered} / ${this.event.capacity}` };
        } else if (formProp.name === 'date') {
          return { ...formProp, value: formatDate(formProp.value) };
        } else if (formProp.name === 'organizers') {
          return { ...formProp, value: (!!formProp.value && Array.isArray(formProp.value) && formProp.value.join('\n')) || '' }
        }

        return formProp;
      });
    },
    async subscribeToEvent() {
      await (!this.isUserHaveRelationshipToEvent
        ? this.createUserEvent(this.event.event_id)
        : this.updateUserEventStatus(this.event.event_id, !this.isUserSubscribed ? 'registered' : 'deactive')
      ).then(() => {
        this.showToast(`Successfully ${!this.isUserSubscribed ? 'registered for event.' : 'de-registered for event.'}`);
        setTimeout(() => this.$router.push({ name: 'Events' }), 500);
      }).catch(error => {
        this.showToast(`Unable to complete action for event at this time. ${error}`, error);
      });
    },
    async changeInterestInEvent() {
      await (!this.isUserHaveRelationshipToEvent
        ? this.createUserEvent(this.event.event_id, 'interested')
        : this.updateUserEventStatus(this.event.event_id, !this.isUserInterested ? 'interested' : 'deactive')
      ).then(() => {
        this.showToast(`Successfully ${!this.isUserInterested ? 'expressed interest for event.' : 'became uninterested for event.'}`);
        setTimeout(() => this.$router.push({ name: 'Events' }), 500);
      }).catch(error => {
        this.showToast(`Unable to complete action for event at this time. ${error}`, error);
      });
    },
  },
  components: { EdForm },
  mixins: [UserMixin, CommonMixin, ToastMixin]
}
</script>

<style>

</style>