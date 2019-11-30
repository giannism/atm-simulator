<template>
    <v-overlay :value="overlay" :class="'response-overlay'">
        <v-card :id="'response-card'" light>
            <v-card-title>
                <h3 class="font-weight-light text-capitalize">{{ title }}</h3>
            </v-card-title>
            <v-card-text>
                <template v-if="title === 'success'">
                    <h4 class="font-weight-regular prompt-message">Please take your cash</h4>
                    <div class="response-wrapper">
                        <div class="response-display" v-for="(banknotes, bkey) in body" :key="bkey">
                            <p class="amount">
                                <v-icon large color="success">mdi-cash</v-icon>
                                <span> $ {{ banknotes.banknoteValue + " x " + banknotes.quantity}}</span>
                            </p>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <h4 class="font-weight-regular prompt-message"> {{ body }}</h4>
                </template>

            </v-card-text>
            <v-card-actions :class="'card-actions'">
                <v-btn color="#6c757c" large :class="'text-capitalize close-overlay'" @click="resetData(null)" dark>Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-overlay>
</template>

<script>
    import {mapActions} from "vuex";
    export default {
        name: "TransactionPrompt",
        props: {
            title: {
                type: String,
                required: true
            },
            body: {
                required: true
            }
        },
        data: () => ({
            overlay: true
        }),
        methods: {
            ...mapActions(['resetData'])
        }
    }
</script>

<style scoped>
    .response-overlay{
        align-items: start;
    }
    #response-card{
        width: 500px;
        margin-top: 20px;
    }
    .response-wrapper{
        margin-top: 20px;
    }
    .prompt-message{
        font-size: 1.2em;
    }
    .amount{
        font-size: 1.4em;
        vertical-align: middle;
    }
    .card-actions{
        justify-content: flex-end;
    }
    .close-overlay {
        font-size: 1.2em !important;
    }
</style>