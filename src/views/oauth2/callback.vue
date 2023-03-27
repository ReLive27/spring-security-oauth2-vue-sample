<template>
  <div />
</template>

<script>
export default {
  name: 'Callback',
  data() {
    return {
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.redirect = sessionStorage.getItem('redirect')
      },
      immediate: true
    }
  },
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
