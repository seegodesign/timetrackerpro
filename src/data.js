// Emulating project records which should be returned from API backend
// in the real world.
export default [
  {
    id: 1,
    client_id: 1,
    name: 'Website Rdesign',
    status: 'Active',
    description: 'Some description goes here',
    assignee: { id: 1, name: 'Jane Fonda' },
    lineitems: [
      { id: 1, description: 'Styling', project_id: 1, type: 'Hourly', rate: '$70', qty: '04:23' },
      { id: 2, description: 'Coding', project_id: 1, type: 'Hourly', rate: '$70', qty: '01:51' }
    ]
  },
  {
    id: 2,
    client_id: 1,
    name: 'Logo Design',
    status: 'Active',
    description: 'Some description goes here',
    assignee: { id: 1, name: 'Jane Fonda' },
    lineitems: [
      { id: 3, description: 'Logo prep', project_id: 2, type: 'Hourly', rate: '$70', qty: '04:23' },
      { id: 4, description: 'Finalization', project_id: 2, type: 'Hourly', rate: '$70', qty: '01:51' }
    ]
  },
  {
    id: 3,
    client_id: 2,
    name: 'SEO Consultation',
    status: 'Active',
    description: 'Some description goes here',
    assignee: { id: 2, name: 'Ogdon Smith' },
    lineitems: []
  },
  {
    id: 4,
    client_id: 3,
    name: 'Meetings',
    status: 'Active',
    description: 'Some description goes here',
    assignee: { id: 3, name: 'Cameron Gaut' },
    lineitems: [
      { id: 5, description: 'Long meeting', project_id: 2, type: 'Hourly', rate: '$70', qty: '04:23' },
      { id: 6, description: 'Smoke testing', project_id: 2, type: 'Hourly', rate: '$70', qty: '01:51' }
    ]
  }
]
