import {Request} from "@/lib/request";

export type Specification = SpecificationGroupItem & {
  basePath: string
}

export type SpecificationItem = SpecificationGroupItem | SpecificationRequestItem

export type SpecificationGroupItem = {
  id: string
  name: string
  description?: string
  items: SpecificationItem[],
}

export type SpecificationRequestItem = {
  id: string
  name: string
  request: Request
}

export function isGroup(item: SpecificationItem): item is SpecificationGroupItem {
  return "items" in item
}

export function isRequest(item: SpecificationItem): item is SpecificationRequestItem {
  return "request" in item
}

export function walkItem(item: SpecificationItem): Iterable<[SpecificationGroupItem[], SpecificationItem]> {
  return {
    *[Symbol.iterator](): IterableIterator<[SpecificationGroupItem[], SpecificationItem]> {
      yield [[], item]

      if (isGroup(item)) {
        for (const child of item.items) {
          for (const [parents, currentItem] of walkItem(child)) {
            yield [[item, ...parents], currentItem]
          }
        }
      }
    }
  }
}

export function findItem(item: SpecificationItem, id: string): [SpecificationGroupItem[], SpecificationItem] | undefined {
  for (const [parents, currentItem] of walkItem(item)) {
    if (currentItem.id === id)
      return [parents, currentItem]
  }

  return undefined
}