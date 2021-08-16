const mutations = {
    setTransaction(state,data){
        state.transaction = data
    },
    storeTransaction(state,data){
        state.transaction.unshift(data);
    },
    deleteTransaction(state,id){
        let index = state.transaction.findIndex(p=>p.transaction_id == id);
        state.transaction.splice(index,1)
        
    },
    updateTransaction(state,data){
        let index = state.transaction.findIndex(p=>p.transaction_id == data.id);
        // delete data.status_order
        // delete data.status_pembayaran_client
        // delete data.status_pembayaran_influence
        // console.log(data);
        Object.assign(data,{
            status_order: data.status_order.name,
        status_pembayaran_client: data.status_pembayaran_client.name,
        status_pembayaran_influence: data.status_pembayaran_influence.name
        })

        // status_order: payload.status_order.id,
        // status_pembayaran_client: payload.status_pembayaran_client.id,
        // status_pembayaran_influence:
        Object.assign(state.transaction[index],
         data
        )  
    }

}

export default mutations;