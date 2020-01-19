<template>
  <section class="singin">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-md-6 col-lg-4">
                    <div class="card mt-5">
                        <div class="card-body">
                            <p class="h4 text-center ">Create player name</p>
                            <form @submit.prevent="singIn" class="text-center p-4">
                                <div class="form-group">
                                    <input autofocus type="text" class="form-control"  name="name" v-model="name">
                                    <p v-if="errorText" class="text-danger">{{ errorText }}</p>
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
  name: 'singin',
  data () {
        return {
            name: '',
            errorText: null,
        }
    },
    created() {
/*        
        if (this.$store.state.userName) {
            this.$router
                .push({
                    name: 'home',
                    params: { 
                        name: this.$store.state.userName,
                        }
                    })
        }*/
    }, 
    methods: {
        singIn() {
            
            if (this.name) {

                //this.$store.commit('changeName', this.name)

                //localStorage.username = this.name

                //this.$store.state.userName = this.name

                this.$router.push({
                    name: 'home',
                    params: {userName: this.name} 
                })
                
            } else {
                this.errorText = "Please enter a name first!"
            }
        },
    }
}
</script>
