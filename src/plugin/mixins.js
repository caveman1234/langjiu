function mounted() {
    // window[this.$options.name || "anonymous"] = this;
}

function myFun(funcName) {
    console.log('myfun--', this.$options.name);
}
export default {
    mounted,
    methods: {
        myFun
    }
}