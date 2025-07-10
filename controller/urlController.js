const urlModel = require("../models/urlModel");
const { isURL } = require('validator');
const { nanoid } = require("nanoid");

const shorternUrl = async (req, res) => {
    const { url } = req.body;
    if (!isURL(url, {
        protocols: ['http', 'https'],
        require_protocol: true
    })) {
        return res.status(400).json({ message: "Invalid URL format" });
    }
    if (!url || !(url.startsWith("http:") || url.startsWith("https:"))) {
        return res.status(400).json({ message: "URL must start with http:// or https://" })
    }
    try {
        const shortId = nanoid(6);
        const newShortUrl = new urlModel({ shortId, originalUrl: url });

        await newShortUrl.save();
        res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortId}` });

    } catch (e) {
        console.error("Shorten URL error:", e);
        res.status(500).json({ message: "Server error" });
    }
}

const redirectUrl = async (req, res) => {
    const { shortId } = req.params;
    const record = await urlModel.findOne({shortId});

    if (!record) {
        return res.status(400).json({ message: "URL not found" });
    }

    res.redirect(record.originalUrl);
}

module.exports = { shorternUrl, redirectUrl };