export const getHeadings = (
  node: any,
  sections: { id: string; title: string; level: number }[] = []
) => {
  if (node?.name) {
    // 'Heading' is defined in markdoc/node/heading.ts
    if (node.name.match('Heading')) {
      const title = node.children[0]

      if (typeof title === 'string') {
        sections.push({
          ...node.attributes,
          title,
        })
      }
    }

    if (node.children) {
      for (const child of node.children) {
        getHeadings(child, sections)
      }
    }
  }

  return sections
}
