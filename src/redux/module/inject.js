
//用于 数据进入normalizr 前的过滤
export  function dataCleanInject(data) {
    return dispatch => {
        dispatch(icommnetInject(data))
    }
}

const icommnetInject = (data)=>{
    return dispatch =>{
        const {iDo} = data
        if(!iDo) return;

        // const doKeys = Object.keys(iDo)
        // console.log('test:', doKeys);
        // if(doKeys.length === 0) return
        //
        // const flag = doKeys.find(key => {
        //     return iDo[key].commentNew
        // })
        //
        // console.log('test:', flag);


    }
}