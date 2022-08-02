export class GeometryMath {
    constructor({...data}) {
        this.data = data;
    }

    async calc_data() {
        const userRequest = {
            data: this.data
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify(userRequest)
        } 
        
        const fetchResponse = await fetch("http://localhost:8080/math-push", options);
        const result = await fetchResponse.json();
        return result.answer;
    }
}

export class AlgebraMath {
    constructor({...data}) {
        this.data = data;
    }

    async calculate_alg() {
        const userRequest = {
            data: this.data,
        }
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify(userRequest)
        }

        const fetchResponse = await fetch("http://localhost:8080/math-push", options);
        const result = await fetchResponse.json();
        console.log(result);
       
        return result;
    }
}

export class PreCalculusMath {
    constructor({...data}) {
        this.data = data;
    }

    async calc() {
        const userRequest = {
            data: this.data,
        }
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify(userRequest)
        }

        const fetchResponse = await fetch("http://localhost:8080/math-push", options);
        const result = await fetchResponse.json();
        
        return result;
    }
}