<template>
    <section class="Chat">
        <div class="card">
            <div class="card-header bg-dark px-3 py-2">
                <div class="row align-items-center">
                <div class="col"><span class="h2 font-weight-light text-secondary">Chat </span></div>
                <div class="col-auto text-muted"><b> {{ messageCount }} </b> / 50  </div>
                </div>
            </div>
            <div class="card-body p-3" style="max-height: 30vh; overflow: auto;" v-chat-scroll="{always: true, smooth: true}">
                <div v-for="cm in allMessages" :key="cm.timeStamp" class="list-group list-group-flush">
                    <div v-if="cm.forUser === '' && cm.userName === $store.state.auth.emailAuthUser" class="list-group-item">
                        <div class="row align-items-center">
                            <div class="col-2 text-center">
                                <img src="https://coderthemes.com/hyper/creative/assets/images/users/avatar-1.jpg" height="48" class="rounded-circle border border-success" alt="Shreyu N">
                                <div><span class="badge badge-success">{{ cm.userName }}</span></div>
                            </div>
                            <div class="col">
                                <span class="text-monospace small"><small class="float-right">{{ cm.momentStamp }} </small></span>
                                <p class="pt-2">{{ cm.text }}</p>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="cm.forUser != '' && cm.userName === $store.state.auth.emailAuthUser" class="list-group-item">
                        <div class="row align-items-center">
                            <div class="col-2 text-center">
                                <img src="https://coderthemes.com/hyper/creative/assets/images/users/avatar-1.jpg" height="48" class="rounded-circle border border-success" alt="Shreyu N">
                                <div><span class="badge badge-success">{{ cm.userName }}</span></div>
                            </div>
                            <div class="col">
                                <div class="ptext-wrap w-100">
                                    <span class="text-monospace small"><small class="float-right">{{ cm.momentStamp }} </small> ► {{ cm.forUser }} </span>
                                    <p class="pt-2">{{ cm.text }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="cm.forUser === '' && cm.userName != $store.state.auth.emailAuthUser" class="list-group-item">
                        <div class="row align-items-center">
                            <div class="col-2 text-center">
                                <img src="https://coderthemes.com/hyper/creative/assets/images/users/avatar-3.jpg" height="48" class="rounded-circle" alt="Shreyu N">
                                <div><span class="badge badge-default">{{ cm.userName }}</span></div>
                            </div>
                            <div class=" col">
                                <span class="text-monospace text-muted small"><small class="float-right">{{ cm.momentStamp }}</small></span>
                                <p class="pt-2">{{ cm.text }}</p>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="cm.forUser === $store.state.auth.emailAuthUser && cm.userName != $store.state.auth.emailAuthUser" class="list-group-item bg-light">
                        <div class="row align-items-center">
                            <div class="col-2 text-center">
                                <img src="https://coderthemes.com/hyper/creative/assets/images/users/avatar-2.jpg" height="48" class="rounded-circle" alt="Shreyu N">
                                <div><span class="badge badge-default">{{ cm.userName }}</span></div>
                            </div>
                            <div class="col">
                                <span class="text-monospace text-muted small">► for me <small class="float-right">{{ cm.momentStamp }}</small></span>
                                <p class="pt-2">{{ cm.text }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Chat',
    data() {
        return {
            allMessages: [],
            messageCount: 0,
        }
    },
    
}
</script>
