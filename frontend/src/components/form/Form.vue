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
        <component v-model="form[prop.name]" :is="getComponentType(prop.type)" v-bind="getComponentProps(prop)" v-on="getComponentListeners(prop)"></component>
      </b-form-group>
      <template v-if="prop.children && !!form[prop.name] && prop.childCondition(form[prop.name])">
        <template v-for="childProp in prop.children">
          <b-form-group
            :id="`${childProp.name}-child-group-${index}`"
            :label="`${childProp.label || childProp.name}:`"
            :label-for="`${childProp.name}-${index}`"
            label-class="d-inline-block"
            :key="childProp.name"
            v-if="!childProp.condition ? true : (childProp.condition && childProp.condition(form[prop.name]))"
          >
            <component
              v-model="form[childProp.name]"
              :is="getComponentType(childProp.type)"
              v-bind="getComponentProps(childProp)"
              v-on="getComponentListeners(childProp)"
            ></component>
          </b-form-group>
        </template>
      </template>
    </span>
    <template slot="actions"><slot name="actions" /></template>
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
    viewOnly: {
      required: false,
      type: Boolean,
      default: false,
    },
    resource: {
      required: false,
      type: Object,
      validator: (element) => {
        return element['name'] && (
          (element['apiPath'] && element['type'] && ['add','edit'].includes(element['type']))
          || element['customSubmit']
        )
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
        case 'checkbox-group':
          return 'b-form-checkbox-group';
        case 'radio':
          return 'b-form-radio';
        case 'radio-group':
          return 'b-form-radio-group';
        case 'datepicker':
          return 'b-form-datepicker';
        case 'textarea':
          return 'b-form-textarea';
        case 'file':
          return 'b-form-file';
        case 'embed':
          return 'b-embed';
        case 'image':
          return 'b-img';
        case 'input':
        default:
          return 'b-form-input';
      }
    },
    getComponentProps(prop) {
      const componentViewOnly = this.viewOnly;
      const componentProps = prop.props;
      const componentType = prop.type;
      return {
        disabled: componentViewOnly || false,
        display: prop.inline ? 'inline-block' : 'block',
        ...(componentType === 'textarea' && this.viewOnly ? { 'no-resize': true } : {}),
        ...(componentType === 'input' ? { type:  prop.inputType || 'text' } : {}),
        ...componentProps
      };
    },
    getComponentListeners(prop) {
      return prop.listeners;
    },
    async submitForm(event) {
      event.preventDefault();

      if (!this.viewOnly) {
        // If the resource at hand has a custom submit function, prefer
        // that over the default submit of the form
        if (this.resource.customSubmit) return this.resource.customSubmit(this.form);

        return agent.submitForm(
          this.resource.apiPath || this.resource.name,
          this.form,
          this.resource.type === 'add'
        ).then((error) => {
          this.showToast(this.getToastMessage(error), error);
          !error && (this.completedLink ? this.$router.push(this.completedLink) : this.$router.go(-1));
        });
      }
    },
    clearForm() {
      if (!this.viewOnly) this.form = {};
    },
    getToastMessage(error) {
      const resource = this.resource;
      return error
        ? `Unable to ${resource.type} ${resource.name}.`
        : `Successfully able to ${resource.type} ${resource.name}`
    },
    updateFormData(props) {
      const _props = props || this.props;
      this.form = (_props && _props.reduce((prev, curr) => {
        prev[curr.name] = curr.value || '';
        if (curr.children)
          prev = { ...prev, ...this.updateFormData(curr.children) };
        return prev;
      }, {})) || {};

      return this.form;
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