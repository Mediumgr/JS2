Vue.component('error', {
    data() {
        return {
            isVisibleProducts: false,
        }
    },
    computed: {
        changeStatus() {
            this.isVisibleProducts = true;
        },
    },
    template: `      
            <div v-show="isVisibleProducts" class="modal">
                <h4>Ошибка запроса.Нет данных</h4>
            </div>
            `
});