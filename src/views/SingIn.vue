<template>
  <section class="singin">
        <div class="card">
            <div class="card-body">
                <h2 class="card-title text-center">Enter your player name</h2>
                <form @submit.prevent="singIn" class="text-center p-4">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Please enter name ..." name="name" v-model="name">
                        <p v-if="errorText" class="text-danger">{{ errorText }}</p>
                    </div>
                    <button type="submit" class="btn btn-primary">Start</button>
                </form>
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
        if (localStorage.username) {
            this.$router
                .push({
                    name: 'home',
                    params: { 
                        name: localStorage.username,
                        }
                    })
        }
    }, 
    methods: {
        singIn() {
            if (this.name) {
                localStorage.username = this.name
                this.$router.push({
                    name: 'home',
                    params: {name: this.name} 
                    })
                
            } else {
                this.errorText = "Please enter a name first!"
            }
        },
    }
}
</script>
