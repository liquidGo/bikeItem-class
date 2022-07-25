import Mock from 'mockjs';
Mock.setup({ timeout: 50 });
Mock.mock('finish_order.php', 'post', function (option) {
  return Mock.mock(
    {
      "code": '0',
      "result": 'Ok'
    }
  )
})




