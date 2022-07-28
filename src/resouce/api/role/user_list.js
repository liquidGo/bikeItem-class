import Mock from 'mockjs';
Mock.setup({ timeout: 2000 });
Mock.mock('user_list.php', 'post', function (option) {
  return Mock.mock(
    {
      "code": 0,
      "result|20": [{
        "status|0-1": 0,
        "user_id|+1": 1,
        "user_name": "@cname"
      }]
    }
  )
})


