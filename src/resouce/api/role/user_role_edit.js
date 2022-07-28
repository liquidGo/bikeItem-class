
import Mock from 'mockjs';
Mock.setup({ timeout: 2000 });
Mock.mock('user_role_edit.php', 'post', function (option) {
  return Mock.mock(
    {
      "code": 0
    }
  )
})


