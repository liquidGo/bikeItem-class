import Mock from 'mockjs';
Mock.setup({ timeout: 2000 });
Mock.mock('ebike_info.php', 'post', function (option) {
  let data = JSON.parse(option.body)
  // console.log(data, 'page');
  // let da = new Date(Date.now())
  // let time = da.getFullYear() + '-' + (da.getMonth() + 1) + '-' + da.getDate();
  return Mock.mock(
    {
      "code": '0',
      "result": {
        "user_name":data.data.params.orderId.user_name,
        "id": data.data.params.orderId.id,
        "bike_sn": data.data.params.orderId.bike_sn,
        "battery": data.data.params.orderId.battery,
        "start_time": data.data.params.orderId.start_time,
        "location": "北京市海淀区奥林匹克公园"
      }
    }
  )
})





