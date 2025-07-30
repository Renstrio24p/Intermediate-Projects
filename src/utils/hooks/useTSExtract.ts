import { useTSParams } from './useTSParams';

export function useTSExtractParams(pattern: string) {
    const store = useTSParams.getState();

    // Populate internal param/query store
    store.setFromPattern(pattern);

    const params = store.params;
    const query = store.query;

    return { ...params, ...query };
}
