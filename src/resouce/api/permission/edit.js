
import Mock from 'mockjs';
Mock.setup({ timeout: 2000 });
Mock.mock('perEdit.php', 'post', function (option) {
 
    return Mock.mock(
        {
            "code": 0
        }
    )
})


