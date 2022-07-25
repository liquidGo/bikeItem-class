import Mock from 'mockjs'
Mock.setup({ timeout: 1000 })
Mock.mock('high.php', 'post', function (option) {
  // console.log(JSON.parse(option.body).params.page, '123123sf');
  let data = JSON.parse(option.body).params.page
  return Mock.mock(
    {
      "code": 0,
      "message": "",
      "result": {
        "list|25": [{
          "id|+1": 1,
          "userName": "@cname",
          "sex|1-2": 1,
          "age|10-50": 0,
          "state|1-5": 1,
          "interest|1-8": 1,
          "isMarried1|0-1": 1,
          "isMarried2|0-1": 1,
          "isMarried3|0-1": 1,
          "isMarried4|0-1": 1,
          "isMarried5|0-1": 1,
          "isMarried6|0-1": 1,
          "isMarried7|0-1": 1,
          "isMarried8|0-1": 1,
          "brithday": "2000-01-01",
          "address": "北京市海淀区",
          "time": "09:00:00"
        }],
        page: data,
        page_size: 5,
        total_count: 30
      }
    }
  )
})
