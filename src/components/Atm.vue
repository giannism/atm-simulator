<template>
    <v-card :class="'calculator-body'">
        <v-card-text :class="'calculator-inner'">
            <v-row :class="'top-part'">
                <v-col cols="12" :class="'display-wrapper text-right'">
                    <span :class="'amount-display'">$ {{ display | formatNumber }}</span>
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
                    <v-btn :class="'calculator-button backspace'" fab depressed x-large @click="backspace">
                        <v-icon>mdi-backspace-outline</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="12" :class="'withdraw-button-container'">
                    <v-btn outlined color="primary" :id="'withdraw_button'" height="50">Withdraw</v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    import numeral from "numeral"
    export default {
        name: "Calculator",
        data: () => ({
            display: 0,
            numbers: [ 1, 2, 3, 4, 5, 6, 7, 8, 9]
        }),
        filters: {
            formatNumber(value) {
                return numeral(value).format("0,0")
            }
        },
        methods: {
            keyPressed( value ){
                if(this.display == 0){
                    this.display = value
                } else{
                    this.display = "" + this.display + value
                }
            },
            backspace() {
                this.display = this.display.slice(0, -1)
            }
        }
    }
</script>

<style scoped>
    .calculator-body{
        max-width: 400px;
        width: 100%;
    }
    .calculator-inner{
        padding: 5px 30px;
    }
    .display-wrapper{
        padding: 20px 20px;
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
</style>