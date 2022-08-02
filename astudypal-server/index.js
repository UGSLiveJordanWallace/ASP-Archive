const express = require('express');
const app = express();
const cors = require("cors");
const math = require("./classes/Math");
const science = require("./classes/Science");
const history = require("./classes/History");
const english = require("./classes/English");

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, POST"
}))

app.get("/", (req, res) => {
    // Awake the server
    res.send("<h1>Server Awakened</h1>");
});

app.post("/math-push", (req, res) => {
    const data = req.body.data;
    switch (data.subclass) {
        case "Geometry":
            res.send({answer: math.GeometryMath(data)});
            break;
        case "Algebra 1":
            const answer_math1 = math.AlgebraOneMath(data.values);
            res.send(answer_math1);
            break;
        case "Algebra 2":
            const answer_math2 = math.AlgebraTwoMath(data.values);
            res.send(answer_math2);
            break;
        case "PreCalculus":
            res.send(math.PreCalculusMath(data.values));
            break;
    }
});

app.post("/science-push", (req, res) => {
    const data = req.body.data;
    switch(data.subclass) {
        case "Chemistry":
            res.send(science.ChemistryScience(data.values));
            break;
    }
})

app.post("/history-articles-push", async (req, res) => {
    const data = req.body.data;
    let userSearch;

    if (data !== '') {
        userSearch = req.body.data;
    } else {
        return res.send({errorResponse: "Search Bar Empty!!"});
    }

    const webAddresses = {
        whe: {
            url: `https://www.worldhistory.org/search/?q=${userSearch}`,
            corpName: "World History Encyclopedia"
        },
        fdm: {
            url: `https://www.fordham.edu/_search/s/search.html?query=${userSearch}&collection=fordham-meta&clive=fordham-sourcebooks&submit=Search`,
            corpName: "Fordham University Sourcebooks"
        }
    };

    try {
        return res.send(await history.HistoryArticleSearch(webAddresses));
    } catch (e) {
        console.log(e);
        return res.send({errorResponse: "Something Went Wrong!!"});
    }
});

app.post("/english-export-push", async (req, res) => {
    const data = req.body.data;
    console.log(data);
    switch(data) {
        case "Google Drive":
            console.log(await english.SaveAsGoogleDrive(__dirname, "dummyFile.txt"));
            break;
    }
    return res.send({data});
})

app.listen(8080, () => console.log("Listening on Port 8080"));