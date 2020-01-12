<template>
    <section class="Chat">
        <div class="card">
            <div class="card-header">
                <p class="m-0 h5">Chat</p>
            </div>
            <div class="card-body p-3">
                <div class="conversation-list">
                    <div class="media mb-3" v-for="cm in list" :key="cm.timeStamp">
                        <div class="text-center">
                            <img src="https://coderthemes.com/hyper/creative/assets/images/users/avatar-2.jpg" height="48" class="rounded-circle" alt="Shreyu N">
                            <div><span class="badge badge-default">{{ cm.userName }}</span></div>
                        </div>
                        <div class="media-body">
                            <div class="conversation-text">
                                <div class="ctext-wrap">
                                    <small class="text-monospace text-muted">{{ cm.timeStamp }}</small>
                                    <p>{{ cm.text }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">                   
                <form name="chat-form" id="chat-form">
                    <div class="row">
                        <div class="col mb-2 mb-sm-0">
                            <input type="text" class="form-control border-0" placeholder="Enter your text" required="">
                            <div class="invalid-feedback">
                                Please enter your messsage
                            </div>
                        </div>
                        <div class="col-sm-auto">
                            <div class="btn-group">                                        
                                <button type="submit" class="btn btn-success btn-block">SEND</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'Chat',
  props: {
    list: Array
  }
}
</script>
