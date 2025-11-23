export const mapToKey = <T, K extends string | number>(
    keys: readonly K[],
    items: T[],
    keyFn: (item: T) => K
): (T | null)[] => {
    const itemMap = new Map(items.map((item) => [keyFn(item), item]));
    return keys.map((key) => itemMap.get(key) || null);
};

export const groupByKey = <T, K extends string | number>(
    keys: readonly K[],
    items: T[],
    keyFn: (item: T) => K
): T[][] => {
    const itemMap = new Map<K, T[]>();

    items.forEach((item) => {
        const key = keyFn(item);
        if (!itemMap.has(key)) itemMap.set(key, []);
        itemMap.get(key)!.push(item);
    });

    return keys.map((key) => itemMap.get(key) || []);
};