<template>
    <section class="singin">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <Loader v-if="loading" />
                <div v-if="!loading" class="col-md-6 col-lg-4">
                    <div class="card mt-5">
                        <div class="card-body">
                            <p class="h4 text-center ">Auth</p>
                            <form  @submit.prevent="submitHandler" class="text-center p-4">
                                <div class="form-group">
                                    <input autofocus type="email" class="form-control" name="email" v-model="email" required>
                                    <input type="password" class="form-control"  name="pass" v-model="pass" required>
                                </div>
                                <button type="submit" class="btn btn-primary btn-lg btn-block">Enter</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: 'SinginPage',
    data: () => ({
        email: 'orishka81@gmail.com',
        pass: '222222',
        loading: false,
    }),
    methods: {
        async submitHandler() {
            this.loading = true
            const singinUserData = {
                email: this.email, 
                password: this.pass,
            }
            
            const sing = await this.$store.dispatch('login', singinUserData ).then((resp) => {
                let result = {
                    _new: resp.additionalUserInfo.isNewUser,
                    id: resp.user.uid,
                    email: resp.user.email,
                    name: resp.user.displayName,
                }
                return result
            })
            if (sing._new) {
                // add user to DB
            } else {
                // get user in DB
                const res = await this.authUserLogin(sing.id)
                this.$router.push({ name: 'home', params: { AuthUser: res }})
            }
            
        },
        async authUserLogin(id) {
            const result = await this.$store.dispatch('getUserData', id ).then((resp) => {
                this.$store.commit('setAuthUser', resp)
                return resp
            })
            return result
        },
    },
    async mounted() {
       
        const result = await this.$store.dispatch('getUid')
        if (result) {
            const res = await this.authUserLogin(result.id)
            this.$router.push({ name: 'home', params: { AuthUser: res }})
        } else {
            this.loading = false
        }
       
    },
}
</script>
