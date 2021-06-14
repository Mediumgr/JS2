 Vue.component('error', {
     data() {
         return {
             isVisibleProducts: false,
             text: 'Ошибка запроса 404. Нет данных о товарах'
         }
     },
     methods: {
         setError() {
             this.isVisibleProducts = true;
         },
         closeButtonError() {
             this.isVisibleProducts = false;
         }
     },
     template: `      
                <div v-show="isVisibleProducts" class="error-block">
                    <h4 class="error-msg">
                    {{text}}
                        <button class="close-btn" @click="closeButtonError">&times;</button>
                    </h4>
                </div>
            `
 });