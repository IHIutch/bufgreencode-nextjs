import { Tag } from '@markdoc/markdoc'

const generateID = (children, attributes) => {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id
  }
  return children
    .filter((child) => typeof child === 'string')
    .join(' ')
    .replace(/[?]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[./]/g, '-')
    .toLowerCase()
}

export const heading = {
  children: ['inline'],
  attributes: {
    id: { type: String },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

    const id = generateID(children, attributes)

    return new Tag(
      `Heading`,
      // `h${node.attributes['level']}`,
      { ...attributes, ...node.attributes, id },
      children
    )
  },
}
