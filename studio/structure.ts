import { InfoOutlineIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

// aboutPage is a singleton: pin it to a single fixed document instead of a
// list, and drop it from the generic document-type list below so editors
// can't accidentally create a second one.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('About Page')
        .icon(InfoOutlineIcon)
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'aboutPage'
      ),
    ])
