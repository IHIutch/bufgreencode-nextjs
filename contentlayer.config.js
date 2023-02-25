import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: `**/*.mdx`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    article: {
      type: 'string',
      required: true,
    },
    lead: {
      type: 'string',
      required: false,
    },
    article_number: {
      type: 'number',
      required: true,
    },
    section_number: {
      type: 'number',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => {
        return `/${post._raw.flattenedPath}`
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Article],
})
