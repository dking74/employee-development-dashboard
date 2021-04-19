<template>
  <div class="ed-sidebar">
    <p class="h3 mt-2 ed-sidebar--menu-button">
        <font-awesome-icon :icon="menuIcon" style="color: var(--light, 'white')" v-b-toggle.sidebar-1 />
    </p>
    <b-sidebar id="sidebar-1" title="Employee Dashboard" bg-variant="dark" text-variant="light" width="350px" shadow>
      <b-nav vertical pills class="mt-5">
        <b-nav-item v-bind="getLinkProps('', 'Home')">Dashboard</b-nav-item>
        <b-nav-item @click="toggleMyCareerDropdown" style="z-index: 5000;">
            My Career
            <font-awesome-icon :icon="dropdownMenuIcon" style="margin-left: 10px;" />
        </b-nav-item>
        <div class="ed-sidemenu__submenu" v-if="myCareerDropdownOpen">
          <b-nav-item v-bind="getLinkProps('my-career/accomplishments', 'Accomplishments')">Accomplishments</b-nav-item>
          <b-nav-item v-bind="getLinkProps('my-career/goals', 'Goals')">Goals</b-nav-item>
          <b-nav-item v-bind="getLinkProps('my-career/certifications', 'Certifications')">Certifications</b-nav-item>
          <b-nav-item v-bind="getLinkProps('my-career/documents', 'Documents')">Documents</b-nav-item>
        </div>
        <b-nav-item v-bind="getLinkProps('events', 'Events')">Events</b-nav-item>
        <b-nav-item v-bind="getLinkProps('learning', 'Learning')">Learning</b-nav-item>
        <b-nav-item v-bind="getLinkProps('', 'leaderboard')" disabled>Leaderboard</b-nav-item>
      </b-nav>
      <div slot="footer">
        <b-button variant="success" @click="logout">Logout</b-button>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { faChevronDown, faChevronUp, faBars } from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'ed-sidebar',
  data() {
    return {
      myCareerDropdownOpen: false,
    }
  },
  computed: {
    menuIcon() {
      return faBars;
    },
    dropdownMenuIcon() {
      return this.myCareerDropdownOpen ? faChevronUp : faChevronDown;
    }
  },
  methods: {
    getLinkProps(link, path) {
      return {
        href: `/${link}`,
        active: this.$route.name.toLowerCase() === path.toLowerCase()
      };
    },
    toggleMyCareerDropdown() {
      this.myCareerDropdownOpen = !this.myCareerDropdownOpen;
    },
    logout() {
      this.$auth.logout();
    }
  }
}
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap.scss';

.ed-sidebar {
  width: 50px;
  top: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  background-color: var(--primary, blue);
  box-shadow: 0 0 5px 1px black;

  .nav-item {
    @extend .mt-3;
    font-weight: bold;
    .nav-link {
      background-color: white;
      border-radius: 0;

      &.disabled {
        background-color: rgba(255, 255, 255, .8);
      }
    }
  }

  .ed-sidemenu__submenu {
    border-top: 1px solid var(--primary);
    .nav-item {
        margin-top: 0 !important;
        z-index: -1000;
        font-weight: normal;
        .nav-link {
            box-shadow: none;
            z-index: -1000;
        }
    }
  }
}
.ed-sidebar--menu-button {
  cursor: pointer;
}
</style>