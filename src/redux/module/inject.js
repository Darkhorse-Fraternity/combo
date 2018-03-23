
//用于 数据进入normalizr 前的过滤
export  function dataCleanInject(data) {
    return dispatch => {
        dispatch(icommnetInject(data))
    }
}

const icommnetInject = (data)=>{
    return dispatch =>{
        console.log('test:', data);

    }
}