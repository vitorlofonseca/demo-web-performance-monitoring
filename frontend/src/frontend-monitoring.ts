import { onLCP, onFID, onCLS } from 'web-vitals'
import { post } from './services/http'

onCLS(async (clsInformation) => {
  console.info('CLS metric information', clsInformation)
  post('/push-frontend-metric', clsInformation)
})

onFID(async (fidInformation) => {
  console.info('FID metric information', fidInformation)
  post('/push-frontend-metric', fidInformation)
})

onLCP((lcpInformation) => {
  console.info('LCP metric information', lcpInformation)
  post('/push-frontend-metric', lcpInformation)
})
