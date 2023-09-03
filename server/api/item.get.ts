import getData from "~/libs/getData";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const search = (query.search || "") as string;
    const data = await getData(search, ".eg");
    let res = data.filter((ele) => ele.image && ele.title && ele.price);
    return { body: res };
});
