import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        transactionStatus: null,
        responseData: []
    },
    getters: {
        GET_TRANSACTION_STATUS: state => {
            return state.transactionStatus
        },
        GET_RESPONSE_DATA: state => {
            return state.responseData;
        }
    },
    mutations: {
        SET_TRANSACTION_STATUS: (state, payload) => {
            state.transactionStatus = payload;
        },
        SET_RESPONSE_DATA: (state, payload) => {
            state.responseData = payload;
        },
    },
    actions: {
        sendWithdrawal: ({commit}, options) => {
            axios.post("https://us-central1-atm-backend-2cc1b.cloudfunctions.net/withdraw", options ).then(function (response) {
                commit("SET_RESPONSE_DATA", response.data);
                commit("SET_TRANSACTION_STATUS", "success");
            }).catch(function (error) {
                commit("SET_RESPONSE_DATA", error.response.data);
                commit("SET_TRANSACTION_STATUS", "error");
            })
        },
        resetData: ({commit}, payload) => {
            commit("SET_RESPONSE_DATA", []);
            commit("SET_TRANSACTION_STATUS", payload);
        }
    },

});