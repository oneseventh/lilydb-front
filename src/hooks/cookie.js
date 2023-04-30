import { Cookies as ReactCookie } from 'react-cookie';

const cookies = new ReactCookie();

export const Cookies = {
    RECENT_SEEN_ARTICLE: 'recentSeenArticle',
    RECENT_SEEN_AUTHOR: 'recentSeenAuthor',
    RECENT_SEEN_COLLECTION: 'recentSeenCollection',

    RECENT_SEARCH_ARTICLE: 'recentSearchArticle',
    RECENT_SEARCH_AUTHOR: 'recentSearchAuthor',
    RECENT_SEARCH_COLLECTION: 'recentSearchCollection',

    USER_ID: 'userId',

    ADULT: 'adult'
}

export const Like = {
    ARTICLE : 'likedArticle',
    AUTHOR : 'likedAuthor',
    COLLECTION : 'likedCollection'
}

export const resetCookie = () => {
    cookies.remove('recentSearchArticle');
    cookies.remove('recentSearchAuthor');
    cookies.remove('recentSearchCollection');

    cookies.remove('recentSeenArticle');
    cookies.remove('recentSeenAuthor');
    cookies.remove('recentSeenCollection');

    cookies.remove('likedArticle');
    cookies.remove('likedAuthor');
    cookies.remove('likedCollection');

    cookies.remove('adult');
}

export const getCookie = (cookie) => {
    if (Object.values(Cookies).includes(cookie)) {
        let result = cookies.get(cookie);
        
        return result ? result.split(',') : [];
    }
    return null;
}

export const getLiked = (like) => {
    if (Object.values(Like).includes(like)) {
        let result = cookies.get(like);
        
        return result ? result.split(',') : [];
    }
    return [];
}


export const setCookie = (cookie, value) => {
    const options = {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        // secure: true
    }
    return cookies.set(cookie, value, options);
}


export const addArticle = (cookie, articleId) => {
    const MAX_RECENT_SEARCH_LENGTH = cookie === Cookies.LIKED_ARTICLE ? 100 : 10;
  
    if (Object.values(Like).includes(cookie) || Object.values(Cookies).includes(cookie)) {
        let targetCookie = null;

        if (Object.values(Cookies).includes(cookie)) {
            targetCookie = getCookie(cookie);
        }

        if (Object.values(Like).includes(cookie)) {
            targetCookie = getLiked(cookie);
        }
    
        if (targetCookie.length >= MAX_RECENT_SEARCH_LENGTH) {
            targetCookie.pop();
        }
    
        if (targetCookie.includes(articleId.toString())) {
            targetCookie = targetCookie.filter((id) => id.toString() !== articleId.toString());
        }
    
        targetCookie.unshift(articleId.toString());
        setCookie(cookie, targetCookie.join(','));
    }
};
  
export const removeArticle = (cookie, articleId) => {
    if (Object.values(Like).includes(cookie) || Object.values(Cookies).includes(cookie)) {
        let targetCookie = null;

        if (Object.values(Cookies).includes(cookie)) {
            targetCookie = getCookie(cookie);
        }

        if (Object.values(Like).includes(cookie)) {
            targetCookie = getLiked(cookie);
        }

        if (targetCookie.includes(articleId.toString())) {
            const removed = targetCookie.filter((id) => id.toString() !== articleId.toString());
            setCookie(cookie, removed.join(','));
        }
    }
};


export const setAdult = (value) => {
    setCookie(Cookies.ADULT, value);
    setCookie(Cookies.USER_ID, crypto.randomUUID())
}

export const getAdult = () => {
    try {
        return JSON.parse(getCookie(Cookies.ADULT))
    } catch (e) {
        return false;
    }
}

export const checkLiked = (like, id) => {
    let liked = getLiked(like);
    if (liked) {
        const index = liked.indexOf(id.toString());
        if (index !== -1) {
            return true;
        }
    }
    return false;
}