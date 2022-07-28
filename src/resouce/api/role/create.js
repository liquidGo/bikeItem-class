import Mock from 'mockjs';
Mock.setup({ timeout: 2000 });
Mock.mock('create.php', 'post', function (option) {
 
    return Mock.mock(
        {
            "code": 0
        }
    )
})


