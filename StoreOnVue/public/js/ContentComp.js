Vue.component('content-center', {
    data() {
        return {
            placeholder: 'Enter Your Email',
            userEmail: '',
            email: /^[\w.-]+@\w+\.[a-z]{2,4}$/i, //\w	или аналог [0-9a-z_] => любая цифра, буква или знак подчеркивания
            correctEmail: '',
            error: 'Введите e-mail формата *****@*** . **',
            success: 'Ваш e-mail внесен в базу рассылок',
        }
    },
    methods: {
        filter(value) {
            this.correctEmail = this.email.test(value);
        },
    },
    template: `
        <div>
            <form class="click">
                <button class="button__browse">
                    <span class="browse__product">Browse All Product</span><img src="img/arrow__right.png" alt="go-ahead">
                </button>
              </form>
            <div class="center">
                <div class="offer">
                    <div class="left__content">
                        <h1 class="discount">30%<span class="word"> offer</span></h1>
                        <h1 class="for">for women</h1>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="truck">
                    <img src="img/truck.png" alt="truck">
                </div>
                <div class="first">
                    <h3 class="free">Free Delivery</h3>
                    <h4 class="delivery">Worldwide delivery on all. Authorit tively morph next-generation innovtion with
                        extensive models.</h4>
                </div>
                <div class="circle">
                    <img src="img/circle.png" alt="discount">
                </div>
                <div class="second">
                    <h3 class="sales">Sales &amp; discounts</h3>
                    <h4 class="discounts">Worldwide delivery on all. Authorit tively morph next-generation innovtion
                        with
                        extensive models.</h4>
                </div>
                <div class="crown">
                    <img src="img/korona.png" alt="crown">
                </div>
                <div class="third">
                    <h3 class="quality">Quality assurance</h3>
                    <h4 class="assurance">Worldwide delivery on all. Authorit tively morph next-generation innovtion
                        with
                        extensive models.</h4>
                </div>
            </div>
            <div class="surfer">
                <div class="content center">
                    <div class="pre__bottom__block">
                        <div class="foto">
                            <img src="img/OMG.png" alt="Burhan">
                        </div>
                        <div class="france">
                            <h3 class="text__france">&#171;Vestibulum quis porttitor dui! Quisque viverra nunc mi, a
                                pulvinar
                                purus condlmentum a. Aliquam condimentum mattis neque sed pretium&raquo;</h3>
                            <h3 class="Bin">Bin Burhan</h3>
                            <h4 class="Dhaka">Dhaka, Bd</h4>
                        </div>
                        <div class="right__subscribe">
                            <h1 class="subscribe">Subscribe</h1>
                            <h3 class="newletter">FOR OUR NEWLETTER AND PROMOTION</h3>
                        </div>
                    </div>
                    <form action="#" class="right__button" @submit.prevent="filter(userEmail.trim())">
                        <input type="text" :placeholder="placeholder" class="email" v-model="userEmail" @keypress.space="filter(userEmail.trim())">
                        <button class="subscribe__button">Subscribe</button>
                        <p class="emailInformation" v-show="correctEmail === false">{{error}}</p>
                        <p class="emailInformation" v-show="correctEmail === true">{{success}}</p>
                    </form>
                    <div class="gorizontal__bar">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                </div>
            </div>
        </div>        
    `
});