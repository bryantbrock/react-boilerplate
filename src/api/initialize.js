import Airtable from 'airtable'

Airtable.configure({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY})

export const client = Airtable.base(process.env.REACT_APP_AIRTABLE_BASE_KEY)