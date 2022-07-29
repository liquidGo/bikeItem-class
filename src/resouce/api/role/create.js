import Mock from 'mockjs';
Mock.setup({ timeout: 2000 });
Mock.mock('create.php', 'post', function (option) {
    console.log(JSON.parse(option.body),'创建用户接收的json');
    let data=JSON.parse(option.body).params.createUsers
    console.log(data);
    return Mock.mock(
        {
            "code": 0,
            "user":data.create_name,
            "status":data.status
        }
    )
})


