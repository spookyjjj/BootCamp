export interface IdName {
    id: string;
    name: string;
}

export const newIdName = (id='sample', name='sample'): IdName => {
    return {id, name}
}