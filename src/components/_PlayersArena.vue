<template>
    <b-list-group-item class="mx-0 p-0" :variant="stride === ind ? 'success' : 'secondary'">
        <div class="px-3 py-1 pb-3">
            <div class="d-flex w-100 justify-content-between">
                <span class="lead"><b-badge :variant="data.side ? 'success' : 'secondary'" pill>{{ data.side ? ' [ ' + data.side + ' ] ' + score  : 'wait' }}</b-badge></span>
            </div>
            <div class="d-flex w-100 justify-content-between">
                <span class="text-secondary"><small>{{ data.timestamp }}</small></span>
                {{ ind }}
            </div>
        </div>
    </b-list-group-item>
</template>

<script>

export default {
        name: 'PlayersArena',
        props: {
            data: Object,
            stride: Number,
            score: Number,
            ind: Number
        }
}
  
</script>
