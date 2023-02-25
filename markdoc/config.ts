import { heading } from './node/heading'

export const config = {
  tags: {
    tableSmall: {
      render: 'TableSmall',
    },
    figureImg: {
      render: 'FigureImg',
      attributes: {
        caption: {
          type: String,
        },
      },
    },
    tableResponsive: {
      render: 'TableResponsive',
    },
    sup: {
      render: 'Sup',
    },
  },
  nodes: {
    heading,
  },
}
