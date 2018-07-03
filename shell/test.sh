
curl -X POST \
  -H "X-LC-Id: cmwLjTYWoYfN4jCgPR49rsi6-gzGzoHsz"          \
  -H "X-LC-Key: jYL7hiGyAArkuMcp8F8llI52,master"        \
  -H "Content-Type: application/json" \
  -d '{
        "where":{
            "user":{
                    "__type": "Pointer",
                    "className": "_User",
                    "objectId": "59a5029644d9040058136049"
            }
        },
        "deviceProfile": "dev",
        "data": {
          "ios":{
             "alert" : {
                "title":"test",
                "body":"body",
             },
              "webUrl" : "combo://Serve",
              "badge":"Increment",
              "sound": "tip.mp3",
              "params":{"iCard":{"title":"ceshi","objectId":"59ff053b1579a300457b440a"}}
           },
          "android":{
                   "webUrl" : "combo://Serve",
                   "title": "combo test",
                   "alert": "body",
                   "silent": false,
                   "action": "com.avos.UPDATE_STATUS",
                   "params":{"iCard":{"title":"ceshi","objectId":"59ff053b1579a300457b440a"}}
           }
        }
     }' \
https://api.leancloud.cn/1.1/push

