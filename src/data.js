// Emulating project records which should be returned from API backend
// in the real world.
export default [
  {
    id: 1,
    client_id: 1,
    name: 'Website Redesign',
    status: 'Active',
    description: 'Some description goes here',
    assignee: { id: 1, name: 'Client A' },
    lineitems: [
      { id: 1, description: 'Styling', project_id: 1, type: 'Hourly', rate: 75, qty: 1.5 },
      { id: 2, description: 'Coding', project_id: 1, type: 'Hourly', rate: 75, qty: 1.5 }
    ]
  },
  {
    id: 2,
    client_id: 1,
    name: 'Logo Design',
    status: 'Active',
    description: 'Some description goes here',
    assignee: { id: 1, name: 'Client A' },
    lineitems: [
      { id: 3, description: 'Logo prep', project_id: 2, type: 'Hourly', rate: 75, qty: 1.5 },
      { id: 4, description: 'Finalization', project_id: 2, type: 'Hourly', rate: 75, qty: 1.5 }
    ]
  },
  {
    id: 3,
    client_id: 2,
    name: 'SEO Consultation',
    status: 'Active',
    description: 'Some description goes here',
    assignee: { id: 2, name: 'Client B' },
    lineitems: []
  },
  {
    id: 4,
    client_id: 3,
    name: 'Meetings',
    status: 'Active',
    description: 'Some description goes here',
    assignee: { id: 3, name: 'Client C' },
    lineitems: [
      { id: 5, description: 'Long meeting', project_id: 2, type: 'Hourly', rate: 75, qty: 1.5 },
      { id: 6, description: 'Smoke testing', project_id: 2, type: 'Hourly', rate: 75, qty: 1.5 }
    ]
  }
]
