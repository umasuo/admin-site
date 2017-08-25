/**
 * This chunk includes json schema related libraries and initial code
 */

import Ajv from 'ajv'
import draft4 from 'ajv/lib/refs/json-schema-draft-04'
import faker from 'json-schema-faker'

export const ajv = new Ajv({allErrors: true})
ajv.addMetaSchema(draft4)

faker.option({requiredOnly: false})
export {faker}
