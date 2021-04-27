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