export default class HistoryArticleSearch {
    constructor(data) {
        this.data = data;
    }

    async search() {
        const userRequest = {
            data: this.data
        };
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify(userRequest)
        };

        const fetchResponse = await fetch("http://localhost:8080/history-articles-push", options);
        const result = await fetchResponse.json();

        return result;
    }
}