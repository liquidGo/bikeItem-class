import Mock from 'mockjs';
Mock.setup({ timeout: 1000 });
Mock.mock('openCity.php', 'post', function (option) {
    // let data = JSON.parse(option.body).params.data
    // console.log(data);
    // let da = new Date(Date.now())
    // let time = da.getFullYear() + '-' + (da.getMonth() + 1) + '-' + da.getDate();
    console.log(JSON.parse(option.body))
    return Mock.mock(
        {
            "code": 0,
            "result": "开通成功"
        }
    )
})