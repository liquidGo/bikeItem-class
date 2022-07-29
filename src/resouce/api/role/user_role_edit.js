
import Mock from 'mockjs';
Mock.setup({ timeout: 2000 });
Mock.mock('user_role_edit.php', 'post', function (option) {
  console.log(JSON.parse(option.body),'测试端口');
  return Mock.mock(
    {
      "code": 0
    }
  )
})


