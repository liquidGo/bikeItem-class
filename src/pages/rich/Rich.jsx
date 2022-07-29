import React, { Component } from 'react'
import { Button, Card, Modal } from 'antd'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjs from 'draftjs-to-html';


export default class Rich extends Component {
    state = {
        showRichText: false
    }

    onEditorChange = (contentState) => {
        this.setState({
            contentState
        })
    }
    handleGetText = () => {
        this.setState({
            showRichText: true
        })
    }
    handleClearContent = () => {
        this.setState({
            editorState: ''
        })
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        })
    }
    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Card>
                    <Button onClick={this.handleClearContent} style={{marginRight:10}}>清空内容</Button>
                    <Button onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title='富文本编辑器'>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onContentStateChange={this.onEditorChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />;
                </Card>
                <Modal
                    title='富文本'
                    visible={this.state.showRichText}
                    onCancel={()=>{
                        this.setState({
                            showRichText:false
                        })
                    }}
                    footer={null}
                >
                    {draftjs(this.state.contentState)}
                </Modal>
            </div>
        )
    }
}
