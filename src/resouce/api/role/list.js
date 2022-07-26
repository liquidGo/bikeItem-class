
import Mock from 'mockjs';
Mock.setup({ timeout: 2000 });
Mock.mock('role_list.php', 'post', function (option) {
  console.log(option);
  return Mock.mock(
    {
      "code": 0,
      "result": {
        "page": 1,
        "page_size": 10,
        "total_count": 25,
        "page_count": 3,
        "item_list|7": [{
          "id|+1": 1,
          "role_name": /(管理人员)|(客服专员)|(财务专员)|(市场专员)|(人力专员)|(研发)|(测试)|(系统管理员)/,
          "status|0-1": 1,
          "authorize_user_name": "@cname",
          "authorize_time": 1521270166000,
          "create_time": 1499305790000,
          "menus": ["/admin/home", "/admin/ui/buttons", "/admin/ui/modals", "/admin/ui/loadings", "/admin/ui/notification", "/admin/ui/messages", "/admin/ui/tabs", "/admin/ui/gallery", "/admin/ui/carousel", "/admin/ui"]
        }]
      }
    }
  )
})


