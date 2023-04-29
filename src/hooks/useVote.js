import useSWR from "swr";

const voteFetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export function useVote(id) {
    const { data, error } = useSWR(`${process.env.REACT_APP_SERVER}/api/v2/article/?id=${id}`, voteFetcher);
    return {
        article: data,
        isError: error
    };
}