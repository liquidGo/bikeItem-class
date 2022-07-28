import Mock from 'mockjs';
Mock.setup({ timeout: 2000 });
Mock.mock('query.php', 'post', function (option) {
    return Mock.mock(
        { success: true, data: { default: "hah", _req: function ({ _req }) { return _req }, name: function ({ _req }) { return _req.query.name || this.default } } }
    )
})


