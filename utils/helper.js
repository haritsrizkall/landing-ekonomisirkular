
export const transformContentLength = (content, length) => {
    const contentArr = content.split(" ");
    const newContent = contentArr.slice(0, length).join(" ");
    return newContent;
}

export const intToString = (value) => {
    var suffixes = ["", "k", "m", "b","t"];
    var suffixNum = Math.floor((""+value).length/3);
    var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
    if (shortValue % 1 != 0) {
        shortValue = shortValue.toFixed(1);
    }
    return shortValue+suffixes[suffixNum];
}