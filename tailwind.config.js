/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./components/**/*.{js,vue,ts}", "./layouts/**/*.vue", "./pages/**/*.vue", "./plugins/**/*.{js,ts}", "./nuxt.config.{js,ts}", "./app.vue"],
    theme: {
        fontFamily: {
            source: ["Source Sans Pro", "sans-serif"],
            maven: ["Maven Pro", "sans-serif"],
            arabic: ["Almarai", "sans-serif"],
            over: ["Overpass", "sans-serif"],
        },
        container: {
            center: true,
        },
        screens: {
            xxl: { max: "1600px" },

            xl: { max: "1399px" },

            lg: { max: "1199px" },

            md: { max: "991px" },

            sm: { max: "767px" },

            xs: { max: "576px" },
        },
        extend: {
            boxShadow: {
                me: "0 0 10px rgba(0,0,0,0.1)",
                sm: "0 0 4px rgba(0,0,0,0.1)",
            },
            width: {
                nine: "90%",
            },
            colors: {
                darker: "#111111",
                dark: "#121212",
                "dark-50": "#777",
                light: "#eee",
                "light-50": "ddd",
            },
        },
    },
    plugins: [],
};
