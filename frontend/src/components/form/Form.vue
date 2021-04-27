<template>
  <ed-base-form :submitFunc="submitForm" :clearFunc="clearForm">
    <h2 slot="title" class="text-secondary">{{ title }}</h2>
    <span v-for="(prop, index) in props" :key="prop.name">
      <b-form-group
        :id="`${prop.name}-group-${index}`"
        :label="`${prop.label || prop.name}:`"
        :label-for="`${prop.name}-${index}`"
        label-class="d-inline-block"
      >
        <keep-alive>
          <component v-model="form[prop.name]" :is="getComponentType(prop.type)" v-bind="getComponentProps(prop)"></component>
        </keep-alive>
      </b-form-group>
    </span>
  </ed-base-form>
</template>

<script>
import EdBaseForm from './BaseForm.vue';
import ToastMixin from '../../mixins/toast.mixin';
import agent from '../../utils/agent';

export default {
  name: 'ed-form',
  mounted() {
    this.updateFormData();
  },
  data: () => ({
    form: {}
  }),
  props: {
    title: String,
    props: {
      required: true,
      type: Array,
    },
    resource: {
      required: true,
      type: Object,
      validator: (element) => {
        return element['name'] && element['apiPath']
          && element['type'] && ['add','edit'].includes(element['type']);
      }
    },
    completedLink: {
      required: false,
      type: String
    }
  },
  methods: {
    getComponentType(type) {
      switch (type) {
        case 'select':
          return 'b-form-select';
        case 'checkbox':
          return 'b-form-checkbox';
        case 'datepicker':
          return 'b-form-datepicker';
        case 'radio':
          return 'b-form-radio';
        case 'textarea':
          return 'b-form-textarea';
        case 'input':
        default:
          return 'b-form-input';
      }
    },
    getComponentProps(prop) {
      const componentProps = prop.props;
      const componentType = prop.type;
      return {
        display: prop.inline ? 'inline-block' : 'block',
        ...(componentType === 'input' ? { type:  prop.inputType || 'text' } : {}),
        ...componentProps
      };
    },
    async submitForm(event) {
      event.preventDefault();

      agent.submitForm(
        this.resource.apiPath || this.resource.name,
        this.form,
        this.resource.type === 'add'
      ).then((error) => {
        this.showToast(this.getToastMessage(error), error);
        !error && (this.completedLink ? this.$router.push(this.completedLink) : this.$router.go(-1));
      });
    },
    clearForm() {
      this.form = {};
    },
    getToastMessage(error) {
      const resource = this.resource;
      return error
        ? `Unable to ${resource.type} ${resource.name}.`
        : `Successfully able to ${resource.type} ${resource.name}`
    },
    updateFormData() {
      this.form = (this.props && this.props.reduce((prev, curr) => {
        prev[curr.name] = curr.value || '';
        return prev;
      }, {})) || {};
    }
  },
  watch: {
    props: {
      deep: true,
      handler() {
        this.updateFormData();
      }
    }
  },
  components: { EdBaseForm },
  mixins: [ToastMixin]
}
</script>

<style>

</style>