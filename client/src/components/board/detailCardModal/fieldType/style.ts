import { createStyles } from '@mantine/core'

export const useStyles = createStyles(() => ({
  wrapper: {
    '& .mantine-Input-input, & .mantine-MultiSelect-input': {
      border: 0,
      padding: '0 0px 0 6px',
      transition: 'background 0.3s',
      background: '#f1f5f9',
      width: 'fit-content',
      '&:hover': {
        background: '#AAA'
      }
    },
    '& .mantine-Input-rightSection, & .mantine-MultiSelect-rightSection': {
      display: 'none'
    },
    '& .mantine-MultiSelect-searchInput': {
      height: '24px',
      maxHeight: '24px',
      margin: '3px 5px'
    },
    '& .mantine-MultiSelect-searchInputInputHidden': {
      margin: 0
    },
    '& .mantine-MultiSelect-values': {
      minHeight: '36px'
    }
  }
}))
