import Mock from 'mockjs';
Mock.setup({ timeout: 2000 });
Mock.mock('order_list.php', 'post', function (option) {
    let data = JSON.parse(option.body).params.page
    // console.log(data, 'page');
    // let da = new Date(Date.now())
    // let time = da.getFullYear() + '-' + (da.getMonth() + 1) + '-' + da.getDate();
    console.log(option,'option')
    return Mock.mock(
        {
            "code": "0",
            "result": {
                "page": data,
                "page_size": 10,
                "total_count": 85,
                "page_count": 2,
                "item_list|10": [{
                    "id|+1": 2959165,
                    "order_sn": /T180[0-9]{6}/,
                    "bike_sn|+1": 800116090,
                    "user_id": 908352,
                    "user_name": "@cname",
                    "mobile": /1[0-9]{10}/,
                    "distance|0-10000": 2000,
                    "total_time|0-10000": 4000,
                    "status|1-2": 1,
                    "start_time": "@datetime",
                    "end_time": "@datetime",
                    "total_fee": 1000,
                    "user_pay": 300,
                    "battery|0-100":0
                }]
            }
        }
    )
})


