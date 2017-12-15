function mounted() {
    window[this.$options.name || "anonymous"] = this;
}

function myFun() {
    console.log('myfun--', this.$options.name);
}
export default {
    mounted,
    methods: {
        myFun
    }
}