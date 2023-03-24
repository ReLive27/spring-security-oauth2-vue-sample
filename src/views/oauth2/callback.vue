<template>
  <div />
</template>

<script>
export default {
  name: 'Callback',

  mounted() {
    this.githubLogin()
  },

  methods: {
    githubLogin() {
      const requestParams = {
        code: this.$route.query.code,
        state: this.$route.query.state
      }
      this.$store.dispatch('user/githubLogin', requestParams).then(() => {
        this.$router.push({ path: this.redirect || '/' })
      }).catch(() => {
      })
    }
  }

}
</script>

<style scoped>

</style>
