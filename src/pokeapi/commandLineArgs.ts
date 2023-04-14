import { parse } from 'ts-command-line-args'

interface Arguments {
  id?: number
  name?: string
}

export const args = parse<Arguments>({
  id: { type: Number, optional: true },
  name: { type: String, optional: true }
})
