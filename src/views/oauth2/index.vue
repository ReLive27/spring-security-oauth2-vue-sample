<template>
  <div class="consent-container">
    <div style="width: 45%; height: 50%; margin: 100px auto">
      <h3 style="text-align: center"><b>{{ principalName }}</b> wants the following permission</h3>
      <div class="form-container">
        <el-form ref="consentForm" :model="consentForm" class="consent-form" auto-complete="on" label-position="left">
          <el-input
            ref="client_id"
            v-model="consentForm.client_id"
            name="client_id"
            type="hidden"
          />
          <el-input
            ref="state"
            v-model="consentForm.state"
            name="state"
            type="hidden"
          />
          <el-form-item>
            <el-checkbox-group v-model="checkScopes">
              <el-checkbox v-for="scope in scopes" :label="scope.scope" :key="scope" :disabled="scope.disabled">{{scope.description}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <hr/>

          <el-button :loading="loading" type="info" style="width: 48%;" @click.native.prevent="cancelConsent">Cancel
          </el-button>
          <el-button :loading="loading" type="primary" style="width: 48%; float: right" @click.native.prevent="handleConsent">
            Authorize thepracticaldev
          </el-button>

          <div style="margin-top: 5px;width: 100%;height: 50px">
            <p style="text-align: center;font-size: 14px">Authorization will redirect to</p>
            <p style="text-align: center;font-size: 14px"><b>{{ redirectUri }}</b></p>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {authorizeConsent, oauth2Authorize} from '@/api/user'

export default {
  data() {
    return {
      consentForm: {
        client_id: '',
        state: '',

      },
      checkScopes: [],
      principalName: '',
      redirectUri: '',
      scopes: [],
      loading: false
    }
  },

  mounted() {
    this.oauth2Authorize()
  },

  methods: {
    cancelConsent() {
      this.$refs.consentForm.resetFields();
    },

    handleConsent() {
      this.loading = true
      authorizeConsent(Object.assign({}, this.consentForm, {scope: this.checkScopes})).then(response => {
        if (response.code === 302) {
          location.href = response.data
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },

    oauth2Authorize() {
      let requestParams = {
        response_type: this.$route.query.response_type,
        client_id: this.$route.query.client_id,
        scope: this.$route.query.scope,
        state: this.$route.query.state,
        redirect_uri: this.$route.query.redirect_uri,
        nonce: this.$route.query.nonce
      }
      oauth2Authorize(requestParams).then(response => {
        if (response.code === 200) {
          this.principalName = response.data.principalName;
          this.consentForm.client_id = response.data.clientId
          this.consentForm.state = response.data.state
          this.scopes = response.data.scopes
          this.checkScopes = response.data.scopes.map(data => data.scope)
          this.redirectUri = response.data.redirectUri

        } else if (response.code === 302) {
          location.href = response.data
        }
      }).catch(() => {

      })
    },
  }
}
</script>

<style lang="scss" scoped>

.consent-container {
  min-height: 100%;
  width: 100%;
  background-color: #f6f8fa;
  overflow: hidden;
}

.form-container {
  width: 100%;
  padding: 30px;
  border: #cccccc 1px solid;
  border-radius: 10px
}
</style>
