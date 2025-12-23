import arcjet, { shield, detectBot, fixedWindow } from "@arcjet/node";

const aj = arcjet({
    key: process.env.ARCJET_KEY || '',
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({ 
            mode: "LIVE",
            allow: ["CATEGORY:SEARCH_ENGINE"] 
        }),
        fixedWindow({
            mode: "LIVE",
            window: "1m",
            max: 100
        })
    ]
})

export default aj;
