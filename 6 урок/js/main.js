const API = 'https://raw.githubusercontent.com/Mediumgr/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.changeStatus;
                    console.log(error);
                })
        },
    },
    mounted() {
        console.log(this);
    }
});