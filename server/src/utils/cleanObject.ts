export const cleanObject = <T extends Object>(obj: T): Partial<T> => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_,value]) => value !==undefined)
    ) as Partial<T>
}