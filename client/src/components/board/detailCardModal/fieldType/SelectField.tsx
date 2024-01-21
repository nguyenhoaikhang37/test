import {
  Box,
  CloseButton,
  Flex,
  MultiSelect,
  MultiSelectValueProps,
  SelectItemProps,
  rem
} from '@mantine/core'
import { forwardRef } from 'react'
import { Option } from '../../../../graphql/gen-types'
import { useStyles } from './style'

function Value({
  value,
  label,
  color,
  onRemove,
  classNames,
  ...others
}: MultiSelectValueProps & { value: string; color: string }) {
  return (
    <div {...others}>
      <Box
        sx={theme => ({
          display: 'flex',
          cursor: 'default',
          alignItems: 'center',
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          border: `${rem(1)} solid ${
            theme.colorScheme === 'dark'
              ? theme.colors.dark[7]
              : theme.colors.gray[4]
          }`,
          paddingLeft: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          background: color
        })}
      >
        <Box sx={{ lineHeight: 1, fontSize: rem(12) }}>{label}</Box>
        <CloseButton
          onMouseDown={onRemove}
          variant='transparent'
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  )
}

const Item = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ label, value, ...others }, ref) => {
    return (
      <div ref={ref} {...others}>
        <Flex align='center'>
          <div>{label}</div>
        </Flex>
      </div>
    )
  }
)

type Props = {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
}

export default function SelectField({ onChange, options, selected }: Props) {
  const { classes } = useStyles()

  return (
    <MultiSelect
      className={classes.wrapper}
      data={options.map(e => ({
        ...e,
        value: e._id,
        label: e.title
      }))}
      limit={20}
      valueComponent={Value}
      itemComponent={Item}
      searchable
      value={Object.keys(selected).map((key: any) => selected[key])}
      onChange={onChange}
      placeholder='Pick your options'
    />
  )
}
