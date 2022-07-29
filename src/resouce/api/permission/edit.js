
import Mock from 'mockjs';
Mock.setup({ timeout: 1000 });
Mock.mock('perEdit.php', 'post', function (option) {
    let data = JSON.parse(option.body)
    console.log(JSON.parse(option.body));
    return Mock.mock(
        {
            "code": 0,
            "rold_id":data.data.role_id,
            "name":data.data.name,
            "status":data.data.status,
            "menus":data.data.menus
        }
    )
})


