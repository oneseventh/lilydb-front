import useSWR from "swr";

const fetcher = async (url) => {
    if (url.includes("null")) {
        return;
    }
    
    if (url[url.length-1] === "?") {
        return null;
    }

    const res = await fetch(url);
    if (res.ok) {
        const data = await res.json();
        return data.data;
    }
    throw new Error(res.statusText);
}

export default function useArticleList(id) {
    const parameter = id ? id.map((item) => `id=${item}`).join('&') : null;
    const { data, error } = useSWR(`${process.env.REACT_APP_SERVER}/api/v2/article/lists?` + parameter, fetcher);

    if (error) {
        return {
            article: null,
            isError: error
        }
    }

    if (!data) {
        return {
            article: null,
            isError: error
        };
    }

    return {
        article: data,
        isError: error
    };
}