import * as cheerio from "cheerio";
import axios from "axios";

const fetchData = async (url: string, headers: Record<string, string>, base: string) => {
    try {
        const response = await axios.get(url, { headers });
        const html = response.data;
        const $ = cheerio.load(html);

        const products: {
            title: string;
            price: string;
            image: string | undefined;
            rating: string | undefined;
            url: string | undefined;
        }[] = [];

        $(".s-result-item").each((index, element) => {
            const title = $(element).find(".a-text-normal").text().trim();
            const price = $(element).find(".a-price .a-offscreen").first().text().trim();
            const image = $(element).find(".s-image").attr("src");
            const rating = $(element).find(".a-icon-star-small .a-icon-alt").text().trim();
            const url = $(element).find(".a-link-normal").attr("href");

            products.push({ title, price, image, rating, url: `${base}${url}` });
        });

        return products;
    } catch (error) {
        console.error("Error occurred:", error);
        return [];
    }
};

export default async (search_word: string, country: string = ".com") => {
    const base = `https://www.amazon${country}`;
    const url = `${base}/s?k=${encodeURIComponent(search_word)}`;
    // console.log(url);

    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
    };

    const products = await fetchData(url, headers, base);

    if (products.length === 0) {
        headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0";
        return fetchData(url, headers, base);
    }

    return products;
};
