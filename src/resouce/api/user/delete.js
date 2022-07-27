import Mock from 'mockjs'
Mock.setup({
  timeout: 50
})
Mock.mock('delUser.php', 'post', function (option) {
  // console.log(JSON.parse(option.body).params.page, '123123sf');
  // let data = JSON.parse(option.body).params.page
  console.log(JSON.parse(option.body),'创建员工页后端测试接收数据');
  return Mock.mock(
    {
      "code": 0,
      "result": "Ok"
    }
  )
})



