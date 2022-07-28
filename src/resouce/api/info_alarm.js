import Mock from 'mockjs';
Mock.setup({ timeout: 2000 });
Mock.mock('info_alarm.php', 'post', function (option) {
  return Mock.mock(
    {
      "result": {
        "vol_low": 2,
        "offline": 12,
        "unlock_ex": 0,
        "lock_fail": 0,
        "op_lock_timeout": 0,
        "bat_lock_timeout": 2
      },
      "code": 0,
      "message": "success"
    }
  )
})


