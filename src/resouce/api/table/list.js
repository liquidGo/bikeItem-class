import Mock from 'mockjs'
Mock.setup({ timeout: 1000 })
Mock.mock('tableList.php', 'post', function (option) {
    // console.log(JSON.parse(option.body).params.page ,'123123sf');
    let data=JSON.parse(option.body).params.page
    return Mock.mock(
        {
            "code": '0',
            "message": "",
            "result": {
                "list|10": [{
                    "id|+1": 1,
                    "userName": "@cname",
                    "sex|1-2": 1,
                    "state|1-5": 1,
                    "interest|1-8": 1,
                    "isMarried|0-1": 1,
                    "brithday": "2000-01-01",
                    "address": "北京市海淀区",
                    "time": "09:00:00"
                }]
                ,
                page: data,
                page_size: 10,
                total_count: 30
            }
        }
    )
})
// import Mock from 'mockjs'
// const Mock=require('./mock')
// 设置4秒后再响应
// Mock.setup({ timeout: 2000 });
// // Mock响应模板
// // 模拟后台的地址、接收方法、请求过来的数据在函数里、
// Mock.mock('data.php', 'get', function (options) {
//     return Mock.mock({
//         "data|1-6": [{   // 随机生成1到6个数组元素
//             'id|+1': 88,    // 属性值自动加 1，初始值为88
//             'name|1': ['tom', "jarry", "susan"],
//             'age|18-28': 0,   // 18至28以内随机整数, 0只是用来确定类型
//             'sex|1': ['男', "女"]
//         }]
//     });
// });

// Mock.mock('check.php', 'get', function (options) {
//         return Mock.mock({
//             //  "data|1-6": [{   // 随机生成1到6个数组元素
//             //     'id|+1': 88,    // 属性值自动加 1，初始值为88
//             //     'name|1': ['tom',"jarry","susan"],        
//             //     'age|18-28': 0,   // 18至28以内随机整数, 0只是用来确定类型
//             // 	'sex|1':['男',"女"]
//             // }]
//             "status": 1000, "msg": "登录成功！"
//         });
// });
