import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { Form, Button } from 'antd';

class Editor extends React.Component<any, any> {
  componentDidMount() {
    // 异步设置编辑器内容
    // setTimeout(() => {
    //   this.props.form.setFieldsValue({
    //     content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'),
    //   });
    // }, 1000);
  }

  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.props.form.validateFields((error, values) => {
      console.log('values :>> ', values);
      if (!error) {
        const submitData = {
          // title: values.title,
          content: values.content.toRAW(), // or values.content.toHTML()
        };
        console.log(submitData);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const controls = [
      'bold',
      'italic',
      'underline',
      'text-color',
      'separator',
      'link',
      'separator',
      'media',
    ];
    
    return (
      <div className="demo-container">
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('content', {
              validateTrigger: 'onBlur',
              rules: [
                {
                  required: true,
                  validator: (_: any, value: any, callback: Function) => {
                    if (value.isEmpty()) {
                      callback('请输入正文内容');
                    } else {
                      callback();
                    }
                  },
                },
              ],
            })(
              <BraftEditor
                className="my-editor"
                controls={controls}
                placeholder="请输入正文内容"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Editor);
