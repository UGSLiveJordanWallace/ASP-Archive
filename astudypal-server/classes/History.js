const puppeteer = require('puppeteer');

class HistoryArticleSearch {
    constructor(webAddresses) {
        this.webAddresses = webAddresses;
    }

    async getCitation(url, type, corpName) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        switch(type) {
            case "MLA":
                switch(corpName) {
                    case "World History Encyclopedia":
                        let mla_author = await page.evaluate(() => {
                            return document.querySelector(".ci_author a").textContent;
                        })
                        let mla_title = await page.evaluate(() => {
                            return document.querySelector("div .box_wrapper h1").textContent;
                        })
                        let mla_date = await page.evaluate(() => {
                            return document.querySelector(".ci_author").textContent;
                        })
                        let mla_publisher = "World History Encyclopedia";
                        let mla_link = url;

                        return {author: mla_author, title: mla_title, date: mla_date, publisher: mla_publisher, url: mla_link};
                    case "Fordham University Sourcebooks":
                        let fdm_title = await page.evaluate(() => {
                            return Array.from(document.querySelectorAll(".H_Title")).map((x, key) => {
                                return x.textContent.replaceAll("  ", "").replaceAll("\n", "");
                            })
                        })
                        if (fdm_title.length > 1) {
                            fdm_title = this.replaceAll(fdm_title.toString());
                        }                        
                        let fdm_publisher = "Fordham University Sourcebooks"
                        let fdm_link = url;

                        return {title: fdm_title, publisher: fdm_publisher, url: fdm_link};
                }
                break;
        }

        await browser.close();
        return;
    }

    async scrapeWeb() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        const articleSet = [];
        for (const key in this.webAddresses) {
            switch(this.webAddresses[key].corpName) {
                case "World History Encyclopedia":
                    await page.goto(this.webAddresses[key].url);

                    const whe_title = await page.evaluate(() => {
                        return Array.from(document.querySelectorAll("a .ci_preview_content h3")).map((x, key) => {
                            return {id: key, title: x.textContent};
                        });
                    });
                
                    const whe_links = await page.evaluate(() => {
                        return Array.from(document.querySelectorAll(".content_item")).map((x, key) => {
                            return {id: key, href: x.href}
                        })
                    })
                
                    const whe_descriptions = await page.evaluate(() => {
                        return Array.from(document.querySelectorAll("div .ci_preview")).map((x, key) => {
                            return {id: key, content: x.textContent.replace("\n", "")};
                        });
                    })
                    
                    if (whe_title.length < 3 || whe_links.length < 3 || whe_descriptions.length < 3) {
                        for (let i = 0; i < whe_title.length; i++) {
                            articleSet.push({title: whe_title[i].title, href: whe_links[i].href, content: whe_descriptions[i].content, corpName: this.webAddresses[key].corpName, citation: {title: whe_title[i].title, mla: await this.getCitation(whe_links[i].href, "MLA", this.webAddresses[key].corpName), apa: "APA CONTENT"}})
                        }
                        break;
                    }
                    for (let i = 0; i < 3; i++) {
                        articleSet.push({title: whe_title[i].title, href: whe_links[i].href, content: whe_descriptions[i].content, corpName: this.webAddresses[key].corpName, citation: {title: whe_title[i].title, mla: await this.getCitation(whe_links[i].href, "MLA", this.webAddresses[key].corpName), apa: "APA CONTENT"}});
                    }
                    break;
                case "Fordham University Sourcebooks":
                    await page.goto(this.webAddresses[key].url);

                    const fdm_title = await page.evaluate(() => {
                        return Array.from(document.querySelectorAll("li h4 a")).map((x, key) => {
                            return {id: key, title: x.textContent.replaceAll("\n", "").replaceAll("  ", "")};
                        });
                    });

                    const fdm_links = await page.evaluate(() => {
                        return Array.from(document.querySelectorAll("li h4 a")).map((x, key) => {
                            return {id: key, href: x.href}
                        })
                    })

                    const fdm_descriptions = await page.evaluate(() => {
                        return Array.from(document.querySelectorAll("li .card-block .card-text")).map((x, key) => {
                            return {id: key, content: x.textContent.replaceAll("\n", "").replaceAll("  ", "")};
                        });
                    });

                    if (fdm_title.length < 3 || fdm_links.length < 3 || fdm_descriptions.length < 3) {
                        for (let i = 0; i < fdm_title.length; i++) {
                            articleSet.push({title: fdm_title[i].title, href: fdm_links[i].href, content: fdm_descriptions[i].content, corpName: this.webAddresses[key].corpName, citation: {title: fdm_title[i].title, mla: await this.getCitation(fdm_links[i].href, "MLA", this.webAddresses[key].corpName), apa: "APA CONTENT"}})
                        }
                        break;
                    }
                    for (let i = 0; i < 3; i++) {
                        articleSet.push({title: fdm_title[i].title, href: fdm_links[i].href, content: fdm_descriptions[i].content, corpName: this.webAddresses[key].corpName, citation: {title: fdm_title[i].title, mla: await this.getCitation(fdm_links[i].href, "MLA", this.webAddresses[key].corpName), apa: "APA CONTENT"}});
                    }

                    await browser.close();
                    break;
            }
        }
        
        await browser.close();
        return articleSet;
    }

    replaceAll(string) {
        let result = "";
        for (let i = 0; i < string.length; i++) {
            if (string.substring(i, i + 1) !== ",") {
                result += string.substring(i, i+1);
            } else {
                result += " ";
            }
        }
        return result;
    }
}

module.exports.HistoryArticleSearch = (data) => {
    return new HistoryArticleSearch(data).scrapeWeb();
};