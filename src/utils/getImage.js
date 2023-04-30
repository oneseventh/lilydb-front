export const IMAGE = {
    THUMBNAIL: "thumbnail",
    PROFILE: "profile",
    BANNER: "banner"
}

export function getImage(type, id, width) {
    return `${process.env.REACT_APP_SERVER}/api/v2/images/?type=${type}&id=${id}` + (width ? `&width=${width}` : "");
}

export default getImage;