
import Mock from 'mockjs';
Mock.setup({
    timeout: 2000
});
Mock.mock('upload.php', 'post', function (option) {
    return Mock.mock(
        { data: { img: function ({ _req, Mock }) { return _req.body.fileName + "_" + Mock.mock("@image") } } }
    )
})



