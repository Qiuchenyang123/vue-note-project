<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "validateLayout",
        mounted() {
            this.$store.dispatch('user/getUserInfo').then((res) => {
                if (!res.data.userInfo.email) {
                    this.$router.push({name: 'login'})
                }
            })
        }
    }
</script>

<style scoped>

</style>