<template>
    <section class="singin">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-md-6 col-lg-4">
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
import { mapGetters, mapActions } from "vuex"

export default {
    name: 'SinginPage',
    data: () => ({
        email: 'orishka81@gmail.com',
        pass: '222222',
        loading: false,
    }),
    computed: mapGetters(["getAuthUser"]),
    methods: {
        ...mapActions(["login", "getUserData", "getUid"]),
        async submitHandler() {
            this.loading = true
                const singinUserData = {
                    email: this.email,
                    password: this.pass,
                }
                const sing = await this.login(singinUserData).then( resp => {
                    return resp
                })

                 const res = await this.getUserData(sing.id).then( resp => { 
                     console.log(resp)
                     return resp 
                })
            //    // console.log(res)
                this.$router.push({ name: 'Home', params: { AuthUser: res }})
            
            
            // if (sing._new) {
            //     // add user to DB
            //     // ...
            // } else {
            //     // get user in DB
                
            
          
            // }
        },
    },
    async mounted() {
        var user = await this.getUid()
        if (user) {
            console.log(user)
        } else {
            user = await this.$route.params.AuthUser
        }
        //const user = await this.getAuthUser()
         const res = await this.getUserData(user.id).then( resp => { 
             console.log(resp)
             return resp
             
         })
         this.$router.push({ name: 'Home', params: { roomId: 'Lobby', AuthUser: res }})
        
        
        //this.loading = true
        //
        // if (result) {
            

            
                
            
        // } else {
        //     //this.loading = false
        // }
    },
}
</script>
