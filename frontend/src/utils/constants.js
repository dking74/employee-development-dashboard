export const achievementFormProps = [
    {
      name: 'title',
      type: 'input',
      label: 'Title',
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Summary'
    },
    {
      name: 'completed_date',
      type: 'datepicker',
      label: 'Completed Date',
      inline: true,
      props: {
        style: 'width: 300px',
      }
    },
    {
      name: 'other_comments',
      type: 'textarea',
      label: 'Other Comments'
    }
];

export const achievementObjectMapping = {
  title: 'title',
  summary: 'summary',
  completed_date: 'completed_date',
  other_comments: 'other_comments',
  // attachement_url
};

export const viewEventProps = [
  {
    name: 'title',
    type: 'input',
    label: 'Event Title'
  }, {
    name: 'summary',
    type: 'input',
    label: 'Event Summary'
  }, {
    name: 'date',
    type: 'input',
    label: 'Event Date'
  }, {
    name: 'location',
    type: 'input',
    label: 'Event Location'
  }, {
    name: 'registered',
    type: 'input',
    label: 'Registered'
  }, {
    name: 'organizers',
    type: 'textarea',
    label: 'Organizers'
  }
];

export const goalFormProps = [
  {
    name: 'title',
    type: 'input',
    label: 'Title'
  }, {
    name: 'summary',
    type: 'textarea',
    label: 'Summary'
  }, {
    name: 'status',
    type: 'radio-group',
    label: 'Status',
    value: [],
    childCondition: (value) => value === 'completed' || value === 'pending',
    props: {
      options: [
        { text: 'future', value: 'submitted' },
        { text: 'pending', value: 'pending' },
        { text: 'completed', value: 'completed' }
      ]
    },
    children: [
      {
        condition: (value) => value === 'completed',
        name: 'completion_date',
        type: 'datepicker',
        label: 'Completion Date'
      },
      {
        condition: (value) => value === 'pending',
        name: 'to_be_completed_date',
        type: 'datepicker',
        label: 'To Be Completed Date'
      },
    ]
  }
];

export const certificationFormProps = [
  {
    name: 'name',
    type: 'input',
    label: 'Certification Name'
  }, {
    name: 'description',
    type: 'textarea',
    label: 'Description'
  }, {
    name: 'files',
    type: 'file',
    label: 'File Uploads',
    value: [],
    props: {
      multiple: true,
      accept: '.jpg, .png, .jpeg'
    }
  }
];

export const eventObjectMapping = {
  title: 'title',
  summary: 'summary',
  date: 'date',
  location: 'location',
  registered: 'registered',
  organizers: 'organizers',
};

export const goalObjectMapping = {
  title: 'title',
  summary: 'summary',
  completion_date: 'completion_date',
  to_be_completed_date: 'to_be_completed_date',
  status: 'status',
};

export const certificationObjectMapping = {
  name: 'name',
  description: 'description',
  attachment_url: 'attachment_url',
};