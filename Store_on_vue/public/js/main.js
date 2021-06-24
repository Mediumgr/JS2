const app = new Vue({
    el: '#app',
    data: {},
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError();
                })
        },
        postJson(url, data) {
            return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError();
                });
        },
        putJson(url, data) {
            return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError();
                });
        },
        deleteJson(url) {
            return fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError();
                });
        },
    },
    mounted() {
        console.log(this);
    }
});