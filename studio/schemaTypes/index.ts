import { affiliateLinkItem } from './objects/affiliateLinkItem'
import { faqItem } from './objects/faqItem'
import { spaceInfo } from './objects/spaceInfo'
import { specItem } from './objects/specItem'
import { subscriptionInfo } from './objects/subscriptionInfo'
import { whatWeDoItem } from './objects/whatWeDoItem'

import { affiliateButtonBlock } from './blocks/affiliateButtonBlock'
import { comparisonTableBlock } from './blocks/comparisonTableBlock'
import { prosConsBlock } from './blocks/prosConsBlock'
import { pteImageBlock } from './blocks/pteImageBlock'
import { spaceRequirementsBlock } from './blocks/spaceRequirementsBlock'
import { trueCostBoxBlock } from './blocks/trueCostBoxBlock'
import { verdictBoxBlock } from './blocks/verdictBoxBlock'

import { aboutPage } from './documents/aboutPage'
import { article } from './documents/article'
import { author } from './documents/author'
import { category } from './documents/category'
import { product } from './documents/product'

export const schemaTypes = [
  // documents
  product,
  article,
  category,
  author,
  aboutPage,
  // portable text blocks
  comparisonTableBlock,
  verdictBoxBlock,
  prosConsBlock,
  affiliateButtonBlock,
  pteImageBlock,
  trueCostBoxBlock,
  spaceRequirementsBlock,
  // shared objects
  specItem,
  affiliateLinkItem,
  faqItem,
  whatWeDoItem,
  subscriptionInfo,
  spaceInfo,
]
