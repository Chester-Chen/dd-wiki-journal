import React, { Component } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import * as dd from 'dingtalk-jsapi';
import { Button } from 'antd';

import 'easymde/dist/easymde.min.css';

export default class EditorPrv extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      userid: '', // user id
      access_token: '',
      editor: undefined,
      authCode: '', // 免登授权码
      AppKey: 'ding49en90whvkao1yhg',
      AppSecret:
        '6z80tMgoXwi-QKEXGOtUctmM60g1thb65_lOApmq03t1X31ibq6KQV8D_jqJzALK',
      corpId: 'dingee142412a919c640acaaa37764f94726',
    };
  }

  baseUrl = 'http://dingtalk.crazybro.top';

  async componentDidMount() {
    await this.getUsrId();
    const { userid } = this.state;
    // alert('userid: ' + userid);
    this.props.fetchEditUsr(await this.getUsrNameByUsrId(userid));
  }

  // 获取免登码
  getAuthCode = () => {
    return new Promise((resolve, reject) => {
      try {
        let that = this;
        dd.ready(function() {
          const { corpId } = that.state;
          dd.runtime.permission.requestAuthCode({
            corpId: corpId, // 企业id
            onSuccess: function(result) {
              that.setState(
                {
                  authCode: result.code,
                },
                () => resolve('ok'),
              );
            },
          });
        });
      } catch (error) {
        alert(JSON.stringify(error) + ' ,报错请@陈志文');
        reject(error);
      }
    });
  };

  // 获取access_token
  getAccessToken = () => {
    const { AppKey, AppSecret } = this.state;
    return fetch(
      `${this.baseUrl}/gettoken?appkey=${AppKey}&appsecret=${AppSecret}`,
    )
      .then(res => {
        return res.json();
      })
      .then(result => {
        // alert(`access_token: ${result['access_token']}`);
        this.setState({
          access_token: result['access_token'],
        });
      });
  };

  // 获取userid
  getUsrId = async () => {
    await this.getAuthCode();
    await this.getAccessToken();
    const { access_token, authCode } = this.state;
    return fetch(
      `${this.baseUrl}/user/getuserinfo?access_token=${access_token}&code=${authCode}`,
    )
      .then(res => res.json())
      .then(result => {
        // alert('userid: ' + result['userid']);
        this.setState({
          userid: result['userid'],
        });
      });
  };

  // 获取用户名
  getUsrNameByUsrId = async (userid: string) => {
    const { access_token } = this.state;
    const res = await fetch(
      `${this.baseUrl}/topapi/v2/user/get?access_token=${access_token}`,
      {
        method: 'POST',
        body: JSON.stringify({ userid }),
      },
    );
    const result = await res.json();
    return result['result']['name'];
  };

  // 提交日报
  submit = () => {
    this.getAuthCode().then(() => {
      const { editor, authCode, userid } = this.state;
      alert(editor.value()); // 日报内容
      alert('authCode: ' + authCode);

      // 把日报和userid传给信廷 todo
    });
  };

  render() {
    return (
      <>
        <SimpleMDE
          getMdeInstance={(i: object) => this.setState({ editor: i })}
        />
        <Button type="primary" onClick={this.submit}>
          submit
        </Button>
      </>
    );
  }
}
