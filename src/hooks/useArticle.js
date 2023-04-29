import useSWR from "swr";

const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        if (res.status === 404) {
            throw new Error("존재하지 않는 게시글 입니다.");
        }
        if (res.status === 403) {
            throw new Error("일시적으로 블라인드 처리 된 게시글 입니다.");
        }
        throw new Error(res.statusText);
    }
    const data = await res.json();
    return data.data;
}

export default function useArticle(id) {
    const { data, error } = useSWR(`${process.env.REACT_APP_SERVER}/api/v2/article/?id=${id}`, fetcher, {
        dedupingInterval: 1000 * 60
    });

    if (error) {
        return {
            article: null,
            isError: error
        }
    }

    return {
        article: data,
        isError: error
    };
}