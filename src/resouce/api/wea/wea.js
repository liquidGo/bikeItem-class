import Mock from 'mockjs'
Mock.setup({ timeout: 1000 })
Mock.mock('wea.php', 'get', function (option) {
    // console.log(JSON.parse(option.body).params.page, '123123sf');
    alert('123')
    return Mock.mock(
        {
            "city":"秦皇岛",
            "day":{
                "phrase":['晴','阴','多云转晴','晴转多云','雷阵雨'],
                "temperature|15-33":0
            }
        }
    )
})
