
import Mock from 'mockjs';
Mock.setup({ timeout: 2000 });
Mock.mock('restful.php', 'post', function (option) {
    return Mock.mock(
        { "success": true, "data": [{ "user": { "name": "演示用" } }] }
    )
})



