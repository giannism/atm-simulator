<template>
    <v-container :class="'main-container'" fill-height fluid>
        <v-card :class="'calculator-body'">
            <v-card-text :class="'calculator-inner'">
                <v-row :class="'top-part'">
                    <v-col cols="12" :class="'display-wrapper text-right'">
                        <span :class="'amount-display'">$ {{ enteredAmount | formatNumber }}</span>
                    </v-col>
                </v-row>
                <v-row :class="'botton-part'">
                    <v-col cols="4" :class="'text-center'" v-for="(number, nkey) in numbers" :key="nkey">
                        <v-btn :class="'calculator-button'" fab depressed x-large @click="keyPressed(number)">
                            {{ number }}
                        </v-btn>
                    </v-col>
                    <v-col cols="4" :class="'text-center'">

                    </v-col>
                    <v-col cols="4" :class="'text-center'">
                        <v-btn :class="'calculator-button'" fab depressed x-large @click="keyPressed(0)">
                            0
                        </v-btn>
                    </v-col>
                    <v-col cols="4" :class="'text-center'">
                        <v-btn :class="'calculator-button backspace'" fab depressed x-large @click="backspace" :disabled="enteredAmount==0">
                            <v-icon>mdi-backspace-outline</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="12" :class="'withdraw-button-container'">
                        <v-btn outlined color="#1679fd" :id="'withdraw_button'" height="50" @click="submitWithdrawal">Withdraw</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <TransactionPrompt v-if="requestStatus !== null" :title="requestStatus" :body="requestData"/>
    </v-container>
</template>

<script>
    import {mapGetters, mapActions} from "vuex"
    import numeral from "numeral"
    import TransactionPrompt from "./TransactionPrompt";
    export default {
        name: "Atm",
        components: {TransactionPrompt},
        data: () => ({
            enteredAmount: 0,
            numbers: [ 1, 2, 3, 4, 5, 6, 7, 8, 9]
        }),
        computed: {
            ...mapGetters({requestStatus: "GET_TRANSACTION_STATUS", requestData: "GET_RESPONSE_DATA"})
        },
        filters: {
            formatNumber(value) {
                return numeral(value).format("0,0")
            }
        },
        methods: {
            ...mapActions(['sendWithdrawal']),
            keyPressed( value ){
                if(this.enteredAmount == 0){
                    this.enteredAmount = ""+value
                } else{
                    this.enteredAmount = "" + this.enteredAmount + value
                }
            },
            backspace() {
                this.enteredAmount = this.enteredAmount.slice(0, -1)
            },
            submitWithdrawal(){
                this.sendWithdrawal({amount: this.enteredAmount})
            }
        },
        watch: {
            requestStatus(val){
                if (val === null){
                    this.enteredAmount = 0;
                }
            }
        }
    }
</script>

<style scoped>
    .calculator-body{
        margin: 0 auto;
        max-width: 400px;
        width: 100%;
    }
    .calculator-inner{
        padding: 5px 30px;
    }
    .display-wrapper{
        padding: 40px 20px;
    }
    .amount-display{
        font-size: 3.2em;
    }
    .calculator-button{
        font-size: 2.0em !important;
    }
    .backspace{
        font-size: 1.4em !important;
    }
    #withdraw_button{
        font-size: 1.4em;
        width: 100%;
        text-transform: capitalize;
        border: 2px solid ;
    }
    #withdraw_button:hover{
        background-color: #1679fd;
        color: #fff !important;
    }
</style>