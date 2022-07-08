import { ItemProps } from './../../components/ExploreSidebar/index'
import { ParsedUrlQueryInput } from 'querystring'

type ParceArgs = {
  queryString: ParsedUrlQueryInput
  filterItems: Pick<ItemProps, 'name' | 'type'>[]
}

export const parseQueryStringToWhere = ({
  queryString,
  filterItems
}: ParceArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: any = {}

  Object.keys(queryString)
    .filter((item) => item !== 'sort')
    .forEach((key) => {
      const item = filterItems.find((item) => item.name === key)
      const isCheckbox = item?.type === 'checkbox'
      const filterValue = queryString[key]

      obj[key] = !isCheckbox
        ? filterValue
        : {
            name_contains: filterValue
          }
    })

  return obj
}

export const parseQueryStringToFilter = ({
  queryString,
  filterItems
}: ParceArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: any = {}

  Object.keys(queryString).forEach((key) => {
    const item = filterItems.find((item) => item.name === key)
    const itemValue = queryString[key]
    const isCheckbox = item?.type === 'checkbox'
    const isArray = Array.isArray(itemValue)

    // verificae se não é um array, se não, crisar
    obj[key] = !isArray && isCheckbox ? [itemValue] : itemValue
  })

  return obj
}
