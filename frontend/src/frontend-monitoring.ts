import { onLCP, onFID, onCLS } from 'web-vitals'
import { post } from './services/http'

onCLS(async (clsInformation) => {
  post('/push-frontend-metric', clsInformation)
})

onFID(async (fidInformation) => {
  post('/push-frontend-metric', fidInformation)
})

onLCP((lcpInformation) => {
  post('/push-frontend-metric', lcpInformation)
})
