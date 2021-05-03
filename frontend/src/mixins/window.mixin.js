export default {
  name: 'ed-window-mixin',
  data: () => ({
    extraSmallScreen: 0,
    smallScreen: 576,
    mediumScreen: 768,
    largeScreen: 992,
    extraLargeScreen: 1200,
    currentScreenWidth: window.innerWidth,
    currentScreenHeight: window.innerHeight,
  }),
  mounted() {
    window.addEventListener('resize', () => {
      this.currentScreenWidth = window.innerWidth;
      this.currentScreenHeight = window.innerHeight;
    });
  },
  computed: {
    screenWidth() {
      return this.currentScreenWidth;
    },
    screenHeight() {
      return this.currentScreenHeight;
    },
    isScreenExtraSmall() {
      return this.screenWidth < this.smallScreen;
    },
    isScreenSmall() {
      return this.screenWidth >= this.smallScreen && this.screenWidth < this.mediumScreen;
    },
    isScreenMedium() {
      return this.screenWidth >= this.mediumScreen && this.screenWidth < this.largeScreen;
    },
    isScreenLarge() {
      return this.screenWidth >= this.largeScreen && this.screenWidth < this.extraLargeScreen;
    },
    isScreenExtraLarge() {
      return this.screenWidth >= this.extraLargeScreen;
    },
    isGreaterThanLarge() {
      return this.screenWidth > this.largeScreen;
    },
    isGreaterThanMedium() {
      return this.screenWidth > this.mediumScreen;
    },
    isGreaterThanSmall() {
      return this.screenWidth > this.smallScreen;
    },
  },
  methods: {
    isScreenGreaterThanNumber(screenSize) {
      return this.screenWidth >= screenSize;
    },
    isScreenLessThanNumber(screenSize) {
      return this.screenWidth <= screenSize;
    }
  },
}