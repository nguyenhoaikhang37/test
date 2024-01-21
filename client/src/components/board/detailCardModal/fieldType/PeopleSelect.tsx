import {
  Avatar,
  CloseButton,
  Group,
  MultiSelect,
  MultiSelectValueProps,
  Text
} from '@mantine/core'
import { forwardRef } from 'react'
import { useStyles } from './style'

const data = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Bender Bending Rodríguez',
    value: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking'
  },

  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    label: 'Carol Miller',
    value: 'Carol Miller',
    description: 'One of the richest people on Earth'
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    label: 'Homer Simpson',
    value: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant'
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
    label: 'Spongebob Squarepants',
    value: 'Spongebob Squarepants',
    description: 'Not just a sponge'
  }
]

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string
  label: string
  description: string
}

function Value({
  value,
  onRemove,
  classNames,
  ...others
}: MultiSelectValueProps & { value: string }) {
  const item = data.find(e => e.value === value)

  if (!item) return <></>

  return (
    <div {...others}>
      <div className='flex items-center gap-1 rounded-sm border  bg-slate-200'>
        <div>
          <img src={item.image} alt='' className='h-[22px] w-[22px]' />
        </div>
        <p>{item.label}</p>
        <CloseButton
          onMouseDown={onRemove}
          variant='transparent'
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </div>
    </div>
  )
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text>{label}</Text>
          <Text size='xs' color='dimmed'>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
)

const PeopleSelect = () => {
  const { classes } = useStyles()
  return (
    <MultiSelect
      className={classes.wrapper}
      placeholder='Pick all you like'
      itemComponent={SelectItem}
      valueComponent={Value}
      data={data}
      searchable
      nothingFound='Nobody here'
      maxDropdownHeight={400}
      filter={(value, selected, item) =>
        !selected &&
        (item?.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
          item.description.toLowerCase().includes(value.toLowerCase().trim()))
      }
    />
  )
}
export default PeopleSelect
