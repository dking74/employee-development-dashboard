<template>
  <b-card
    border-variant="primary"
    header="Primary"
    header-bg-variant="primary"
    header-text-variant="white"
    align="left"
    class="ed-card"
  >
    <template #header>
      <h5 class="my-1 d-inline-block">{{ title }}</h5>
      <b-button v-if="!!headerAction" class="position-absolute p-1 mr-3 align-bottom" style="right: 0" variant="info" :href="headerAction.link">
        <b-icon icon="plus" />
        <template v-if="isGreaterThanMedium">{{ headerAction.text }}</template>
      </b-button>
    </template>

    <template v-if="adjustedData.length > 0">
      <b-table stickyColumn responsive sticky-header 
          :items="adjustedData"
          :fields="adjustedHeaders"
          v-bind="tableProps"
          @row-clicked="editItem"
      >
        <template #cell(actions)="row">
          <b-button size="sm" @click="deleteItem(row.item)" variant="danger" >
            <b-icon icon="trash" />
          </b-button>
        </template>
      </b-table>
    </template>
    <template v-else>
      There are no {{ title.toLowerCase() }} present at this time
    </template>
  </b-card>
</template>

<script>
import { flattenDeep } from 'lodash';

import WindowMixin from '../mixins/window.mixin';
import CommonMixin from '../mixins/common.mixin';

export default {
  name: 'ed-card',
  mounted() {
    this.adjustData();
    this.adjustHeaders();
  },
  props: {
    title: {
      required: true,
      type: String
    },
    dataHeaders: {
      required: false,
      type: Array,
    },
    data: {
      required: true,
      type: Array,
    },
    headerAction: {
      required: false,
      type: Object,
      validator: (action) => {
        return action['text'] && action['link'];
      }
    },
  },
  data: () => ({
    adjustedData: [],
    adjustedHeaders: [],
  }),
  computed: {
    tableProps() {
      const headers = this.dataHeaders;
      return {
        ...(headers && headers.length > 0 ? { fields: headers } : {}) 
      };
    }
  },
  methods: {
    editItem(event) {
      this.$emit('edit', event);
    },
    deleteItem(itemValue) {
      this.$emit('delete', itemValue);
    },
    adjustData() {
      const data = this.data;
      this.adjustedData = data.length > 0 ? data.map((value, index) => {
        return {
          number: index + 1,
          ...value,
        };
      }) : [];
    },
    adjustHeaders() {
      const headers = this.dataHeaders && this.dataHeaders.length > 0
        ? this.dataHeaders
        : this.adjustedData.map((value) => Object.keys(value).map(dataEl => {
          const currentLabel = dataEl.split('_').map((el) => `${this.toUpperCase(el)}`).join(' '); 
          return ({ key: dataEl, label: currentLabel })
        }));

      this.adjustedHeaders = [
        'number',
        ...flattenDeep(headers),
        { key: 'actions', label: '', class: 'ed-action--table__header' },
      ];
    },
  },
  watch: {
    data() {
      this.adjustData();
      this.adjustHeaders();
    }
  },
  mixins: [WindowMixin, CommonMixin]
}
</script>

<style lang="scss">
.ed-card {
  .card-body {
    tbody tr {
      cursor: pointer;
    }
  }

  td.ed-action--table__header {
    text-align: right;
  }

  .b-table {
    thead tr th {
      vertical-align: middle;
      white-space: nowrap;
    }
  }
}
</style>