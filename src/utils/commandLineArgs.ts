import { parse } from 'ts-command-line-args';

interface Arguments {
    preloadDatabase: boolean;
}

export const args = parse<Arguments>({
    preloadDatabase: Boolean
})
