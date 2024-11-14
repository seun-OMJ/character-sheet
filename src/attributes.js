


export const incrementAttribute = (attributes, attribute) => {
    return {
        ...attributes,
        [attribute]: attributes[attribute] + 1,
    };
};


export const decrementAttribute = (attributes, attribute) => {
    return {
        ...attributes,
        [attribute]: attributes[attribute] - 1,
    };
};
