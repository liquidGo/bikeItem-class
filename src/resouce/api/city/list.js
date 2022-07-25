import Mock from 'mockjs';
Mock.setup({ timeout: 2000 });
Mock.mock('cityData.php', 'post', function (option) {
    let data = JSON.parse(option.body).params.page
    console.log(data, 'page');
    let da = new Date(Date.now())
    let time = da.getFullYear() + '-' + (da.getMonth() + 1) + '-' + da.getDate();
    console.log(option)
    return Mock.mock(
        {
            "code": 0,
            "message": "",
            "result": {
                "page": data,
                "page_size": 10,
                "total_count": 25,
                "paga_count": 6,
                "item_list|25": [{
                    "id|+1": 1,
                    "name": "@city",
                    "mode|1-2": 1,
                    "op_mode|1-2": 1,
                    "franchChinese_name": '左岸自营',
                    "city_admins|1-2":[{
                        "user_name":"@cname",
                        "user_id|+1":10001
                    }],
                    "open_time": "@datetime",
                    "sys_user_name": "@cname",
                    "update_time": time
                }]
            }
        }
    )
})