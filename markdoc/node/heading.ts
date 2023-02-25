import { Config, Node, RenderableTreeNode, Tag } from '@markdoc/markdoc'

const generateID = (
  children: RenderableTreeNode[],
  attributes: Record<string, any>
) => {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id
  }
  return children
    .filter((child) => typeof child === 'string')
    .join(' ')
    .replace(/[?]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[./]/g, '-') // or .replace(/[./]/g, '')
    .toLowerCase()
}

export const heading = {
  children: ['inline'],
  attributes: {
    id: { type: String },
  },
  transform(node: Node, config: Config) {
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
