import axios from 'axios'
const actions = {
    getInfluence({commit}){
        return new Promise((resolve,reject) => {
            axios.get('/master/influence')
            .then((res)=> {
                commit('setInfluence',res.data.data);
                resolve(res.data.data);
            })
            .catch( (error)=> {
                reject(error);
            })
        });
    },

    getClient({commit}){
        return new Promise((resolve,reject) => {
            axios.get('/master/client')
            .then((res)=> {
                commit('setClient',res.data.data);
                resolve(res.data.data);
            })
            .catch( (error)=> {
                reject(error);
            })
        });
    },

    getService({commit}){
        return new Promise((resolve,reject) => {
            axios.get('/master/service')
            .then((res)=> {
                commit('setService',res.data.data);
                resolve(res.data.data);
            })
            .catch( (error)=> {
                reject(error);
            })
        });
    },

    getPayment({commit}){
        return new Promise((resolve,reject) => {
            axios.get('/master/payment')
            .then((res)=> {
                commit('setPayment',res.data.data);
                resolve(res.data.data);
            })
            .catch( (error)=> {
                reject(error);
            })
        });
    }


}

export default actions